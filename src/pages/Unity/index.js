import React, { useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

function App() {
  const { unityInstance } = useUnityContext({
    loaderUrl: 'build/myunityapp.loader.js',
    dataUrl: 'build/myunityapp.data',
    frameworkUrl: 'build/myunityapp.framework.js',
    codeUrl: 'build/myunityapp.wasm',
  });

  const [score, setScore] = useState(0);

  const handleButtonClick = () => {
    unityInstance.SendMessage('GameManager', 'IncrementScore');
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div>
      <Unity unityInstance={unityInstance} />

      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <h1>Score: {score}</h1>
        <button onClick={handleButtonClick}>Increment Score</button>
      </div>
    </div>
  );
}

export default App;
