import ArticleItem from '../Article'
import styles from './index.module.scss'

const ArticleList = ({ channelId, activeId }) => {
  return (
    <div className={styles.root}>
        <div className='article-item'>
            <ArticleItem></ArticleItem>
        </div>
    </div>
  )
}

export default ArticleList