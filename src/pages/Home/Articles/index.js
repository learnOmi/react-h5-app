import { useDispatch, useSelector } from 'react-redux'
import ArticleItem from '../Article'
import styles from './index.module.scss'
import { useEffect, useState } from 'react';
import { getArticleList } from '@/store/actions/home';
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'

const ArticleList = ({ channelId, activeId }) => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.home.articles[activeId]);

    // 是否有更多数据
  const [hasMore, setHasMore] = useState(true);
    // 是否正在加载数据
  const [loading, setLoading] = useState(false);
  const loadMore = async() => {
    if(loading) return;
    //加锁,防止无限loading
    setLoading(true);
    try {
      await dispatch(getArticleList(channelId,current.timestamp,true));
    } finally {
      setLoading(false);
    }
    // 如果没有timestamp，代表没有更多数据
    if(!current.timestamp) {
        setHasMore(false);
    }
  }

  const onRefresh = async () => {
    // 刷新
    setHasMore(true);
    await dispatch(getArticleList(channelId, Date.now()));
  }

  useEffect(()=>{
    if ( channelId !== activeId ) return;
    if ( ! (current && current.list.length > 0)) {
      dispatch(getArticleList(activeId, Date.now()));
    }
  }, [dispatch, activeId, channelId, current]);

  if (!current) return null;

  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        <div className='article-item'>
            {current.list.map((item) => {
                return (
                    <ArticleItem key={item.art_id} article={item}></ArticleItem>
                )
            })}
        </div>
      </PullToRefresh>
      {/* 
        上拉加载更多;
        当 hasMore 属性为 true 时，用户页面滚动到底部 threshold (默认为 250px)时无限滚动组件会调用定义的 loadMore 函数。
      */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}

export default ArticleList