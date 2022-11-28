import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

const configuration = new Configuration({
  apiKey: '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', // need to hide this in a variable later
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  let errorMessage = '';

  const handlePromptChange = (e) => {
    setPrompt(e.nativeEvent.srcElement.value);
  }

  const generateImage = async () => {
    if (imgSrc) {
      setImgSrc('');
    }

    setIsLoading(true);
    await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    })
      .then((resp) => {
        setIsLoading(false);
        setImgSrc(resp.data.data[0].url);
      })
      .catch((err) => {
        console.log({ err });
        handleError(err.data.errorMessage);
      });
  }

  const handleError = (message) => {
    errorMessage = message;
    setError(true);
  }

  const image = (
    <div>
      <h2>{prompt}</h2>
      <img src={imgSrc} key={imgSrc} className="App-logo" alt="logo"></img>
    </div>
  );

  const loading = (
    <span>Loading...</span>
  );

  const initial = (
    <span>Your AI generated image here</span>
  );

  return error ? (<span>{errorMessage}</span>) : (
    <div className="App">
      <header className="App-header">
        {isLoading ? loading : imgSrc ? image : initial}
        <input
          className="App-prompt"
          placeholder="Enter your prompt here"
          onChange={handlePromptChange}
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
