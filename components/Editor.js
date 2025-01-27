import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/ext/language_tools';
import 'brace/mode/json';
// import 'brace/theme/textmate';
import 'brace/theme/tomorrow_night';

export default ({ value, onChange }) => <AceEditor
  width="100%"
  height="100%"
  mode="json"
  theme="tomorrow_night"
  name="editor"
  editorProps={{$blockScrolling: true}}
  onChange={onChange}
  tabSize={2}
  value={value}
  enableBasicAutocompletion
  enableLiveAutocompletion
/>;
