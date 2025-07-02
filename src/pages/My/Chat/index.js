import React from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import Icon from '@/components/Icon'
import Input from '@/components/Input'

export default function Chat() {
    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar className='fixed-header' >
                小智同学
            </NavBar>

            {/* 聊天记录列表 */}
            <div className='chat-list'>

                {/* 机器人的消息 */}
                < div className='chat-item' >
                    <Icon type='icon-line_nianjin' />
                    <div className='message'></div>
                </div>

                {/* 用户的消息 */}
                <div className='chat-item user'>
                    <img src={""} alt=''></img>
                    <div className='message'></div>
                </div>

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
