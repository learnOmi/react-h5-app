import React from 'react'
import { DatePicker, List } from 'antd-mobile'
import { NavBar } from 'antd-mobile'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function ProfileEdit() {
    const [visible, setVisible] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar>个人信息</NavBar>
            <div className="wrapper">
                {/* list组件 */}
                <List className="profile-list">
                    <List.Item extra={
                        <span className="avatar-wrapper">
                            <img src="" alt="" />
                        </span>
                    }
                        onClick={() => { }}>
                        头像
                    </List.Item>
                    <List.Item extra={"name"} onClick={() => { }}>
                        昵称
                    </List.Item>
                    <List.Item extra={
                        <span className="intro">{'未填写'}</span>
                    }
                        onClick={() => { }}
                    >
                        简介
                    </List.Item>
                </List>
                <div className="profile-list">
                    <List>
                        <List.Item extra={'男'} onClick={() => { }}>
                            性别
                        </List.Item>
                        <List.Item extra={dayjs(birthDate).format('YYYY-MM-DD')}
                            onClick={() => setVisible(!visible)}>
                            生日
                        </List.Item>
                        <DatePicker
                            visible={visible}
                            title="选择日期"
                            value={new Date()}
                            min={new Date(1900, 1, 1, 0, 0, 0)}
                            max={new Date()}
                            onCancel={() => setVisible(!visible)}
                            onConfirm={(date) => { setBirthDate(date); setVisible(!visible) }}
                        />
                    </List>
                </div>
                {/* 底部栏：退出登录按钮 */}
                <div className="logout">
                    <button className="btn">退出登录</button>
                </div>
            </div>
        </div>
    )
}
