import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

const Image = ({ className, src, alt }) => {

  const imgRef = useRef(null)
  // 控制是否再加载
  const [loading, setLoading] = useState(true)
  // 控制是否加载失败
  const [error, setError] = useState(false)

  // 加载成功
  const onLoad = () => {
    setError(false)
    setLoading(false)
  }
  const onError = () => {
    setLoading(false)
    setError(true)
  }

  useEffect(() => {
    // 创建一个新的观察器，监听图片
    // 回调函数接收一个 entries 数组，每个 entry 对象包含被观察元素的信息；使用解构获取第一个元素的 isIntersecting 属性
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 目标元素进入可视区，将 data-src 的值赋给 src 属性，浏览器检测到 src 属性变化后开始加载图片
        imgRef.current.src = imgRef.current.dataset.src
        // 取消监听
        observer.unobserve(imgRef.current)
      }
    })
    observer.observe(imgRef.current)
  }, [])

  return (
    <div className={classnames(styles.root, className)}>

      {/* 加载中 */}
      {loading && (<div className='image-icon'>
        <Icon type='icon-filled_question_circle' />
      </div>)}

      {/* 加载出错时显示的内容 */}
      {
        error && (<div className='iamge-icon'>
          <Icon type="icon-filled_info_circle" />
        </div>)
      }
      {/* 加载成功后显示的内容 */}
      {
        !error && (
          <img
            alt={alt}
            data-src={src}
            ref={imgRef}
            onLoad={onLoad}
            onError={onError}
          />
        )
      }
    </div>
  )
}

export default Image