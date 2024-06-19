const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/music-library', { useNewUrlParser: true, useUnifiedTopology: true });

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    lyrics: String,
    chords: String
});

const Song = mongoose.model('Song', songSchema);

app.use(express.static('public'));

app.get('/api/songs', async (req, res) => {
    const search = req.query.search;
    let songs;
    if (search) {
        const regex = new RegExp(search, 'i'); // 'i' σημαίνει case-insensitive
        songs = await Song.find({ $or: [{ title: regex }, { artist: regex }, { lyrics: regex }] });
    } else {
        songs = await Song.find();
    }
    res.json(songs);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
