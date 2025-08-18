import { useDispatch, useSelector } from 'react-redux'
import ArticleItem from '../Article'
import styles from './index.module.scss'
import { useEffect } from 'react';
import { getArticleList } from '@/store/actions/home';
import { PullToRefresh } from 'antd-mobile'

const ArticleList = ({ channelId, activeId }) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.home.articles[activeId]?.list || []);

  const onRefresh = async () => {
    // 刷新
    await dispatch(getArticleList(channelId, Date.now()))
  }

  useEffect(()=>{
    if ( channelId !== activeId ) return;
    if ( list.length > 0) return;
    dispatch(getArticleList(activeId, Date.now()));
  }, [dispatch, activeId, channelId, list]);

  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        <div className='article-item'>
            {list.map((item) => {
                return (
                    <ArticleItem key={item.art_id} article={item}></ArticleItem>
                )
            })}
        </div>
      </PullToRefresh>
    </div>
  )
}

export default ArticleList