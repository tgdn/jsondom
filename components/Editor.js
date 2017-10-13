import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/ext/language_tools';
import 'brace/mode/json';
import 'brace/theme/textmate';

export default ({ value, onChange }) => <AceEditor
  mode="json"
  theme="textmate"
  name="editor"
  editorProps={{$blockScrolling: true}}
  onChange={onChange}
  tabSize={2}
  value={value}
  enableLiveAutocompletion
/>;
