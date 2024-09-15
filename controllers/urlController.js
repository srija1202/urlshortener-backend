const { MongoClient } = require('mongodb');

// Set up MongoDB client and connect to database
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

// Helper function to generate a short URL
const generateShortUrl = async () => {
    let shortUrl;
    shortUrl = Math.random().toString(36).substring(2, 8); // Generate a random string of 6 characters
    return shortUrl;
};

// Shorten URL logic
exports.shortenUrl = async (req, res) => {
    const { longUrl } = req.body;

    try {
        // Validate URL format
        const urlPattern = new RegExp(
            "^(https?:\\/\\/)?" + 
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
            "((\\d{1,3}\\.){3}\\d{1,3}))" + 
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
            "(\\?[;&a-z\\d%_.~+=-]*)?" + 
            "(\\#[-a-z\\d_]*)?$", "i"
        );
        if (!urlPattern.test(longUrl)) return res.status(400).json({ message: 'Invalid URL' });

        // Generate and store the short URL
        const shortUrl = await generateShortUrl();
        const shortURL = `${req.protocol}://${req.get("host")}/api/url/${shortUrl}`;

        const collection = db.collection('urls');

        // Create a new URL document
        const url = { longUrl, shortUrl, createdAt: new Date(), createdBy: req.user, clicked: 0 };
        const result = await collection.insertOne(url);

        if (!result.insertedId) return res.status(500).json({ message: 'Failed to insert data' });

        // Respond with the generated short URL
        res.status(200).json({ shortUrl: shortURL });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Redirect to the original URL logic
exports.redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const collection = db.collection('urls');
        const url = await collection.findOne({ shortUrl: `${shortUrl}` });
        
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Increment the clicked count for the short URL
        await collection.updateOne({ shortUrl: `${shortUrl}` }, { $inc: { clicked: 1 } });

        // Redirect to the original long URL
        return res.redirect(url.longUrl);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Get URLs sorted by click count
exports.getClickedUrls = async (req, res) => {
    try {
        const collection = db.collection('urls');

        // Fetch URLs created by the logged-in user, sorted by the number of clicks in descending order
        const urls = await collection.find({ createdBy: req.user }).toArray();
        if (urls.length) return res.status(200).json(urls);

        res.status(404).json({ message: 'No data found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Initialize MongoDB connection
const connectToDatabase = async () => {
    try {
        await client.connect();
        db = client.db('URLShortener');
    } catch (err) {
        process.exit(1);
    }
};

connectToDatabase();

// Close the MongoDB connection on exit
process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});
