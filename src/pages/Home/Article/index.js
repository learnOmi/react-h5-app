import classnames from "classnames";
import styles from './index.module.scss'
import Img from '@/components/Img'
// 扩展dayjs，让其获得显示相对时间的功能
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
// 导入中文包
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const ArticleItem = ({ article, channelId }) => {
    const {
        cover: { type, images },
        title,
        aut_name,
        comm_count,
        pubdate,
    } = article;

    return (
        <div className={styles.root}>
            <div
                className={classnames('article-content',
                    {
                        t3: type === 3,
                        'none-mt': type === 0
                    })
                }
            >
                <h3>{title}</h3>
                {
                    type !== 0 && (
                        <div className="article-imgs">
                            {images.map((item, i) => (
                                <div className="article-img-wrapper" key={i}>
                                    <Img src={item} alt="" />
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
                <span>{aut_name}</span>
                <span>{comm_count} 评论 </span>
                <span>{dayjs(pubdate).fromNow()}</span>
            </div>
        </div>
    )
}

export default ArticleItem