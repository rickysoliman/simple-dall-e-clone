import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  let errorMessage = '';

  const handlePromptChange = (e) => {
    setPrompt(e.nativeEvent.srcElement.value);
  }

  const generateImages = async () => {
    if (!prompt) return;

    setIsLoading(true);
    await openai.createImage({
      prompt,
      n: 4,
      size: '1024x1024',
    })
      .then((resp) => {
        setIsLoading(false);
        setImages(resp.data.data);
      })
      .catch((err) => {
        errorMessage = err.response.data.errorMessage;
        setError(true);
      });
  }

  const loading = (
    <span>Loading...</span>
  );

  return (
    <div className="App">
      <div className="App-error-message">{error ? errorMessage : null}</div>
      <header className="App-header">
        <textarea
          className="App-prompt"
          placeholder="Enter your prompt here"
          onChange={handlePromptChange}
        ></textarea>
        <button
          className="App-button"
          type="submit"
          disabled={!prompt}
          onClick={generateImages}
        >
          {prompt ? 'create your artwork!' : 'please enter a prompt'}
        </button>
      </header>
      <div className="App-result">
        {isLoading ? loading : images.length ? (
          images.map((image) => <img src={image.url} key={image.url} className="App-image" alt="result"></img>)
        ) : null}
      </div>
    </div>
  );
}

export default App;
