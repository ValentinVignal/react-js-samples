import './App.css';
import { useState } from 'react';


const App = () => {
  
  const rgbToHex = (rgb) => {
    if (!rgb) {
      return "00";
    }
    const value = parseInt(rgb);
    if (isNaN(value) || value < 0) {
      return "00";
    }
    if (value >= 255) {
      return "ff"
    }
    const hex = value.toString(16);
    if (hex.length === 1) {
      return `0${hex}`;
    }
    return hex;
  }
  
  const rgbHasError = (rgb) => {
    if (!rgb) return false;
    const value = parseInt(rgb);
    if (isNaN(value) || value < 0 || value > 255) {
      return true;
    }
    const reg = /^\d+$/;
    if (!reg.test(rgb)) {
      return true;
    }
    return false;
  }
  
  const [red, setRed] = useState("");
  const onRedChange = (event) => {
    setRed(event.target.value);
  }
    const [green, setGreen] = useState("");
  const onGreenChange = (event) => {
setGreen(event.target.value);
  }
    const [blue, setBlue]  = useState("");
  const onBlueChange = (event) => {
setBlue(event.target.value);
  }

  
  const hex = `#${rgbToHex(red)}${rgbToHex(green)}${rgbToHex(blue)}`;
  
  const hasError = rgbHasError(red) || rgbHasError(green) || rgbHasError(blue);
  
  

  return (
    <div>
      <label id="redLabel">Red</label>
      <input id="redColor" value={red} onChange={onRedChange} />
            <label id="greenLabel">Green</label>
      <input id="greenColor" value={green} onChange={onGreenChange} />
            <label id="blueLabel">Blue</label>
      <input id="blueColor" value={blue} onChange={onBlueChange} />
      
      {hasError ? <label id="warningMessage">Error</label> : <div></div>}
      <div id="resultColor" style={{height: "100px", width: "100px", backgroundColor: hex}}/>
    </div>
  )
}


export default App;
