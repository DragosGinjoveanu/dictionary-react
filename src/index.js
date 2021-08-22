import React from 'react';
import ReactDOM from 'react-dom';

function WordList(props) {
  const words = props.words;
  console.log(words);
  const listWords = words.map((word) =>
    <li key={word.toString()}>
      {word}
    </li>
  );

  return (
    <ul>
      {listWords}
    </ul>
  );
}

class Dictionary extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentWord: '',
      duplicate: false,
      words: []
    }
  }

  addCurrentWord = (event) => {
    this.setState({ currentWord: event.target.value});
  }
  
  handleSubmit = (event) => {
    const currentWord = this.state.currentWord;
    let words = this.state.words;
    if (!words.includes(currentWord)) {
      words.push(currentWord);
      this.setState({duplicate: false});
    } else {
      this.setState({duplicate: true});
    }
    this.setState({words: words});
    event.preventDefault();
  }

  render() {
    let alert;
    if (this.state.duplicate) {
      alert = <h5>The word is already in the list</h5>
    }
    return (
      <div>
        {alert}
        <form onSubmit={this.handleSubmit}>
          <label>
            Word name:
            <input type="text" value={this.state.value} onChange={this.addCurrentWord} />
          </label>
          <input type="submit" value="Add word" />
        </form>
        <WordList words = {this.state.words}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Dictionary />,
  document.getElementById('root')
);