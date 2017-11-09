const initialState = {
  rawTree: `{
    "type": "grid",
    "children":
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
  }`,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EDITOR_SET_VALUE':
      return {
        ...state,
        rawTree: action.payload,
      };
    default:
      return state;
  }
}
