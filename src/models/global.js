/*
 * @fileoverview | 系统公共Model层
 */
export default {
  namespace: 'global',
  // 初始化state
  state: {
    ismobile: false,
    // language初始化为English -> true
    language: true,
    // 交互次数，统计点击
    interaction: 0,
  },
  // 增删改查显隐切换等纯函数
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  // 异步，同步写法，Generator函数
  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  // 初始化或监听data
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },
};
