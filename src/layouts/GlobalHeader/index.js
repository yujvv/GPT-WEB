import React, { PureComponent } from 'react';
import { Tooltip, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';

class GlobalHeader extends PureComponent {
  static defaultProps = {
    className: 'header',
  };

  handleChangeLanguage = () => {
    const { dispatch, global } = this.props;
    const { language, interaction } = global;
    dispatch({
      type: 'global/update',
      payload: {
        language: !language,
        interaction: interaction + 1,
      },
    });
  };

  render() {
    const { language } = this.props.global;
    return (
      <Tooltip
        placement="left"
        title={language ? 'Switch Chinese' : '切换英语'}
        className={styles.header}
      >
        <Button ghost size="small" type="primary" onClick={this.handleChangeLanguage}>
          {language ? 'English' : '中文'}
        </Button>
      </Tooltip>
    );
  }
}

export default connect(({ global }) => ({ global }))(GlobalHeader);
