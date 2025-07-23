import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getChannelList } from '@/store/actions/home';
import { Toast } from 'antd-mobile';
import Icon from '@/components/Icon';
import { Popup } from 'antd-mobile';
import Channels from './Channel';
import ArticleList from './Articles';

export default function Home() {
  const [isChlOpen, setChlOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const tabs = useSelector(state => state.home.userChannels || []);
  
  useEffect(()=>{
    try {
      dispatch(getChannelList());
      dispatch(getAllChannels());
    }catch(e){
      Toast.show({
        content: e.message,
        icon: 'fail',
        duration: 1000
      });
    }
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} index={activeTab} onChange={(e) => {setActiveTab(e)}}>
        {
          tabs.map(item => {
            return (
              <ArticleList key={item.id} channelId={item.id} activeId={tabs[activeTab].id}></ArticleList>
            )
          })
        }
      </Tabs>
            {/* 频道 Tab栏右侧的俩个图标 */}
      <div className='tabs-opration'>
        <Icon type="icon-sousuo" />
        <Icon type="icon-tianjia" onClick={() => setChlOpen(!isChlOpen)} />
      </div>
      {/* 频道管理 */}
      <Popup
        position='right'
        visible={isChlOpen}
        mask={false}
        showCloseButton={false}
        onClose={()=>setChlOpen(!isChlOpen)}
        bodyStyle={{width: '100vw'}}
      >
        { isChlOpen && <Channels onClose={()=>setChlOpen(!isChlOpen)} index={activeTab} onChange={(e) => setActiveTab(e)}></Channels>}
      </Popup>
    </div>
  )
}
