const express = require('express')
const app = express()
const port = 3000

let songs = [];
let id = 1;

//middleware to parse JSON bodies
app.use(express.json());

// GET ALL
app.get('/api/music', (req, res) => {
  res.json({ status: 'success', data: songs });
});

// GET BY ID
app.get('/api/music/:id', (req, res) => {
  const song = songs.find(s => s.id == req.params.id);

  if (!song) {
    return res.status(404).json({
      status: 'error',
      message: 'Song not found'
    });
  }

  res.json({ status: 'success', data: song });
});

// POST
app.post('/api/music', (req, res) => {
  if (!req.body.title || !req.body.artist) {
    return res.status(400).json({
      status: 'error',
      message: 'Title and artist are required'
    });
  }

  const song = {
    id: id++,
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album || 'Unknown',
    duration: req.body.duration || 0,
    genre: req.body.genre || 'Unknown'
  };

  songs.push(song);

  res.json({ status: 'success', data: song });
});

// PUT
app.put('/api/music/:id', (req, res) => {
  const song = songs.find(s => s.id == req.params.id);

  if (!song) {
    return res.status(404).json({
      status: 'error',
      message: 'Song not found'
    });
  }

  song.title = req.body.title ?? song.title;
  song.artist = req.body.artist ?? song.artist;
  song.album = req.body.album ?? song.album;
  song.duration = req.body.duration ?? song.duration;
  song.genre = req.body.genre ?? song.genre;

  res.json({ status: 'success', data: song });
});

// DELETE
app.delete('/api/music/:id', (req, res) => {
  const exists = songs.some(s => s.id == req.params.id);

  songs = songs.filter(s => s.id != req.params.id);

  if (!exists) {
    return res.status(404).json({
      status: 'error',
      message: 'Song not found'
    });
  }

  res.json({ status: 'success', message: 'Deleted' });
});

app.listen(port, () => {
  console.log(`Music storage app listening on port ${port}`)
})

