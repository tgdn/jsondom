import dynamic from 'next/dynamic'
import { Tab2, Tabs2 } from '@blueprintjs/core';
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import reduxPage from 'lib/reduxPage';
import { setEditorValue } from 'actions/editor';
import Layout from 'components/Layout';
import Renderer from 'components/Renderer';
import TreeEditor from 'components/TreeEditor';
const Editor = dynamic(import('components/Editor'), {
  ssr: false,
});

const mapStateToProps = ({ ui: { currentTabId }, editor }) => ({
  tabId: currentTabId,
  rawTree: editor.rawTree,
});

const mapDispatchToProps = dispatch => ({
  setEditorValue: value => dispatch(setEditorValue(value)),
})

class Index extends React.Component {
  render() {
    const { tabId, rawTree } = this.props;
    // let pane;
    // switch (tabId) {}
    return (
      <Layout>
        {tabId === 'editor'
          ? <Editor value={rawTree} onChange={this.props.setEditorValue} />
          : <TreeEditor rawTree={rawTree} />
        }
        {/* <Renderer rawTree={this.state.value} /> */}
      </Layout>
    );
  }
}

export default reduxPage(Index, mapStateToProps, mapDispatchToProps);
