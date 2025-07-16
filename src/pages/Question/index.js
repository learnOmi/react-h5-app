import styles from './index.module.scss'
import Img from '@/components/Img'
const Question = () => {
  return (
    <div className={styles.root}>
      <div style={{height:2000}}></div>
      <Img src='https://pic4.zhimg.com/v2-ac8be965a84181ca92f8db9b3ed40c67_1200x500.jpg'></Img>
    </div>
  )
}

export default Question