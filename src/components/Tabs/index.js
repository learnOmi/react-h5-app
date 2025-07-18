import { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { z } from 'zod'
import styles from './index.module.scss'
import React from 'react'

const TabsProps = z.object({
    // z.array() 需要接收一个参数（数组元素的 schema）; 当尝试解析数据时，Zod 会尝试访问元素 schema 的 _parseSync 方法
    tabs: z.array(z.any()).nonempty('tabs cannot be empty'),
});

const Tabs = ({ index = 0, tabs = [], children, onChange }) => {
    const navRef = useRef()
    const lineRef = useRef()

    const [activeIndex, setActiveIndex] = useState(index)

    const changeTab = (index) => {
        setActiveIndex(index)
        onChange && onChange(index)
    }

    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
    // https://github.com/facebook/react/issues/14830
    useEffect(() => {
        setActiveIndex(index)
    }, [index])

    // 当activeIndex发生了改变，修改线的位置以及  tabBar中心的位置
    useEffect(() => {
        // TODO: 清理上一次的 animate
        
        if (!navRef.current) return; // 等待 DOM 准备就绪
        const activeTab = navRef.current.children[activeIndex]
        // console.log(activeTab)
        if (!activeTab) return

        const activeTabWidth = activeTab.offsetWidth || 60
        // 注意：第一次获取 offsetLeft 值为 0 ，以后每次获取为 8
        //      所以，设置默认值 8，让所有情况下 offsetLeft 值都相同
        const activeOffsetLeft = activeTab.offsetLeft || 8
        const tabWidth = navRef.current.offsetWidth || 289

        const to = activeOffsetLeft - (tabWidth - activeTabWidth) / 2
        // navRef.current.scrollLeft = to
        const from = navRef.current.scrollLeft
        const frames = Math.round((0.2 * 1000) / 16)
        let count = 0
        function animate() {
            navRef.current.scrollLeft += (to - from) / frames

            if (++count < frames) {
                requestAnimationFrame(animate)
            }
        }

        animate()

        // window.innerWidth / 375： 手动处理 JS 移动端适配
        // 说明：15 表示 Line 宽度的一半
        lineRef.current.style.transform = `translateX(${activeOffsetLeft + activeTabWidth / 2 - 15 * (window.innerWidth / 375)
            }px)`

        // 注意： 由于 tabs 数据是动态获取的，所以，为了能够在 tabs 数据加载完成后
        //       获取到 tab，所以，此处将 tabs 作为依赖项。
        //       否则，会导致 navRef.current.children[activeIndex] 拿到的是 line 而不是第一个tab
    }, [activeIndex, tabs])

    const tabsProps = TabsProps.safeParse({ tabs });
    if (!tabsProps.success) {
        return <div>Invalid props</div>
    } else {
        return (
            <div className={styles.root}>
                <div className="tabs">
                    <div className="tabs-wrap">
                        <div className="tabs-nav" ref={navRef}>
                            {tabs.map((item, i) => (
                                <div
                                    className={classnames('tab', i === activeIndex ? 'active' : '')}
                                    key={i}
                                    onClick={() => changeTab(i)}
                                >
                                    <span>{item.name}</span>
                                </div>
                            ))}
                            <div className="tab-line" ref={lineRef}></div>
                        </div>
                    </div>

                    <div className="tabs-content">
                        {React.Children.map(children, (child, index) => {
                            return (
                                // 为每个子元素包裹一个 div，用来控制显示或隐藏
                                <div
                                    className="tabs-content-wrap"
                                    style={{ display: index === activeIndex ? 'block' : 'none' }}
                                >
                                    {
                                        // 为每个子元素生成副本，并传入选中选项卡的 id 值
                                        React.cloneElement(child, { aid: tabs[activeIndex]?.id || 0 })
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }


}

export default Tabs