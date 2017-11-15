import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  currentTabId: 'renderer',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UI_SET_TAB':
      return state.set('currentTabId', action.payload);
    default:
      return state;
  }
}
