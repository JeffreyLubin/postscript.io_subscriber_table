export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY;  // Use environment variable securely
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: API_KEY
      }
    };
  
    const response = await fetch('https://api.postscript.io/api/v2/subscribers', options);
    const data = await response.json();
    
    res.status(200).json(data);
  }