import NavBar from "@/components/NavBar"
import styles from './index.module.scss';
import Input from "@/components/Input";
import { useFormik } from "formik";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      mobile: '',
      code: ''
    },
    onSubmit: values =>{
      console.log(values);
    }
  })

  const {values:{mobile, code}, handleChange, handleSubmit} = formik;

  return (
    <div className={styles.root}>
      <NavBar>
        登录
      </NavBar>
      <div className="content">
        <h3>验证码登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input name='mobile' onChange={handleChange} value={mobile} placeholder='用户名' type="text"></Input>
            {/* <div className="validate">验证</div> */}
          </div>
          <div className="input-item">
            <Input name='code' onChange={handleChange} value={code} placeholder='密码' type="text" extra="发送验证码"></Input>         
            {/* <div className="validate">验证</div> */}
          </div>
          <button className="login-btn">登录</button>
        </form>
      </div>
    </div>
  )
}
