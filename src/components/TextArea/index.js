import React, { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default function TextArea({className, maxLength = 100, value, onChange, ...rest}) {
  // TextArea组件内部需要使用state获取当前value的length，然后自然需要通过setTextVaule更改显示的内容
  // 父组件的value传递过来初始值
  const [textValue, setTextValue] = useState(value || '');
  const handleChange = (e)=>{
    setTextValue(e.target.value);
    // 根据父组件传递的change函数修改父组件绑定的state变量
    onChange && onChange(e.target.value);
  }

  return (
    <div className={styles.root}>
        <textarea
          className={classNames('textarea', className)}
          value={textValue}
          maxLength={maxLength}
          onChange={handleChange}
         {...rest}>
        </textarea>
        <div className='count'>
            {textValue.length}/{maxLength}
        </div>
    </div>
  )
}
