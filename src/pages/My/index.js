import Icon from '@/components/Icon'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfile } from '@/store/actions/profile'
import { Toast } from 'antd-mobile'


const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        await dispatch(getProfile()); // 等待 Promise； 以防异步catch不到error
      } catch (error) {
        Toast.show({
          content: error.message,
          duration: 1000,
          position: 'bottom'
        });
      }
    };
    
    fetchProfile();
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={user.photo} alt="" />
          </div>
          <div className="user-name">{user.name}</div>
          <Link to="/my/profile-edit">
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
          <div className="service-item" onClick={()=>navigate('/my/chat')}>
            <Icon type="icon-line_nianjin" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile