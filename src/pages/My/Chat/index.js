import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { getToken } from '@/utils/storage'

export default function Chat() {
    const [messages, setMessages] = useState([
        { type: 'robot', text: 'Hi~' },
        { type: 'user', text: 'Hello~' }
    ]);

    const photo = useSelector(state => state.profile.user.photo || '');

    useEffect(() => {
        const cli = io('http://geek.itheima.net',
            {
                query: {
                    token: getToken().token,
                },
                transports: ['websocket']
            }
        );

        cli.on('connect', () => {
            setMessages(mes => {
                return [
                    ...mes,
                    { type:'robot', text:'请问有什么需要帮助？' }
                ]
            })
        });

        return () => {
            cli.close();
        }
    }, []);

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar className='fixed-header' >
                小智同学
            </NavBar>

            {/* 聊天记录列表 */}
            <div className='chat-list'>
                {
                    messages.map((item, index) => {
                        if (item.type === 'robot') {
                            return (
                                < div className='chat-item' key={index} >
                                    <Icon type='icon-line_nianjin' />
                                    <div className='message'>{item.text}</div>
                                </div>

                            )
                        }
                        else return (
                            <div className='chat-item user' key={index}>
                                <img src={photo} alt=''></img>
                                <div className='message'>{item.text}</div>
                            </div>
                        )
                    })
                }
            </div>

            {/* 底部消息输入框 */}
            <div className='input-footer'>
                <Input
                    className='no-border'
                    placeholder='请输入您的问题'
                />
                <Icon type='icon-line_chevron_left' />
            </div>
        </div>
    )
}
