const request = require('supertest');
const app = require('./index');

let createdSongId;

// GET all (awal kosong / tetap 200)
test('GET /api/music - should return all songs', async () => {
  const res = await request(app).get('/api/music');

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('success');
  expect(Array.isArray(res.body.data)).toBe(true);
});

// POST create song
test('POST /api/music - should create new song', async () => {
  const res = await request(app)
    .post('/api/music')
    .send({
      title: 'Bohemian Rhapsody',
      artist: 'Queen'
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('success');
  expect(res.body.data.title).toBe('Bohemian Rhapsody');
  expect(res.body.data.artist).toBe('Queen');

  createdSongId = res.body.data.id;
});

// GET by id
test('GET /api/music/:id - should return single song', async () => {
  const res = await request(app).get(`/api/music/${createdSongId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.data.id).toBe(createdSongId);
});

// GET by id (NOT FOUND)
test('GET /api/music/:id - should return 404 if not found', async () => {
  const res = await request(app).get('/api/music/9999');

  expect(res.statusCode).toBe(404);
  expect(res.body.status).toBe('error');
});

// PUT update song
test('PUT /api/music/:id - should update song', async () => {
  const res = await request(app)
    .put(`/api/music/${createdSongId}`)
    .send({
      title: 'Updated Song',
      artist: 'Updated Artist',
      album: 'New Album',
      duration: 300,
      genre: 'Rock'
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.data.title).toBe('Updated Song');
  expect(res.body.data.artist).toBe('Updated Artist');
  expect(res.body.data.album).toBe('New Album');
  expect(res.body.data.duration).toBe(300);
  expect(res.body.data.genre).toBe('Rock');
});

// PUT (NOT FOUND)
test('PUT /api/music/:id - should return 404 if not found', async () => {
  const res = await request(app)
    .put('/api/music/9999')
    .send({ title: 'Fail' });

  expect(res.statusCode).toBe(404);
});

// DELETE song
test('DELETE /api/music/:id - should delete song', async () => {
  const res = await request(app).delete(`/api/music/${createdSongId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Deleted');
});

// DELETE (NOT FOUND tetap aman)
test('DELETE /api/music/:id - should handle delete non-existing', async () => {
  const res = await request(app).delete('/api/music/9999');

  expect(res.statusCode).toBe(404);
  expect(res.body.status).toBe('error');
});