// src/SentimentAnalysis.js
import React, { useState } from "react";
import axios from "axios";
import { Grid, Container, TextField, Button, Typography } from "@mui/material";

function SentimentAnalysisComponent() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState(null);
  // const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Function to handle form submission
  const handleAnalyze = async () => {
    setShowResult(false);
    try {

      console.log('text', typeof text);
      const response = await axios.post("http://127.0.0.1:8000/sentiment", {
        text: text
      });
      setShowResult(true);
      console.log('response data', response.data);
      setOutput(response.data);
    } catch (err) {
      setError("Error fetching sentiment data.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Sentiment Analysis
      </Typography>
      <TextField
        lalbel="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        margin="normal"
      />  
      <Grid>
      <Button variant="contained" color="primary" onClick={handleAnalyze}>
        Analyse Sentiment
      </Button>
      </Grid>

       {/* Show result only if showResult is true */}
       {showResult && output && (
            <Grid style={{ marginTop: "50px" }}>
            <Typography variant="h4" gutterBottom>
              Analysis Results
            </Typography>
            {/* <Typography variant="h5" gutterBottom>
            Input: {output.text}
            </Typography> */}
            <Typography variant="h5" gutterBottom>
                  {output.sentiment[0].map((item, index) => (
                    <li key={index}>
                      {item.label}: {item.score.toFixed(1)*100}%
                    </li>
                  ))}
            </Typography>
            </Grid>
       )}
      
      {/* {output && (
        <div>
          <h2>Analysis Results</h2>
          <p><strong>Text:</strong> {output.text}</p>
          <h3>Sentiment Scores:</h3>
          <ul>
            {output.sentiment[0].map((item, index) => (
              <li key={index}>
                <strong>{item.label}:</strong> {item.score.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {error && <p>{error}</p>}
      </Container>
  );

}

export default SentimentAnalysisComponent;
