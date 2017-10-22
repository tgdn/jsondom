import { combineReducers } from 'redux';
import ui from './ui';
import editor from './editor';

export default combineReducers({
  ui,
  editor,
});
