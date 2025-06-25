import React, { Suspense } from 'react'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import classNames from 'classnames'

export default function Home() {
  const items = [
    {
      title: '首页',
      icon: 'icon-shouye',
      path: '/home',
      isDefaultSel: true
    },
    {
      title: '问答',
      icon: 'icon-xiaoxi',
      path: '/question'
    },
    {
      title: '视频',
      icon: 'icon-shexiangtou',
      path: '/video'
    },
    {
      title: '我的',
      icon: 'icon-geren',
      path: '/my'
    }
  ];

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {
          items.map(({ title, icon, path, isDefaultSel }) => {
            const isHighlight = location.pathname === path || (isDefaultSel && location.pathname === '/');
            return (
              <div key={path} 
                onClick={() => {navigate(path)}}
                className={classNames("tabbar-item", {"tabbar-item-active" : isHighlight})}>
                <Icon type={ isHighlight ? icon+"-sel" : icon} />
                <span>{title}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
