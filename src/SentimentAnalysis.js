// src/SentimentAnalysis.js
import React, { useState } from "react";
import axios from "axios";

function SentimentAnalysisComponent() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleAnalyze = async () => {
    try {
      console.log('text', typeof text);
      const response = await axios.post("http://127.0.0.1:8000/sentiment", {
        text: text
      });
      setSentiment(response.data);
      console.log('response data', response.data);

    } catch (err) {
      setError("Error fetching sentiment data.");
    }
  };

  return (
    <div>
      <h1>Sentiment Analysis</h1>
      <textarea
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />
      <button onClick={handleAnalyze}>Analyze Sentiment</button>

      {sentiment && (
        <div>
          <p>Sentiment: {sentiment.sentiment}</p>
          <p>Confidence: {sentiment.text}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );

}

export default SentimentAnalysisComponent;
