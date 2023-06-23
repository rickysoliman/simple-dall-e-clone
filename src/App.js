import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Spinner from './components/common/Spinner';
import './App.css';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [numOfImages, setNumOfImages] = useState(1);
  const [dimensions, setDimensions] = useState('256x256');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePromptChange = (e) => {
    setPrompt(e.nativeEvent.srcElement.value);
  }

  const generateImages = async () => {
    if (!prompt) return;
    if (errorMessage) {
      setErrorMessage('');
    }

    setIsLoading(true);
    await openai.createImage({
      prompt,
      n: numOfImages,
      size: dimensions,
    })
      .then((resp) => {
        setIsLoading(false);
        setImages(resp.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.error.message);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-main-title">DALL·E</h1>
        <textarea
          className="App-prompt"
          placeholder="Enter your prompt here..."
          onChange={handlePromptChange}
        ></textarea>
          <button
            className="App-button"
            type="submit"
            disabled={!prompt}
            onClick={generateImages}
          >Generate</button>
          <div className="App-image-count">
            <label htmlFor="App-image-count-label" className="App-image-count-label">Number of images:</label>
            <select name="App-image-count-selector" className="App-image-count-selector" onChange={(e) => setNumOfImages(Number(e.target.value))}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="App-dimension-selection">
            <label htmlFor="App-dimension-selection-label" className="App-dimension-selection-label">Dimensions:</label>
            <select name="App-dimension-selection-selector" className="App-dimension-selection-selector" onChange={(e) => setDimensions(e.target.value)}>
              <option value="256x256">256x256</option>
              <option value="512x512">512x512</option>
              <option value="1024x1024">1024x1024</option>
            </select>
          </div>
      </header>
      <span>
        {errorMessage ? <div className="App-error-message">{errorMessage}</div> : null}
      </span>
      <div className="App-results">
        {isLoading ? <Spinner/> : images.length ? (
          images.map((image, i) => {
            return (
              <div className="image-container">
                <a href={image.url} target="_blank" rel="noreferrer" key={`image ${i + 1}`}>
                  <img src={image.url} key={`image ${i + 1}`} className="App-image" alt="result"></img>
                </a>
              </div>
            );
        })) : null}
      </div>
    </div>
  );
}

export default App;
