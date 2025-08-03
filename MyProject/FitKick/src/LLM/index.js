/**
 * chat 聊天
 * 
 */
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIM_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions';
const ALIYUN_IMAGE_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';
const ALIYUN_TASK_API_URL = 'https://dashscope.aliyuncs.com/api/v1/tasks/';

// console.log(process.env.VITE_DEEPSEEK_API_KEY, '------');
export const chat = async (
    messages,
    api_url = DEEPSEEK_CHAT_API_URL,
    api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
    model = 'deepseek-chat',
    onChunk = null // 添加流式处理回调函数
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model,
                messages,
                stream: true, // 启用流式输出
            })
        });

        if (!response.body) {
            throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        // 流式处理逻辑
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            // 处理每个chunk
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.trim() === '') continue;
                if (line.startsWith('data: ')) {
                    const data = line.substring(6);
                    if (data === '[DONE]') break;
                    try {
                        const json = JSON.parse(data);
                        const content = json.choices[0]?.delta?.content || '';
                        if (content && onChunk) {
                            onChunk(content); // 调用回调函数传递chunk
                        }
                        fullContent += content;
                    } catch (e) {
                        console.error('Error parsing chunk:', e);
                    }
                }
            }
        }

        return {
            code: 0,
            data: {
                role: 'assistant',
                content: fullContent
            }
        };
    } catch (err) {
        console.error('Chat error:', err);
        return {
            code: 1,
            msg: '出错了...'
        };
    }
}

export const kimiChat = async (message) => {
    const res = await chat(
        message,
        KIM_CHAT_API_URL,
        import.meta.env.VITE_KIMI_API_KEY,
        'moonshot-v1-auto'
    )
    return res
}

// 创建图像生成任务并获取task_id
export const createImageTask = async (prompt) => {
    const apiKey = import.meta.env.VITE_ALYUN_API_KEY;
    try {
        const response = await fetch(ALIYUN_IMAGE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'X-DashScope-Async': 'enable'
            },
            body: JSON.stringify({
                "model": "wan2.2-t2i-flash",
                "input": {
                    "prompt": prompt
                },
                "parameters": {
                    "size": "1024*1024",
                    "n": 1
                }
            })
        });

        if (!response.ok) {
            throw new Error(`创建任务失败: ${response.statusText}`);
        }

        const data = await response.json();
        return data.output.task_id;
    } catch (err) {
        console.error('创建图像任务失败:', err);
        throw err;
    }
};

// 根据task_id查询任务结果
export const getImageTaskResult = async (taskId) => {
    const apiKey = import.meta.env.VITE_ALYUN_API_KEY;
    const maxRetries = 30; // 最多重试30次
    const retryInterval = 2000; // 每2秒重试一次

    try {
        for (let i = 0; i < maxRetries; i++) {
            const response = await fetch(`${ALIYUN_TASK_API_URL}${taskId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (!response.ok) {
                throw new Error(`查询任务失败: ${response.statusText}`);
            }

            const data = await response.json();
            const taskStatus = data.output.task_status;

            if (taskStatus === 'SUCCEEDED') {
                return data.output.results[0].url; // 返回生成的图片URL
            } else if (taskStatus === 'FAILED' || taskStatus === 'CANCELED') {
                throw new Error(`任务失败: ${taskStatus}`);
            }

            // 任务仍在处理中，等待后重试
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }

        throw new Error('任务处理超时');
    } catch (err) {
        console.error('查询图像任务结果失败:', err);
        throw err;
    }
};

export const generateAvatar = async (text) => {
    // 设计一个头像的prompt
    const prompt = `
    你是一个漫画设计师，需要为用户设计头像，主打写实风格。
    用户的信息：${text}
    要求有个性，有设计感，可以抽象一点，可以根据用户的签名来判断生成的头像的风格。
    `;

    try {
        // 步骤1: 创建图像生成任务
        const taskId = await createImageTask(prompt);
        console.log('图像生成任务已创建，taskId:', taskId);

        // 步骤2: 查询任务结果
        const imageUrl = await getImageTaskResult(taskId);
        console.log('图像生成成功，URL:', imageUrl);

        return imageUrl; // 返回生成的图片URL
    } catch (err) {
        console.error('生成头像失败:', err);
        return null;
    }
}  
