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

  const handlePromptChange = (e) => {
    setPrompt(e.nativeEvent.srcElement.value);
  }

  const generateImage = async () => {
    setIsLoading(true);
    await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    }).then((resp) => {
      setIsLoading(false);
      console.log({ resp });
      setImgSrc(resp.data.data[0].url);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? <span>Loading...</span> : imgSrc ? <img src={imgSrc} key={imgSrc} className="App-logo" alt="logo"></img> : <span>Your AI generated image here</span>}
        <input
          className="App-prompt"
          placeholder='Enter your prompt here'
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
