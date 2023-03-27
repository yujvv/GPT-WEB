import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Texty from 'rc-texty';
import systemData from '@/locales/zh-CN';
import './index.scss';

const { footer } = systemData;

class GlobalFooter extends PureComponent {
  static defaultProps = {
    className: 'footer',
  };

  render() {
    // const { language } = this.props.global;
    return (
      <footer className="copyright">
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://beian.miit.gov.cn"
          >{`${footer.copyright.icp} `}</a>
          All Rights Reserved
        </p>
        <Texty delay={500} type="scaleBig" mode="reverse" className="texty-inline">
          ©Powered By
        </Texty>
        <a className="team" href="https://github.com/yujvv/BEAT_React">
          BEAT
        </a>
        <Texty delay={500} type="scaleBig" mode="reverse" className="texty-inline">
          · Code Hosted on
        </Texty>
        <Link
          to="git@github.com:yujvv/GPT-WEB.git"
          className="code"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Github
        </Link>
        <br />
        {/*{language ? 'Version ' : '版本'}*/}
        {/*<em className="version" />*/}
        {/*Copyright © 2023 -<em className="date">0</em>*/}
        {/*<em>HUAWEI Inc.</em>*/}
      </footer>
    );
  }
}

export default connect(({ global }) => ({ global }))(GlobalFooter);
