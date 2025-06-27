import Icon from "@/components/Icon";
import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";
 
function NavBar({children, onLeftArrowClick, extra}) {
    const navigate = useNavigate();
    const back = () => {
        if(onLeftArrowClick){
            onLeftArrowClick();
        }else{
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate('/');
            }
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
                {extra}
            </div>
        </div>
    )
}

export default NavBar;