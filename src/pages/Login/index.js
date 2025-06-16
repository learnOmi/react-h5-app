import Icon from "@/components/Icon";
import styles from './index.module.scss';

export default function Login() {
  return (
    <div className={styles.root}>
      <div className="left">
        <Icon type='icon-line_chevron_left' />
      </div>
      <div className="title">
        title
      </div>
      <div className="right">
        right
      </div>
    </div>
  )
}
