/**
 * chat 聊天
 * 
 */
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIM_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions'

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

export const generateAvatar = async (text) => {
    // 设计一个头像的prompt
    const prompt = `
    你是一个漫画设计师，需要为用户设计头像，主打写实风格。
    用户的信息：${text}
    要求有个性，有设计感，可以抽象一点，可以根据用户的签名来判断生成的头像的风格。
    `
    const res = await kimiChat([
        {
            role: 'user',
            content: prompt
        }
    ])
    return res.data.content
}