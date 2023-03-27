// dev or online
// import { isMobile } from '@/utils';
import pwa from './zh-CN/pwa';
import defaultSettings from '../../config/settings.config';
// Date、version...
const nowYear = new Date().getFullYear();
const version = `${defaultSettings.version.replace('/', '')}/`;
// Media
// const mePai = `https://${ isMobile() ? 'm.' : '' }mepai.me/photographyer/u_592e418fe4a53`
//
export default {
  prefix: defaultSettings.prefix,
  version: `${version}`,
  title: defaultSettings.title,
  content: {},
  footer: {
    description: {
      Chinese:
        'WEB-GPT',
      English:
        'WEB-GPT',
    },
    mains: {
      buttons: [
        // {
        //   id: 0,
        //   path: '/1.x',
        //   name: '1.x',
        //   color: 'blue',
        // },
        // {
        //   id: 1,
        //   path: '/2.x',
        //   name: '2.x',
        //   color: 'red',
        // },
        {
          id: 2,
          path: '/GPT',
          name: 'GPT',
          color: 'green',
          target: '_blank',
        },
      ],
      btnSvgPath:
        'M10,10 C10,10 50,9.98999977 90,9.98999977 C130,9.98999977 170,10 170,10 C170,10 170.009995,20 170.009995,30 C170.009995,40 170,50 170,50 C170,50 130,50.0099983 90,50.0099983 C50,50.0099983 10,50 10,50 C10,50 9.98999977,40 9.98999977,30 C9.98999977,20 10,10 10,10 Z',
    },
    copyright: {
      icp: 'Yu',
      Chinese: {
        reserved: `Copyright © 2023-${nowYear} HUAWEI Inc. All Rights Reserved. `,
      },
      English: {
        reserved: `Copyright © 2023-${nowYear} HUAWEI Inc. All Rights Reserved. `,
      },
    },
  },
  ...pwa,
};
