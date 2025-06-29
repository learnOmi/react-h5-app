import React, { useRef, useEffect } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default function Input({extra, className, onExtraClick , autoFocus,...rest}) {
  const ref = useRef(null);
    // 自动焦点
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
        <input ref={ref} {...rest} className={classNames('input', className)} ></input>
        { extra &&
          <div className='extra' onClick={onExtraClick}>
            {extra}
          </div>
        }
    </div>
  )
}
