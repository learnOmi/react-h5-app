import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom"; 
import AuthRoute from "./components/AuthRoute";
import { HistoryRouter } from "./utils/history";
import { history } from "./utils/history";
//  动态导入（import()）要求路径必须是静态字符串; Webpack 在构建时无法解析变量或非字面量路径中的别名
const Laoyout = React.lazy(()=> import(`@/pages/Layout`));
const Login = React.lazy(()=> import(`@/pages/Login`));
const Question = React.lazy(()=> import(`@/pages/Question`));
const Home = React.lazy(()=> import(`@/pages/Home`));
const My = React.lazy(()=> import(`@/pages/My`));
const Video = React.lazy(()=> import(`@/pages/Video`));
const ProfileEdit = React.lazy(() => import(`@/pages/My/Edit`));
const ProfileChat = React.lazy(() => import(`@/pages/My/Chat`));
const NotFound = React.lazy(() => import(`@/pages/NotFound`));


function App() {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Laoyout />}>
            <Route index path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="question" element={<Question />}></Route>
            <Route path="video" element={<Video />}></Route>
            <Route path="my" element={<My />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/my/profile-edit" element={<AuthRoute><ProfileEdit /></AuthRoute>}></Route>
          <Route path="/my/chat" element={<AuthRoute><ProfileChat /></AuthRoute>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
}

export default App;
