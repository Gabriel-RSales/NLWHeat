import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';
import { io } from 'socket.io-client';

interface IMessage{
    id: string,
    text: string,
    user: {
        login: string,
        avatar_url: string
    }
}

const messageQueue: IMessage[] = [];

const socket = io('http://localhost:3636');

socket.on('new_message', newMessage => {
    messageQueue.push(newMessage);
});

export function MessageList() {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setInterval(() => {
            if(messageQueue.length > 0) {
                setMessages(prevState => [
                    messageQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean))

                messageQueue.shift()
            }
        }, 3000);
    }, []);

    useEffect(() => {
        api.get('messages/last3').then(res => {
            setMessages(res.data);
        })
    }, []);

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(message => {
                    return (
                        <li key={message.id} className={styles.message}>
                            <p className={styles.messageContent}>{message.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImg}>
                                    <img src={message.user.avatar_url} alt={message.user.login} />
                                </div>
                                <span>{message.user.login}</span>
                            </div>
                        </li>
                    );
                })}
                
            </ul>
        </div>
    )
}