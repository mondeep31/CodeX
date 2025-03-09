import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Language IDs for Judge0 API
const LANGUAGE_IDS: Record<string, number> = {
  java: 4,
  cpp: 2,
  c: 1,
  python: 25
};

// Execute code
router.post('/run', async (req, res) => {
  try {

    const { code, language } = req.body;
    
    if (!code || !language) {
      res.status(400).json({ error: 'Code and language are required' });
      return;
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      res.status(400).json({ error: 'Language not supported' });
      return;
    }

    // Submit code for execution
    const submitResponse = await axios.post('https://judge0-extra-ce.p.rapidapi.com/submissions', {
      source_code: code,
      language_id: languageId,
      stdin: ''
    }, {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    });

    const token = submitResponse.data.token;

    // Wait for a short time before getting the result
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get execution result
    const resultResponse = await axios.get(`https://judge0-extra-ce.p.rapidapi.com/submissions/${token}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    });

    const { stdout, stderr, status } = resultResponse.data;
    res.json({ stdout, stderr, status });
  } catch (error: any) {
    console.error('Execution error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Code execution failed', details: error.response?.data || error.message });
  }
});

export default router;