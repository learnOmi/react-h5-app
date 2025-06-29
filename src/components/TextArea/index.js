import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default function TextArea({className, maxLength = 100, value, onChange, autoFocus, ...rest}) {
  // TextArea组件内部需要使用state获取当前value的length，然后自然需要通过setTextVaule更改显示的内容
  // 父组件的value传递过来初始值
  const [textValue, setTextValue] = useState(value || '');
  const handleChange = (e)=>{
    setTextValue(e.target.value);
    // 根据父组件传递的change函数修改父组件绑定的state变量
    onChange && onChange(e.target.value);
  }

  const ref = useRef(null);
  // 自动焦点;
  // 在React的`useEffect`中，能确保了虚拟DOM已经更新并提交到了真实DOM，但此时浏览器可能还没有完成布局和绘制，所以立即聚焦可能会失败；
  // 所以可以使用setTimeout延迟，或者使用更好的方式requestAnimationFrame
  // React 组件渲染 → DOM 更新 → 浏览器渲染
  //     │                │            │
  //     ├─ useEffect ────┘            │
  //     │                             │
  //     └─ requestAnimationFrame ─────┘
  useEffect(()=>{
    if(autoFocus){
      let frameId;
      
      const focusTextarea = () => {
        if (ref.current) {
          ref.current.focus();
          ref.current.setSelectionRange(-1, -1);
        }
      };
      
      // 使用 requestAnimationFrame 确保在浏览器重绘前执行
      frameId = requestAnimationFrame(() => {
        focusTextarea();
      });
      
      return () => {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };
    }
  },[autoFocus]);

  return (
    <div className={styles.root}>
        <textarea
          ref={ref}
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
