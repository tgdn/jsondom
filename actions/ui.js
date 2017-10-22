export const setTab = tabId => dispatch => {
  return dispatch({ type: 'UI_SET_TAB', payload: tabId });
}
