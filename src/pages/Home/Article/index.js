import classnames from "classnames";
import styles from './index.module.scss'
import Img from '@/components/Img'


const ArticleItem = ({ article,channelId }) => {
  const images = [
    'http://geek.itheima.net/resources/images/3.jpg',
    'http://geek.itheima.net/resources/images/52.jpg',
    'http://geek.itheima.net/resources/images/91.jpg',
  ]

  return (
    <div className={styles.root}>
      <div
        className={classnames('article-content', 't3')}
      >
        <h3>Test</h3>
        <div className="article-imgs">
            {images.map((item, i) => (
            <div className="article-img-wrapper" key={i}>
                <Img src={item} alt="" />
            </div>
            ))}
        </div>
      </div>
      <div className={classnames('article-info')}>Test</div>
    </div>
  )
}

export default ArticleItem