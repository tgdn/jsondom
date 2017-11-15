import Immutable from 'immutable';
import Node from 'lib/Node';

const tree = Node.fromObj({
  "type": "grid",
  "children": [
    {
      "type": "row",
      "children": [
        {
          "type": "col",
          "props": {
            "width": 4
          },
          "children": [
            {
              "type": "button",
              "children": {
                "type": "text",
                "value": "click me"
              }
            },
            {
              "type": "button",
              "children": {
                "type": "text",
                "value": "click me"
              }
            },
            {
              "type": "button",
              "children": {
                "type": "text",
                "value": "click me"
              }
            }
          ]
        }
      ]
    },
    {
      "type": "row",
      "children": [
        {
          "type": "col",
          "props": {
            "width": 4
          },
          "children": {
            "type": "button",
            "children": {
              "type": "text",
              "value": "click me"
            }
          }
        }
      ]
    }
  ]
}, true);

const initialState = Immutable.fromJS({ tree });

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EDITOR_SET_VALUE':
      return state.set('tree', action.payload);
    default:
      return state;
  }
}
