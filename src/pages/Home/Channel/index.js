import Icon from "@/components/Icon"
import { useSelector } from "react-redux"
import styles from './index.module.scss'
import { differenceBy } from "lodash"
import classNames from "classnames"

const Channels = ({ onClose, index, onChange }) => {
  const userChannels = useSelector(state => state.home.userChannels)
  // 推荐频道
  const recommendChannels = useSelector(state => {
    const { userChannels, allChannels } = state.home
    return differenceBy(allChannels, userChannels, 'id')
  })

  return (
    <div className={styles.root}>
      {/* 顶部栏，带关闭按钮 */}
      <div className="channel-header">
        <Icon type='icon-Clear1' onClick={onClose} />
      </div>
      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>

          </div>
          <div className="channel-list">
            {
              userChannels.map((item, i) => (
                <span className={classNames('channel-list-item', {
                  selected: index === i
                })}
                  key={item.id}
                >
                  {item.name}
                </span>
              ))
            }
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="cahnnel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
          </div>
          <div className="channel-list">
            {
              recommendChannels.map((item) => (
                <span 
                key={item.id} 
                className='channel-list-item'
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