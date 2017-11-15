import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic'
import styled from 'styled-components';
import { setEditorValue } from 'actions/editor';
import SidebarView from 'components/SidebarView';
import TreeEditor from 'components/TreeEditor';
import Renderer from 'components/Renderer';
const Editor = dynamic(import('components/Editor'), {
  ssr: false,
});

const mapStateToProps = state => ({
  tree: state.get('editor').get('tree'),
});

const mapDispatchToProps = dispatch => ({
  setEditorValue: value => dispatch(setEditorValue(value)),
});

const ViewsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const CentralContainer = styled.div`
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

class EditorView extends React.Component {
  componentWillReceiveProps(newProps) {}

  render() {
    const tree = this.props.tree;
    return (
      <ViewsContainer>
        <SidebarView attached="right">
          <TreeEditor rootNode={tree} />
        </SidebarView>
        <CentralContainer>
          {tree.render()}
        </CentralContainer>
        {/* <SidebarView attached="left"></SidebarView> */}
      </ViewsContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorView);
