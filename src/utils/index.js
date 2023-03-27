/*
 * @fileoverview | 常用工具函数，个别参考 https://github.com/zhangkun-Jser/autils
 */
/**
 * @date     2018-03-17
 * @desc 获取滚动条距顶部的距离
 * @returns  number
 * @author   mukuashi | mukuashi@qq.com
 */
export function getScrollTop() {
  return (
    (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
  );
}
/**
 * @date     2018-03-17
 * @desc 设置滚动条距顶部的距离
 * @returns  number
 * @author   mukuashi | mukuashi@qq.com
 */
export function setScrollTop(value) {
  window.scrollTo(0, value);
  return value;
}
//
const getRelation = (str1, str2) => {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
};
//
const getRenderArr = routes => {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
};
/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @date     2017-07-05
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path,
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}
/**
 * @date     2018-01-10
 * @desc 在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 * @author   mukuashi |mukuashi@qq.com
 */
const requestAnimFrame = (() =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  (callback => {
    window.setTimeout(callback, 1000 / 60);
  }))();

export function scrollTo(to, duration) {
  if (duration < 0) {
    setScrollTop(to);
    return;
  }
  const diff = to - getScrollTop();
  if (diff === 0) return;
  const step = (diff / duration) * 10;
  requestAnimFrame(() => {
    if (Math.abs(step) > Math.abs(diff)) {
      setScrollTop(getScrollTop() + diff);
      return;
    }
    setScrollTop(getScrollTop() + step);
    if ((diff > 0 && getScrollTop() >= to) || (diff < 0 && getScrollTop() <= to)) {
      return;
    }
    scrollTo(to, duration - 16);
  });
}
/**
 * @date     2017-04-11
 * @desc 开发环境判断，暂时分为dev和prod
 * @return {Boolean} true/false | 是否为生产环境production
 * @author   mukuashi | mukuashi@qq.com
 */
export function isProd() {
  const match = 'kquanr.com';
  if (window && window.location && window.location.hostname) {
    return window.location.hostname.includes(match);
  }
  return false;
}
/**
 * @date     2018-05-01
 * @desc 设备环境判断，暂时分为移动和PC
 * @return {Boolean} true/false
 * @author   mukuashi | mukuashi@qq.com
 */
export function isMobile() {
  return navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i);
}
/**
 * @date     2018-05-01
 * @desc 根据cookie生成唯一token指示符
 * @return {String}
 * @author   mukuashi | mukuashi@qq.com
 */
export function getToken() {
  const name = '_bl_uid';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2
    ? parts
        .pop()
        .split(';')
        .shift()
    : null;
}
/**
 * @date 2018-05-11
 * @desc deeply copy object or arrays with nested attributes
 * @param  {any} obj
 * @return {any} deep copy
 * @author   mukuashi | mukuashi@qq.com
 */
export function deepClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let newObj = {};
  if (Array.isArray(obj)) {
    newObj = obj.map(item => deepClone(item));
  } else {
    Object.keys(obj).forEach(key => {
      newObj[key] = deepClone(obj[key]);
      return newObj[key];
    });
  }
  return newObj;
}
/**
 * @date 2018-12-01
 * @desc   load js
 * @param  Array，res url
 * @return script -> js
 * @author mukuashi | mukuashi@qq.com
 */
export function loadExternalJS(arr) {
  if (!(arr && arr.length > 0)) return;
  const scriptArr = Object.values(document.getElementsByTagName('script'));
  const ret = [];
  arr.forEach(url => {
    const script = document.createElement('script');
    const html = document.getElementsByTagName('html')[0];
    script.setAttribute('src', url);
    script.setAttribute('charset', 'UTF-8');
    // 避免重复加载
    if (scriptArr.every(row => !row.src.includes(url))) {
      html.appendChild(script);
      ret.push(script);
    }
  });
  // eslint-disable-next-line consistent-return
  return ret;
}
