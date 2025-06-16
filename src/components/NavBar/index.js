import Icon from "@/components/Icon";
import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";
 
function NavBar({children, extra}) {
    const navigate = useNavigate();
    const back = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    return (
        <div className={styles.root}>
            <div className="left">
                <Icon type='icon-line_chevron_left' onClick={back} />
            </div>
            <div className="title">
                {children}
            </div>
            <div className="right">
                <button  onClick={()=>navigate('/login')}>ff</button>
                {extra}
            </div>
        </div>
    )
}

export default NavBar;