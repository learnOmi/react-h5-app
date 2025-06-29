import React, { useEffect, useRef, useState } from 'react'
import { DatePicker, List, Toast, Popup } from 'antd-mobile'
import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, updUserInfo, updUserPhoto } from '@/store/actions/profile'
import classNames from 'classnames'
import EditInput from './EditInput'
import EditList from './EditList'


export default function ProfileEdit() {
    const editList = {
         photo: [
      {
        title: '拍照',
        onClick: () => {
          console.log('拍照');
        }
      },
      {
        title: '本地选择',
        onClick: () => {
            fileRef.current.click();
        }
      }
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          onCommit('gender', 0)
        }
      },
      {
        title: '女',
        onClick: () => {
          onCommit('gender', 1)
        }
      }
    ]
    };

    const [visibleOfDate, setVisibleOfDate] = useState(false);
    const [visibleOfPopRight, setVisibleOfPopRight] = useState({
        isVisible: false,
        type: ''
    });
    const [visibleOfPopBottom, setVisibleOfPopBottom] = useState({
        isVisible: false,
        type: ''
    });

    const containerRef = useRef(null);
    const fileRef = useRef(null);
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

    const onCommit = async (type, value)=>{
        try{
            if(visibleOfPopRight.isVisible) setVisibleOfPopRight({...visibleOfPopRight, isVisible: !visibleOfPopRight.isVisible});
            if(visibleOfPopBottom.isVisible) setVisibleOfPopBottom({...visibleOfPopBottom, isVisible: !visibleOfPopBottom.isVisible});
            const res = await dispatch(updUserInfo({
                [type]: value
            }));
            Toast.show({
                icon: 'success',
                content: res.message,
                duration: 1000
            });
        }catch(e){
            Toast.show({
                content: e.message,
                duration: 1000,
                position: 'bottom'
            });
        }

    }

    const updFile = async (e) => {
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('photo', file)
        try{
            const res = await dispatch(updUserPhoto(fd));
            Toast.show({
                icon: 'success',
                content: res.message,
                duration: 1000
            });
        }catch(e){
            Toast.show({
                content: e.message,
                duration: 1000,
                position: 'bottom'
            });
        }finally{
            setVisibleOfPopBottom({...visibleOfPopBottom, isVisible:false})
        }

    }

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
                            onClick={() => { setVisibleOfPopBottom({isVisible: !visibleOfPopBottom.isVisible, type:'photo'}) }}>
                            头像
                        </List.Item>
                        <List.Item extra={userInfo.name} onClick={() => { setVisibleOfPopRight({isVisible:!visibleOfPopRight.isVisible, type:'name'}) }}>
                            昵称
                        </List.Item>
                        <List.Item extra={
                            <span className={classNames('intro', { normal: !!userInfo.intro })}>{userInfo.intro ? userInfo.intro : '未填写'}</span>
                        }
                            onClick={() => { setVisibleOfPopRight({isVisible:!visibleOfPopRight.isVisible, type:'intro'}) }}
                        >
                            简介
                        </List.Item>
                    </List>
                    <div className="profile-list">
                        <List>
                            <List.Item extra={userInfo.gender === 0 ? '男' : '女'} onClick={() => { setVisibleOfPopBottom({isVisible: !visibleOfPopBottom.isVisible, type:'gender'}) }}>
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
                    <input type='file' style={{display:'none'}} ref={fileRef} onChange={updFile}></input>
                    {/* 底部栏：退出登录按钮 */}
                    <div className="logout">
                        <button className="btn">退出登录</button>
                    </div>
                </div>
            </div>
            <Popup
                visible={visibleOfPopRight.isVisible}
                position='right'
                mask={false}
                // Ant Design Mobile 的 Popup 组件默认会使用 Portal 将内容渲染到 body 元素下，而不是直接在父容器中；
                // 通过设置这个属性，Popup 内容将渲染在指定的 DOM 元素内部，而不是默认的 body 上；
                // 从而能够让 index.module.scss 中的 .adm-popup-body 样式生效
                getContainer={containerRef.current}
            >
                {
                    // 防止EditInput直接随着父组件被加载出来
                    visibleOfPopRight.isVisible && 
                    <EditInput type={visibleOfPopRight.type} 
                        onLeftArrowClick={()=>{setVisibleOfPopRight({...visibleOfPopRight, isVisible:!visibleOfPopRight.isVisible});}}
                        onCommit={onCommit}
                    />

                }
            </Popup>
            <Popup
                visible={visibleOfPopBottom.isVisible}
                position='bottom'
                onMaskClick={()=>setVisibleOfPopBottom({...visibleOfPopBottom, isVisible: false})}
                // Ant Design Mobile 的 Popup 组件默认会使用 Portal 将内容渲染到 body 元素下，而不是直接在父容器中；
                // 通过设置这个属性，Popup 内容将渲染在指定的 DOM 元素内部，而不是默认的 body 上；
                // 从而能够让 index.module.scss 中的 .adm-popup-body 样式生效
                getContainer={containerRef.current}
            >
                {
                    // 防止EditInput直接随着父组件被加载出来
                    visibleOfPopBottom.isVisible && 
                    <EditList type={visibleOfPopBottom.type} config={editList} onCancel={()=>setVisibleOfPopBottom({...visibleOfPopBottom, isVisible: false})}
                    />

                }
            </Popup>
        </div>
    )
}
