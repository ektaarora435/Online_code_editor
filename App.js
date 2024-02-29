import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/execute', { code, language });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error occurred while executing code.');
    }
  };

  return (
    <div className="container">
      <h1>Online Code Editor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
        ></textarea>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button type="submit">Execute</button>
      </form>
      {output && (
        <div className="output">
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
