const Token_key = 'RandomTOken_0021w_App';
const Channel_Key = 'RandomChannel_0021w_App';

/**
 * @description: 设置token，ttl
 * @param {*} token token值
 * @param {*} ttl 毫秒
 */
const setToken = (token, ttl) => {
  const obj = {
    value: token,
    expire: ttl? Date.now() + ttl : null
  }
  localStorage.setItem(Token_key,  JSON.stringify(obj));
}

/**
 * @description: 获取token
 * @returns {string} token
 */
const getToken = () => {
  const obj = JSON.parse(localStorage.getItem(Token_key));
  if(obj?.expire) return obj.expire > Date.now() ? obj.value : {};
  return obj?.value || {};
}

/**
 * @description: 删除token
 * @return {void}
 */
const removeToken = () => {
  localStorage.removeItem(Token_key);
}

/**
 * @description: 判断token是否存在
 * @returns {boolean} true: token存在，false: token不存在
 */
const hasToken = () => {
  return !!getToken().token;
}

const setChannels = (channels) => {
  localStorage.setItem(Channel_Key, JSON.stringify(channels));
}

const getChannles = () => {
  return JSON.parse(localStorage.getItem(Channel_Key));
}

const removeChannels = () => {
  localStorage.removeItem(Channel_Key);
}

const hasChannels = () => {
  return !!getChannles();
}

export {setToken,getToken,removeToken,hasToken};
export {getChannles, setChannels, removeChannels, hasChannels};