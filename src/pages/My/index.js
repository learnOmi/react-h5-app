import Icon from '@/components/Icon'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'


const Profile = () => {
  const user = {
    name: '张三',
    photo: 'https://example.com/avatar.jpg',
    art_count: 5,
    follow_count: 10,
    fans_count: 20,
    like_count: 15
  }

  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={user.photo} alt="" />
          </div>
          <div className="user-name">{user.name}</div>
          <Link to="/">
            个人信息 <Icon type="icon-line_chevron_left" />
          </Link>
        </div>

        {/* 今日阅读区域 */}
        <div className="read-info">
          <Icon type="icon-shijian" />
          今日阅读 <span>10</span> 分钟
        </div>

        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{user.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{user.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{user.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{user.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="icon-xiaoxi2" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="icon-icon_filled_star" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="icon-lishi" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="icon-line_baodan" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item">
            <Icon type="icon-filled_info_circle" />
            <div>用户反馈</div>
          </div>
          <div className="service-item">
            <Icon type="icon-line_nianjin" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile