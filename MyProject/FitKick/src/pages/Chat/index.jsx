import { useEffect, useState, useRef } from 'react';
import { Button, Input, Loading, Toast } from 'react-vant'
import { ChatO, UserO } from '@react-vant/icons';
import useTitle from '@/hooks/useTitle'
import { chat } from '@/llm'
import ReactMarkdown from 'react-markdown'; // 导入Markdown解析器
import styles from './chat.module.css';

const Trip = () => {
    useTitle('智能助手')
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            content: '你好',
            role: 'user'
        },
        {
            id: 2,
            content: '你好，我是你的智能助手',
            role: 'assistant'
        },
    ]);
    const latestMessageIdRef = useRef(0);

    const handleChat = async () => {
        if (text.trim() === "") {
            Toast.info('内容不能为空');
            return;
        }

        setIsSending(true);
        setText("");

        // 添加用户消息
        const userMessage = {
            id: messages.length + 1,
            content: text,
            role: 'user'
        };
        setMessages(prev => [...prev, userMessage]);

        // 准备助手消息（初始为空）
        const assistantMessageId = messages.length + 2;
        latestMessageIdRef.current = assistantMessageId;
        const initialAssistantMessage = {
            id: assistantMessageId,
            content: '',
            role: 'assistant'
        };
        setMessages(prev => [...prev, initialAssistantMessage]);

        // 定义流式更新回调
        const onChunk = (chunk) => {
            setMessages(prev => prev.map(msg => {
                if (msg.id === assistantMessageId) {
                    return { ...msg, content: msg.content + chunk };
                }
                return msg;
            }));
        };

        try {
            // 调用聊天API并传入回调
            await chat([{
                role: 'user',
                content: text
            }], undefined, undefined, undefined, onChunk);
        } catch (error) {
            console.error('Chat error:', error);
            Toast.info('发送失败，请重试');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col h-all">
            <div className={`flex-1 ${styles.chatArea}`}>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? styles.messageRight : styles.messageLeft}`}>
                        {msg.role === 'assistant' && <ChatO className={styles.messageIcon} />}
                        <div className={styles.messageContent}>
                            {/* 使用ReactMarkdown渲染Markdown内容 */}
                            {msg.role === 'assistant' ? (
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            ) : (
                                msg.content
                            )}
                        </div>
                        {msg.role === 'user' && <UserO className={styles.messageIcon} />}
                    </div>
                ))}
            </div>
            <div className={`flex ${styles.inputArea}`}>
                <Input
                    value={text}
                    onChange={(e) => setText(e)}
                    placeholder="请输入消息"
                    className={`flex-1 ${styles.input}`}
                />
                <Button disabled={isSending} type="primary" onClick={handleChat} >发送</Button>
            </div>
            {isSending && (<div className="fixed-loading"><Loading type="ball" /></div>)}        
        </div>
    );
};

export default Trip;