import { useState } from 'react';
import './App.css';

const App = () => {
  const [imgSrc, setImgSrc] = useState('');

  const handleClick = () => {
    setImgSrc('https://lh3.googleusercontent.com/ogw/AOh-ky37qxWvGGL7ZZs09PtotH_jzuyCkajWrEwactyWYQ=s64-c-mo');
  }

  return (
    <div className="App">
      <header className="App-header">
        {imgSrc && <img
          src={imgSrc}
          key={imgSrc}
          className="App-logo"
          alt="logo" />}
        <input
          className="App-prompt"
          placeholder='Enter your prompt here'
        ></input>
        <button
          className="App-button"
          onClick={handleClick}
        >
          Submit
        </button>
      </header>
    </div>
  );
}

export default App;
