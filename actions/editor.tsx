import Immutable from 'immutable';
import Node, { IRawNode } from 'lib/Node';

export const setEditorValue = (value: IRawNode | string) => (dispatch: any) => {
  let tree: Node;
  if (typeof value === 'string') {
    tree = Node.fromJSON(value);
  } else {
    tree = Node.fromObj(value);
  }
  return dispatch({ type: 'EDITOR_SET_VALUE', payload: tree });
};
