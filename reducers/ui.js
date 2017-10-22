const initialState = {
  currentTabId: 'renderer',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UI_SET_TAB':
      return {
        ...state,
        currentTabId: action.payload,
      };
    default:
      return state;
  }
}
