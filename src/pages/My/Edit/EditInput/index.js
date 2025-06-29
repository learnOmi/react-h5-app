import React, { useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import TextArea from '@/components/TextArea'
import Input from '@/components/Input'
import { useSelector } from 'react-redux'

export default function EditInput({ onLeftArrowClick, type, onCommit }) {
    const defaultValue = useSelector( state => state.profile.profile[type]) || '';
    // useState只会在挂载时使用一次参数作为initValue，后续渲染不再使用 initialValue
    const [value, setValue] = useState( defaultValue);
    
    return (
        <div className={styles.root}>
            <NavBar
                onLeftArrowClick={onLeftArrowClick}
                // 交给父组件决定如何处理数据
                extra={<span className='commit-btn' onClick={ () => onCommit(type, value) }>提交</span>}
            >
                {'编辑' + (type === 'name' ? '昵称' : '简介')}
            </NavBar>
            <div className='content-box'>
                {
                    type === 'name' ?
                        <Input className='input-wrap' value={value} onChange={(e)=>setValue(e.target.value)}></Input>
                        :
                        <TextArea placeholder='请输入简介' value={value} onChange={setValue}></TextArea>
                }
            </div>
        </div>
    )
}
