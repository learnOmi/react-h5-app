import React from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'

export default function EditInput({onLeftArrowClick}) {
    return (
        <div className={styles.root}>
            <NavBar
                onLeftArrowClick={onLeftArrowClick}
                extra={<span className='commit-btn'>提交</span>}
            >
                编辑
            </NavBar>
        </div>
    )
}
