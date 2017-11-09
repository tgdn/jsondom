import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SidebarView from 'components/SidebarView';
import TreeEditor from 'components/TreeEditor';
import Renderer from 'components/Renderer';

const mapStateToProps = ({ editor }) => ({
  rawTree: editor.rawTree,
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
  render() {
    const { rawTree } = this.props;
    console.log(rawTree);
    return (
      <ViewsContainer>
        <SidebarView attached="right">
          <TreeEditor rawTree={rawTree} />
        </SidebarView>
        <CentralContainer>
          <Renderer rawTree={rawTree} />
        </CentralContainer>
        <SidebarView attached="left" />
      </ViewsContainer>
    );
  }
}

export default connect(mapStateToProps)(EditorView);
