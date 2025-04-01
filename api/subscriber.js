export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY; // Read from Vercel env variables

    if (!API_KEY) {
        return res.status(500).json({ error: "API Key is missing" });
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    try {
        const response = await fetch("https://api.postscript.io/api/v2/subscribers", options);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch subscribers" });
    }
}