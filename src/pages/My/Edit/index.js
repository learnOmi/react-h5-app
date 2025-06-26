import React, { useEffect } from 'react'
import { DatePicker, List, Toast } from 'antd-mobile'
import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, updUserInfo } from '@/store/actions/profile'
import classNames from 'classnames'
import { data } from 'react-router-dom'

export default function ProfileEdit() {
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    // 避免返回undefined
    const userInfo = useSelector((state) => state.profile?.profile || {});
    useEffect(() => {
        //useEffect的刷新时机是在页面和变量加载完后，如果这之前抛出错误，不会执行useEffect
        const fetchUserInfo = async () => {
            try {
                await dispatch(getUserInfo());
            } catch (e) {
                Toast.show({
                    content: e.message,
                    duration: 1000,
                    position: 'bottom'
                });
            }
        }

        fetchUserInfo();
    }, [dispatch]);

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar>个人信息</NavBar>
            <div className="wrapper">
                {/* list组件 */}
                <List className="profile-list">
                    <List.Item extra={
                        <span className="avatar-wrapper">
                            <img src={userInfo.photo} alt="" />
                        </span>
                    }
                        onClick={() => { }}>
                        头像
                    </List.Item>
                    <List.Item extra={userInfo.name} onClick={() => { }}>
                        昵称
                    </List.Item>
                    <List.Item extra={
                        <span className={classNames('intro', { normal:!!userInfo.intro })}>{userInfo.intro ? userInfo.intro : '未填写'}</span>
                    }
                        onClick={() => { }}
                    >
                        简介
                    </List.Item>
                </List>
                <div className="profile-list">
                    <List>
                        <List.Item extra={ userInfo.gender === 0 ? '男' : '女' } onClick={() => { }}>
                            性别
                        </List.Item>
                        <List.Item extra={dayjs(new Date(userInfo.birthday)).format('YYYY-MM-DD')}
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
                            onConfirm={(date) => { dispatch(updUserInfo({birthday: dayjs(new Date(date)).format('YYYY-MM-DD')})); setVisible(!visible) }}
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
