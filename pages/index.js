import dynamic from 'next/dynamic'
import Renderer from '../components/Renderer';
const Editor = dynamic(import('../components/Editor'), {
  ssr: false,
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: '',
  };

  handleChange(value) {
    this.setState({ value })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <Editor value={this.state.value} onChange={this.handleChange} />
        </div>
        <div>
          <Renderer rawTree={this.state.value} />
        </div>
      </div>
    );
  }
}

export default Index;
