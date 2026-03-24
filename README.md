# Tugas-1-PPL-Praktikum

## 1. Deskripsi Project
API Penyimpanan Musik adalah REST API yang dibangun dengan Node.js dan Express.js untuk mengelola koleksi lagu. API ini menyediakan endpoint untuk CRUD (Create, Read, Update, Delete) data musik dengan field seperti judul, artis, album, durasi, dan genre.

## 2. Dokumentasi API

### Endpoint List:
- `GET /api/music` - Mengambil semua lagu
- `GET /api/music/:id` - Mengambil lagu berdasarkan ID
- `POST /api/music` - Menambahkan lagu baru
- `PUT /api/music/:id` - Mengupdate lagu
- `DELETE /api/music/:id` - Menghapus lagu

### Format Response:

**Success Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "duration": 354,
    "genre": "Rock"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "message": "Song not found"
}
```

**Error Response (400 Bad Request):**
```json
{
  "status": "error",
  "message": "Title and artist are required"
}
```

## 3. Panduan Instalasi (Docker)

### Langkah-langkah menjalankan aplikasi:
1. Pastikan Docker dan Docker Compose terinstall
2. Clone repository ini
3. Jalankan perintah berikut:
   ```bash
   docker-compose up --build
   ```

### Informasi Port:
- **Host Port:** 3000
- **Container Port:** 3000
- API akan dapat diakses di `http://localhost:3000`

## 4. Alur Kerja Git

### Branch yang digunakan:
- `main` - Branch utama untuk production
- `develop` - Branch untuk development (jika ada)
- `feature/*` - Branch untuk fitur baru

## 5. Status Automasi (GitHub Actions)

### Penjelasan workflow:
- **CI (Continuous Integration):** Menjalankan unit tests menggunakan Jest setiap push dan pull request ke branch main
- **CS (Continuous Security):** Menjalankan npm audit untuk memeriksa kerentanan keamanan setiap push dan pull request ke branch main

### Badge Status:
[![CI - CS](https://github.com/Skywalks567/Tugas-1-PPL-Praktikum/actions/workflows/ci.yml/badge.svg)](https://github.com/Skywalks567/Tugas-1-PPL-Praktikum/actions/workflows/ci.yml)
[![Continuous Security](https://github.com/Skywalks567/Tugas-1-PPL-Praktikum/actions/workflows/cs.yml/badge.svg)](https://github.com/Skywalks567/Tugas-1-PPL-Praktikum/actions/workflows/cs.yml)
