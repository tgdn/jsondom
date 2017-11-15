import Immutable from 'immutable';
import Node from 'lib/Node';

export const setEditorValue = value => dispatch => {
  let tree;
  if (typeof value === 'string') {
    tree = Node.fromJSON(value);
  } else {
    tree = Node.fromObj(value);
  }
  return dispatch({ type: 'EDITOR_SET_VALUE', payload: tree });
};
