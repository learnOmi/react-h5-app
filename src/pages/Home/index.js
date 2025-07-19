import React, { useEffect } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelList } from '@/store/actions/home';
import { Toast } from 'antd-mobile';

export default function Home() {
  const dispatch = useDispatch();
  const tabs = useSelector(state => state.home.userChannels || []);
  
  useEffect(()=>{
    try {
      dispatch(getChannelList());
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
      <Tabs tabs={tabs}></Tabs>
    </div>
  )
}
