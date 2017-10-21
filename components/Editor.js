import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/ext/language_tools';
import 'brace/mode/json';
// import 'brace/theme/textmate';
import 'brace/theme/xcode';

export default ({ value, onChange }) => <AceEditor
  width="100%"
  height="100%"
  mode="json"
  theme="xcode"
  name="editor"
  editorProps={{$blockScrolling: true}}
  onChange={onChange}
  tabSize={2}
  value={value}
  enableBasicAutocompletion
  enableLiveAutocompletion
/>;
