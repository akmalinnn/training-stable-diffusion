const apiKey = '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';

const maxImages = 4; // Jumlah gambar yang akan dihasilkan untuk setiap prompt
let selectedImageNumber = null;
const imageUrls = [];

// Fungsi untuk menghasilkan angka acak antara min dan max (inklusif)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk menonaktifkan tombol "Generate" selama pemrosesan
function disableGenerateButton() {
  document.getElementById('generate').disabled = true;
}

// Fungsi untuk mengaktifkan tombol "Generate" setelah pemrosesan
function enableGenerateButton() {
  document.getElementById('generate').disabled = false;
}

// Fungsi untuk menghapus gambar-gambar dalam grid
function clearImageGrid() {
  const imageGrid = document.getElementById('image-grid');
  imageGrid.innerHTML = '';
}

// Menambahkan event listener untuk input teks 'user-prompt'
const userPromptInput = document.getElementById('user-prompt');
userPromptInput.addEventListener('keydown', function(event) {
  // Memeriksa apakah tombol yang ditekan adalah "Enter" (kode 13)
  if (event.key === 'Enter') {
    // Mencegah aksi default form, jika ada
    event.preventDefault();
    // Memanggil fungsi generateImages dengan input yang ada di input teks
    const input = userPromptInput.value;
    generateImages(input);
  }
});

// Fungsi untuk menghasilkan gambar-gambar
async function generateImages(input) {
  disableGenerateButton();
  clearImageGrid(); // Menghapus gambar-gambar sebelumnya

  const loading = document.getElementById('loading');
  loading.style.display = 'block';

  for (let i = 0; i < maxImages; i++) {
    // Menghasilkan angka acak antara 1 dan 1000 dan menggabungkannya dengan prompt
    const randomNumber = getRandomNumber(1, 1000);
    const prompt = `${input} ${randomNumber}`;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/akmalinn/soto-ayam-bu-karti",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );


      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      imageUrls.push(imgUrl);

      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = `art-${i + 1}`;
      img.onclick = () => downloadImage(imgUrl, i);
      document.getElementById('image-grid').appendChild(img);
    } catch (error) {
      console.error(error.message);
      alert('Failed to generate image puny human!');
    }
  }

  loading.style.display = 'none';
  enableGenerateButton();

  selectedImageNumber = null; // Mengatur ulang nomor gambar yang dipilih
}

// Event listener untuk tombol "Generate" yang juga menghapus gambar-gambar sebelumnya
document.getElementById('generate').addEventListener('click', () => {
  const input = document.getElementById('user-prompt').value;
  clearImageGrid(); // Menghapus gambar-gambar sebelumnya
  imageUrls.length = 0; // Menghapus gambar-gambar lama dari array imageUrls
  generateImages(input);
});

// Fungsi untuk mengunduh gambar
function downloadImage(imgUrl, imageNumber) {
  const link = document.createElement('a');
  link.href = imgUrl; 
  // Menetapkan nama file berdasarkan nomor gambar yang dipilih
  link.download = `image-${imageNumber + 1}.jpg`;
  link.click();
}
