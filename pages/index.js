import dynamic from 'next/dynamic'
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
        <Row>
          <Col xs={12} sm={6}>
            <Editor value={this.state.value} onChange={this.handleChange} />
          </Col>
          <Col xs={12} sm={6}>
            <Renderer rawTree={this.state.value} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Index;
