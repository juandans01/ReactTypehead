import React, { Component } from 'react';
import Bloodhound from 'bloodhound-js'
import axios from 'axios'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      engine: null,
      data: [],
      select: ''
    }
  }

  defaultProps = {
    url:'http://stage-groomers.marketplace.akc.org/search/location?term=10001',
  }

  componentWillMount() {
    //axios.get(this.props.url)
  }

  componentDidMount() {
    //TODO Change data to consume prop
    let options = [
      { value: 'dog', label: 'One' },
      { value: 'dig', label: 'One' },
      { value: 'digglet', label: 'One' },
      { value: 'cato', label: 'One' },
      { value: 'cat', label: 'One' },
      { value: 'cit', label: 'One' },
    ];

    let engineArray = []
    for (let i=0; i<options.length; i++) {
      engineArray.push(options[i].value)
    }

    const startEngine = new Bloodhound({
      local: engineArray,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: Bloodhound.tokenizers.whitespace
    })

    this.setState({
      engine: startEngine
    })
  }

  inputChange = (e) => {
    let input = e.target.value
    let promise = this.state.engine.initialize()
    promise.then(() => {
      this.state.engine.search(input, (d) => {
        console.log(d)
        this.setState({
          data: d
        })
      })
    })
    this.setState({
      text: e.target.value
    }, () => {

    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
}

  submit = (e) => {
    e.preventDefault()
    console.log('on submit')
  }

  render() {
    const guessRows = this.state.data.map((item) =>
      (<option key={item} value={item}/>)
    );

    return (
      <div className="App">
        <form action="submit" onSubmit={this.submit}>
          <input list="browsers" name="browser" onKeyPress={this.handleKeyPress} value={this.state.text} onChange={this.inputChange}/>
          <datalist id="browsers" onKeyPress={this.handleKeyPress}>
            {guessRows}
          </datalist>
        </form>
      </div>
    );
  }
}

export default App;
