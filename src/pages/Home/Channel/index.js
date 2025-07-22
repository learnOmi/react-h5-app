import Icon from "@/components/Icon"
import { useDispatch, useSelector } from "react-redux"
import styles from './index.module.scss'
import { differenceBy } from "lodash"
import classNames from "classnames"
import { useState } from "react"
import { delChannel, addChannel } from "@/store/actions/home"
import { Toast } from "antd-mobile"

const Channels = ({ onClose, index, onChange }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const userChannels = useSelector(state => state.home.userChannels)
  // 推荐频道
  const recommendChannels = useSelector(state => {
    const { userChannels, allChannels } = state.home
    return differenceBy(allChannels, userChannels, 'id')
  })

  const changeChannel = (i) => {
    if (editing) return;
    onChange(i);
    onClose();
  }

    // 删除频道
  const del = (channel,i) => {
    if(userChannels.length <= 4) {
      Toast.info('请至少保留4个频道哦');
      return;
    }
    dispatch(delChannel(channel))
    // 删除的时候处理高亮
    // 高亮处理
    // 1.如果删除的 i 和 index 相等，则默认推荐 0
    // 2.小于 index ，默认让i - 1 高亮
    // 3.大于index ， 不处理
    if(i === index) {
      onChange(0);
    }
    if(i<index) {
      onChange(index - 1);
    } 
  }

  const add = async (channel) => {
    // console.log(channel);
    await dispatch(addChannel(channel))
    Toast.show({
      content: '添加成功',
      icon: 'success',
      duration: 1000
    });
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏，带关闭按钮 */}
      <div className="channel-header">
        <Icon type='icon-Clear1' onClick={onClose} />
      </div>
      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', { edit : editing })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {
                editing ? '点击删除频道' : '点击进入频道'
              }
            </span>
            <span className="channel-item-edit" onClick={() => setEditing(!editing)}>
              {
                editing ? '保存' : '编辑'
              }
            </span>
          </div>
          <div className="channel-list">
            {
              userChannels.map((item, i) => (
                <span className={classNames('channel-list-item', {
                  selected: index === i
                })}
                  key={item.id}
                  onClick={changeChannel}
                >
                  {item.name}
                  {item.id !== 0 && (
                    <Icon type='icon-Clear1' onClick={() => del(item,i)} />
                  )}
                </span>
              ))
            }
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="cahnnel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {
              recommendChannels.map((item) => (
                <span 
                  key={item.id} 
                  className='channel-list-item'
                  onClick={()=>add(item)}
                >
                 {item.name}
                </span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels