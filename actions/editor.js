export const setEditorValue = value => dispatch => {
  return dispatch({ type: 'EDITOR_SET_VALUE', payload: value });
};
