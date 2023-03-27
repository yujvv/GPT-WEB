/*
 * @fileoverview | 路由匹配失败返回的404等报错页面
*/
import React from 'react';
import { Link } from 'dva/router';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.scss';

export default ({ className, type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <ul>
        <li style={{ backgroundImage: `url(${img || config[pageType].img})` }} />
        <li className={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div className={styles.desc}>{desc || config[pageType].desc}</div>
          <div className={styles.actions}>
            {actions || (
              <Link to="/">
                <Button type="primary">返回首页</Button>
              </Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};
