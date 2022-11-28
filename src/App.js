import { useState } from 'react';
// import { openai } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

// const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: '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', // need to hide this in a variable later
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [imgSrc, setImgSrc] = useState('');

  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: 'a white siamese cat',
      n: 1,
      size: '1024x1024',
    });
    console.log({ response });
    setImgSrc(response.data.data[0].url);
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
          onClick={generateImage}
        >
          Submit
        </button>
      </header>
    </div>
  );
}

export default App;
