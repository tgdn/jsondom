import dynamic from 'next/dynamic'
import { Tab2, Tabs2 } from '@blueprintjs/core';
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import Layout from 'components/Layout';
import Renderer from 'components/Renderer';
const Editor = dynamic(import('components/Editor'), {
  ssr: false,
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: `{
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
          "type": "text",
          "value": "label"
        }
      },
      {
        "type": "col",
        "props": {
          "width": 12
        },
        "children": {
          "type": "input",
          "props": {
            "fluid": true
          }
        }
      }
    ]
  }
}`,
  };

  handleChange(value) {
    this.setState({ value })
  }

  render() {
    return (
      <Layout>
        <Tabs2 id="Tabs2Example">
            <Tab2
              id="rx"
              title="Editor"
              panel={<Editor value={this.state.value} onChange={this.handleChange} />}
            />
            <Tab2
              id="ng"
              title="Render"
              panel={<Renderer rawTree={this.state.value} />}
            />
        </Tabs2>
      </Layout>
    );
  }
}

export default Index;
