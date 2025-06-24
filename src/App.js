import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
//  动态导入（import()）要求路径必须是静态字符串; Webpack 在构建时无法解析变量或非字面量路径中的别名
const Home = React.lazy(()=> import(`@/pages/Layout`));
const Login = React.lazy(()=> import(`@/pages/Login`));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
