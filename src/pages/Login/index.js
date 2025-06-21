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
    },
    validate: values => {
      const errors = {};
      if (!values.mobile) {
        errors.mobile = '请输入手机号';
      } else if (!/^1[3-9]\d{9}$/.test(values.mobile)) {
        errors.mobile = '手机号格式不正确';
      }
      if (!values.code) {
        errors.code = '请输入验证码';
      } else if (!/^\d{6}$/.test(values.code)) {
        errors.code = '验证码格式不正确';
      }
      return errors;
    }
  })

  const {values:{mobile, code}, handleChange, handleBlur, handleSubmit, errors, touched} = formik;

  return (
    <div className={styles.root}>
      <NavBar>
        登录
      </NavBar>
      <div className="content">
        <h3>验证码登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input name='mobile' onChange={handleChange} onBlur={handleBlur}
              value={mobile} placeholder='用户名' type="text"
              autoComplete='off'></Input>
              {
                errors.mobile && touched.mobile && <div className="validate">{errors.mobile}</div>
              }
          </div>
          <div className="input-item">
            <Input name='code' onChange={handleChange} onBlur={handleBlur}
              value={code} placeholder='密码' type="text" 
              extra="发送验证码" autoComplete='off'></Input>         
              {
                errors.code && touched.code && <div className="validate">{errors.code}</div>
              }
          </div>
          <button className="login-btn">登录</button>
        </form>
      </div>
    </div>
  )
}
