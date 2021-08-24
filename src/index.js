import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function AddWord(props) {
  const addWord = (e) => {
    e.preventDefault();
    const currentWord = props.currentWord;
    let words = props.words;
    if (!words.includes(currentWord)) {
      props.addWord(currentWord);
      props.changeDuplicate();
    } else {
      props.changeDuplicate(true);
    }
  }
  
  return(
    <input type="submit" value="Add word" onClick={addWord}/>
  );
}

function SearchWord(props) {
  const searchWord = (e) => {
    e.preventDefault();
    const currentWord = props.currentWord;
    let words = props.words;
    if (words.includes(currentWord)) {
      props.changeDuplicate(true);
    } else {
      props.changeDuplicate(false);
    }
  }
  
  return(
    <input type="submit" value="Search word" onClick={searchWord}/>
  );
}

function WordList(props) {
  const words = props.words;
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

function Dictionary() {
  const [currentWord, setCurrentWord] = useState();
  const [words, setWords] = useState([]);
  const [duplicate, setDuplicate] = useState();

  const changeCurrentWord = (e) => {
    setCurrentWord(e.target.value);
  }

  const changeDuplicate = (status) => {
    setDuplicate(status);
  }

  const addWord = (word) => {
    setWords(words.concat(word));
  }

  let alert;
  if (duplicate === true) {
    alert = <h5>The word is in the list</h5>
  } else if(duplicate === false){
    alert = <h5>The word is not in the list</h5>
  }
  return(
    <div>
      {alert}
      <form >
        <label>
          Word name:
          <input type="text" onChange={changeCurrentWord}/>
        </label>
        <AddWord changeDuplicate = {changeDuplicate} addWord = {addWord} currentWord = {currentWord} words = {words}/>
        <SearchWord changeDuplicate = {changeDuplicate} currentWord = {currentWord} words = {words}/>
      </form>
      <WordList words = {words}/>
    </div>
  );
}

ReactDOM.render(
  <Dictionary />,
  document.getElementById('root')
);