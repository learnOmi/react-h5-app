import Icon from "@/components/Icon";
import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames'
 
function NavBar({className, children, onLeftArrowClick, extra}) {
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
        <div className={classNames(styles.root, className)}>
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