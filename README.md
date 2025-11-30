# Task Manager UTS – IF220 Pemrograman Front-End

## Nama: MUHAMMAD SYAFIQ FAWWAZ AL HANIF
## NIM: 1002240021
Aplikasi **Task Manager UTS** adalah aplikasi web sederhana berbasis **HTML, CSS, dan JavaScript** yang digunakan untuk mengelola daftar tugas (to-do list) dengan fitur tambah, ubah, hapus, filter, pencarian, dan statistik.  
Aplikasi ini dibuat sebagai bagian dari **UTS Mata Kuliah IF220 – Pemrograman Front-End**.

---

## Tujuan Aplikasi
Aplikasi ini dibuat untuk membantu pengguna:
- Menambahkan dan mengatur tugas
- Mengelompokkan tugas berdasarkan kategori
- Melihat statistik tugas secara cepat
- Melakukan pencarian dan filter dengan mudah

---

## Fitur Utama
Aplikasi ini memiliki minimal **3 fitur utama** sesuai ketentuan UTS:

### 1. CRUD (Create, Read, Update, Delete)
- Tambah tugas  
- Edit tugas  
- Hapus tugas  

### 2. Filter & Pencarian
- Filter berdasarkan **kategori**
- Filter berdasarkan **status** (Selesai / Belum)
- Pencarian berdasarkan **judul tugas**

###  3. Statistik Tugas
- Total tugas  
- Tugas selesai  
- Tugas belum selesai  
- Total estimasi jam  

### 4. Validasi Form + Feedback
- Wajib isi judul, kategori, deadline  
- Estimasi jam tidak boleh negatif  
- Pesan sukses dan gagal tampil secara dinamis  

---

## Jenis Data yang Digunakan
Aplikasi menggunakan minimal **2 jenis data**:

### 1. **Data Tugas**
```json
{
  "title": "Mengerjakan UTS",
  "description": "Laporan bab 1",
  "category": "Kuliah",
  "dueDate": "2025-22-29",
  "priority": "Sedang",
  "estimateHours": 3,
  "isDone": false
}
{
  "title": "Mengerjakan laporan",
  "description": "Laporan bab 3",
  "category": "Kuliah",
  "dueDate": "2025-22-29",
  "priority": "Sedang",
  "estimateHours": 2,
  "isDone": true
}









