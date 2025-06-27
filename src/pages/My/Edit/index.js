import React, { useEffect, useRef } from 'react'
import { DatePicker, List, Toast, Popup } from 'antd-mobile'
import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, updUserInfo } from '@/store/actions/profile'
import classNames from 'classnames'
import EditInput from './EditInput'

export default function ProfileEdit() {
    const [visibleOfDate, setVisibleOfDate] = useState(false);
    const [visibleOfPop, setVisibleOfPop] = useState(false);

    const containerRef = useRef(null);
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
        <div className={styles.root} ref={containerRef}>
            <div className='content'>
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
                        <List.Item extra={userInfo.name} onClick={() => { setVisibleOfPop(!visibleOfPop) }}>
                            昵称
                        </List.Item>
                        <List.Item extra={
                            <span className={classNames('intro', { normal: !!userInfo.intro })}>{userInfo.intro ? userInfo.intro : '未填写'}</span>
                        }
                            onClick={() => { }}
                        >
                            简介
                        </List.Item>
                    </List>
                    <div className="profile-list">
                        <List>
                            <List.Item extra={userInfo.gender === 0 ? '男' : '女'} onClick={() => { }}>
                                性别
                            </List.Item>
                            <List.Item extra={dayjs(new Date(userInfo.birthday)).format('YYYY-MM-DD')}
                                onClick={() => setVisibleOfDate(!visibleOfDate)}>
                                生日
                            </List.Item>
                            <DatePicker
                                visible={visibleOfDate}
                                title="选择日期"
                                value={new Date()}
                                min={new Date(1900, 1, 1, 0, 0, 0)}
                                max={new Date()}
                                onCancel={() => setVisibleOfDate(!visibleOfDate)}
                                onConfirm={(date) => { dispatch(updUserInfo({ birthday: dayjs(new Date(date)).format('YYYY-MM-DD') })); setVisibleOfDate(!visibleOfDate) }}
                            />
                        </List>
                    </div>
                    {/* 底部栏：退出登录按钮 */}
                    <div className="logout">
                        <button className="btn">退出登录</button>
                    </div>
                </div>
            </div>
            <Popup
                visible={visibleOfPop}
                position='right'
                mask={false}
                // Ant Design Mobile 的 Popup 组件默认会使用 Portal 将内容渲染到 body 元素下，而不是直接在父容器中；
                // 通过设置这个属性，Popup 内容将渲染在指定的 DOM 元素内部，而不是默认的 body 上；
                // 从而能够让 index.module.scss 中的 .adm-popup-body 样式生效
                getContainer={containerRef.current}
            >
                <EditInput onLeftArrowClick={()=>{setVisibleOfPop(!visibleOfPop)}}/>
            </Popup>
        </div>
    )
}
