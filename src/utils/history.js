import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

// 解决严格模式下history.push(url,{from:history.location.pathname})会先后执行两次，
// 导致login中location.sate.from只能获取当前url而不是导航而来的url的问题
export const createStrictModeHistory = () => {
  const history = createBrowserHistory();
  let isNavigating = false;
  const navigationQueue = [];
  
  // 主导航方法
  const executeNavigation = (to, state) => {
    return new Promise((resolve) => {
      if (isNavigating) {
        // 当前有导航进行中，加入队列
        navigationQueue.push({ to, state, resolve });
        return;
      }
      
      isNavigating = true;
      
      // 执行导航
      history.push(to, state);
      
      // 设置导航完成监听
      const unlisten = history.listen(() => {
        unlisten();
        isNavigating = false;
        resolve();
        
        // 处理队列中的下一个导航
        if (navigationQueue.length > 0) {
          const next = navigationQueue.shift();
          executeNavigation(next.to, next.state).then(next.resolve);
        }
      });
      
      // 安全超时
      setTimeout(() => {
        if (isNavigating) {
          console.warn('导航超时，强制完成');
          isNavigating = false;
          resolve();
          
          if (navigationQueue.length > 0) {
            const next = navigationQueue.shift();
            executeNavigation(next.to, next.state).then(next.resolve);
          }
        }
      }, 300);
    });
  };
  
  // 安全推送方法（直接导航）
  const safePush = (to, state) => {
    executeNavigation(to, state);
  };
  
  // 队列推送方法（加入队列）
  const queuePush = (to, state) => {
    return new Promise((resolve) => {
      // 检查重复请求
      const isDuplicate = navigationQueue.some(
        item => item.to === to && JSON.stringify(item.state) === JSON.stringify(state)
      );
      
      if (!isDuplicate) {
        navigationQueue.push({ to, state, resolve });
        
        // 如果没有进行中的导航，触发队列处理
        if (!isNavigating && navigationQueue.length > 0) {
          const next = navigationQueue.shift();
          executeNavigation(next.to, next.state).then(next.resolve);
        }
      } else {
        console.warn('忽略重复导航请求:', to);
        resolve();
      }
    });
  };
  
  return {
    ...history,
    push: safePush,
    queuePush,
    
    // 添加队列状态方法
    getQueueState: () => ({
      isNavigating,
      queueSize: navigationQueue.length,
      queue: [...navigationQueue]
    })
  };
};

// 导出单例实例
//export const history = createBrowserHistory();
export const history = createStrictModeHistory();

// HistoryRouter 组件用于将 history 对象与 React Router 的 Router 组件结合起来
export const HistoryRouter = ({ history, children }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  //在 DOM 更新后同步执行，确保路由状态变化立即生效。
  React.useLayoutEffect(() => {
    // history 变化时调用 setState
    const unlisten = history.listen(setState);
    return () => {
      // 组件卸载时取消订阅
      unlisten();
    };
  }, [history]);

  // 渲染 Router 组件，并传递路由上下文
  // 传递子组件和导航器以及当前路由状态 (action 和 location)
  // 在 v6 中，底层 <Router> 组件没有 history 属性，而是通过 navigator 传递路由控制对象。
  return React.createElement(Router, Object.assign({ children, navigator: history }, state));
};