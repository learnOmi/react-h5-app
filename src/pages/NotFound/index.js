import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
    const [time, setTime] = useState(3)
    const navgi = useNavigate();;

    useEffect(() => {
        // 倒计时； 与之前的setInterval不同，这里依赖于time，会在time变化后重新开一个定时器
        let timer = setTimeout(() => setTime(time - 1), 1000);
        if (time === 0) {
            clearTimeout(timer);
            navgi('/home')
        }
    }, [time, navgi])
    return (
        <div>
            <h1>对不起，您访问的页面不存在...</h1>
            <p>
                {time} 秒后，返回<Link to='/home'>首页</Link>
            </p>
        </div>
    )
}