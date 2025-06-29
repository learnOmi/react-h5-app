import React from 'react'
import styles from './index.module.scss'

export default function EditList({ config,  type, onCancel}) {
  const list = config[type] || [];
  const onCancelClick = () => {
    if(onCancel) onCancel();
  }
  return (
    <div className={styles.root}>
        {list.map(item => 
          <div className='list-item' onClick={item.onClick}>{item.title}</div>
        )}
        <div className='list-item' onClick={()=>onCancelClick()} >取消</div>
    </div>
  )
}
