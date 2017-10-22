import withRedux from 'next-redux-wrapper';
import initStore from '../store';

export default (Component, ...params) => withRedux(
  initStore,
  ...params,
)(Component);
