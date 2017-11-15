import { Map } from 'immutable';
// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
import ui from './ui';
import editor from './editor';

export default combineReducers({
  ui,
  editor,
});
