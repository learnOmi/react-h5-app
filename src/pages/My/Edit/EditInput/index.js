import React, { useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import TextArea from '@/components/TextArea'

export default function EditInput({onLeftArrowClick, type}) {
    const [name, setName] = useState('dddd')
    return (
        <div className={styles.root}>
            <NavBar
                onLeftArrowClick={onLeftArrowClick}
                extra={<span className='commit-btn'>提交</span>}
            >
                { '编辑' + (type === 'name' ? '昵称':'简介') }
            </NavBar>
            <TextArea value={name} onChange={setName}></TextArea>
        </div>
    )
}
