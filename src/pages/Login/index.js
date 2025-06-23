import NavBar from "@/components/NavBar"
import styles from './index.module.scss';
import Input from "@/components/Input";
import { useFormik } from "formik";
import * as Yup from 'yup';
import classNames from 'classnames';
import { login, sendCode } from "@/store/actions/login";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Toast } from "antd-mobile";

export default function Login() {
  const [time, setTime] = useState(0);
  // 全局变量timerRef的方式会导致同一个组件多次渲染时，所有的同一个组件多次渲染的定时器都受到影响
  //const timerRef = useRef(null);
  const dispatch = useDispatch();
  const onExtraClick = async () => {
    if (time > 0) return;
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true
      });
      return;
    }

    try{
      await dispatch(sendCode(mobile));
      setTime(5);
      //timerRef = setInterval(()=>{
      let timer = setInterval(() => {
        //区别于setTime(time-1)中的time是当时闭包中的值，就是0；每次结果都是设置time为-1；
        //而setTime(t => t - 1)中的t是每次time最新的值（React 将最新的 state 通过参数传给回调函数），第一次是5，第二次是4，……
        setTime(t => {
          if (t === 0) {
            clearInterval(timer);
            return 0;
          }
          return t - 1
        });
      }, 1000);
    }catch(e){
      Toast.show({
          content: e.message,
          icon: 'fail',
          duration: 1000
      });
    }


  }

  // useEffect(()=>{
  //   if(time === 0){
  //     clearInterval(timerRef.current);
  //   }
  // },[time]);

  const formik = useFormik({
    initialValues: {
      mobile: '13123456789',
      code: '246810'
    },
    onSubmit: async values => {
      try {
        await dispatch(login(values));
        Toast.show({
          icon: 'success',
          content: 'login successfully!',
          duration: 1000 
        });
      }catch(e){
        Toast.show({
          content: e.message,
          icon: 'fail',
          duration: 1000
      });
      }

    },
    validationSchema: Yup.object({
      mobile: Yup.string().required('请输入手机号').matches(/^1[3-9]\d{9}$/, '手机号格式不正确'),
      code: Yup.string().required('请输入验证码').matches(/^\d{6}$/, '验证码格式不正确')
    })
  })

  const { values: { mobile, code }, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = formik;

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
              extra={time === 0 ? "发送验证码" : time + "s后获取"} onExtraClick={onExtraClick} autoComplete='off'></Input>
            {
              errors.code && touched.code && <div className="validate">{errors.code}</div>
            }
          </div>
          <button className={classNames('login-btn', { disabled: !isValid })} disabled={!isValid}>登录</button>
        </form>
      </div>
    </div>
  )
}
