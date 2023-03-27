/*
 * @fileoverview | 图标库JS方案，为区别Ant Design的<Icon />组件，rename为Iconfont，支持自定图标
 * @usage 使用如<Iconfont type="" /> type为icon的类型，可在开发者选用的icon库里选择对应的name
 */
import React from 'react';
// omit.js 对象浅拷贝
import omit from 'omit.js';
import classNames from 'classnames';

export default props => {
  const { type, className = '', size, title = null } = props;
  const classString = classNames(
    {
      micon: true,
      [`micon-${type}`]: true,
      [`micon-${size}`]: size && true,
    },
    className,
  );
  return <i {...omit(props, ['type', 'size'])} className={classString} title={title} />;
};
