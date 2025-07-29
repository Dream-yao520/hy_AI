import {
    useEffect,
    useState
} from 'react';
import {
    Button,
    Input,
    Loading,
    Toast
} from 'react-vant'
import { ChatO, UserO } from '@react-vant/icons';
import useTitle from '@/hooks/useTitle'
import {
    chat
} from '@/llm'
import styles from './trip.module.css';

const Trip = () => {
    useTitle('旅游智能客服')
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    // 数据驱动界面
    // 静态界面
    const [messages, setMessages] = useState([
        {
            id: 1,
            content: '你好',
            role: 'user'
        },
        {
            id: 2,
            content: 'hello~~,I am a travel assistant',
            role: 'assistant'
        },
    ]);
    const handleChat = async () => {
        if (text.trim() === "") {
            Toast.info('内容不能为空');
            return
        }
        setIsSending(true);
        setText("")
        setMessages((prev) => [...prev, {
            id: prev.length + 1,
            content: text,
            role: 'user'
        }])
        const newMassage = await chat([{
            role: 'user',
            content: text
        }]);
        setMessages((prev) => [...prev, newMassage.data])
        setIsSending(false);

    }
    return (
        <div className="flex flex-col h-all">
            <div className={`flex-1 ${styles.chatArea}`}>
                {
                    messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? styles.messageRight : styles.messageLeft}`}>
                            {msg.role === 'assistant' ? <ChatO /> : <UserO />}
                            <div className={styles.messageContent}>
                                {msg.content}
                            </div>
                        </div>
                    ))
                }
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
    )
}

export default Trip