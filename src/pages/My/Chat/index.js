import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '@/utils/storage'
import { getUserInfo } from '@/store/actions/profile'

export default function Chat() {
    const [messages, setMessages] = useState([
        { type: 'robot', text: 'Hi~' },
        { type: 'user', text: 'Hello~' }
    ]);
    const [input, setInput] = useState('');

    const dispatch = useDispatch();
    const photo = useSelector(state => state.profile.user.photo || '');

    const onKeyUp = (e) => {
        if(e.keyCode !== 13) return;
        if(!e.target.value) return;

        // 向服务端发送消息
        cliRef.current.emit("message", {
            msg: input,
            timestamp: Date.now()
        });

        // 显示消息
        setMessages([
            ...messages,
            {type:'user', text: input}
        ]);

        // 清空输入
        setInput('');
    }

    const cliRef = useRef(null);
    const mesRef = useRef(null);

    useEffect(() => {
        // 获取用户信息（头像）
        dispatch(getUserInfo());
        const cli = io('http://geek.itheima.net',
            {
                query: {
                    token: getToken().token,
                },
                transports: ['websocket']
            }
        );

        // 因为useEffect在这里只执行一次，需使用Ref拿到Client
        cliRef.current = cli;

        cli.on('connect', () => {
            setMessages(mes => {
                return [
                    ...mes,
                    { type:'robot', text:'请问有什么需要帮助？' }
                ]
            })
        });

        cli.on('message', (e) => {
            setMessages( mes => {
                return [
                    ...mes,
                    { type:'robot', text: e.msg}
                ]
            })
        });

        return () => {
            cli.close();
        }
    }, [dispatch]);

    useEffect(()=>{
        // 让滚动条滚动到最底部
        mesRef.current.scrollTop = mesRef.current.scrollHeight - mesRef.current.offsetHeight;
    }, [messages]);

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar className='fixed-header' >
                小智同学
            </NavBar>

            {/* 聊天记录列表 */}
            <div className='chat-list' ref={mesRef}>
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
                    value={input}
                    onChange={(e)=>{setInput(e.target.value)}}
                    onKeyUp={onKeyUp}
                />
                <Icon type='icon-line_chevron_left' />
            </div>
        </div>
    )
}
