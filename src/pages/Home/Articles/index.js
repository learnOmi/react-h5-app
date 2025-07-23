import { useDispatch, useSelector } from 'react-redux'
import ArticleItem from '../Article'
import styles from './index.module.scss'
import { useEffect } from 'react';
import { getArticleList } from '@/store/actions/home';

const ArticleList = ({ channelId, activeId }) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.home.articles[activeId]?.list || []);

  useEffect(()=>{
    if ( channelId !== activeId ) return;
    dispatch(getArticleList(activeId, Date.now()));
  }, [dispatch, activeId, channelId]);

  return (
    <div className={styles.root}>
        <div className='article-item'>
            {list.map((item) => {
                return (
                    <ArticleItem key={item.art_id} article={item}></ArticleItem>
                )
            })}
        </div>
    </div>
  )
}

export default ArticleList