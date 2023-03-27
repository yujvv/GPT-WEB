import React, { useState } from 'react';
import { Input, Button, Spin } from 'antd';
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/';
const OPENAI_API_KEY = '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';


export default function ChatGPT() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}engines/davinci-codex/completions`, {
        prompt: inputText,
        max_tokens: 50,
        n: 1,
        stop: ['\n']
      }, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      });

      if (response.data.choices && response.data.choices.length > 0) {
        setOutputText(response.data.choices[0].text);
      } else {
        setOutputText('No response from OpenAI API.');
      }
    } catch (error) {
      console.error(error);
      setOutputText('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with GPT</h1>

      <Input.TextArea
        rows={4}
        placeholder="Enter some text..."
        value={inputText}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />

      <Button type="primary" onClick={handleButtonClick} disabled={loading}>
        {loading ? <Spin /> : 'Send'}
      </Button>

      {outputText !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
}
