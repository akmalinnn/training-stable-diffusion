const apiKey = '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';

<<<<<<< HEAD
const maxImages = 30;
=======
const maxImages = 4;
>>>>>>> 7f79a36f9982333c1ebb2a23141679cc080caf99
let selectedImageNumber = null;
const imageUrls = [];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableGenerateButton() {
  document.getElementById('generate').disabled = true;
}

function enableGenerateButton() {
  document.getElementById('generate').disabled = false;
}

function clearImageGrid() {
  const imageGrid = document.getElementById('image-grid');
  imageGrid.innerHTML = '';
}

const userPromptInput = document.getElementById('user-prompt');
userPromptInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const input = userPromptInput.value;
    generateImages(input);
  }
});

async function generateImages(input) {
  
  const negativeKeywords = ['nude', 'explicit', 'inappropriate', 'boobs', 'boob', 'breast', 'nipples', 'blood', 'kill', 'murdered', 'murder', 'sex', 'penis', 'cock', 'tits', 'clit', 'vagina'];

 
  const containsNegativeKeyword = negativeKeywords.some(keyword =>
    input.toLowerCase().includes(keyword)
  );

  if (containsNegativeKeyword) {

    alert('Sorry, this input contains inappropriate content and cannot be processed.');
    return;
  }


  const negativePrompt = "low resolution, bad anatomy, bad hands, text, errors, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, jpeg artifacts, signature, watermark, username, blurry";

  disableGenerateButton();
  clearImageGrid();

  const loading = document.getElementById('loading');
  loading.style.display = 'block';

  for (let i = 0; i < maxImages; i++) {
    const randomNumber = getRandomNumber(1, 1000);
    const prompt = `${input} ${randomNumber}`;

    try {
      const response = await fetch(
<<<<<<< HEAD
        'https://api-inference.huggingface.co/models/akmalinn/surabaya_monument_3',
=======
        'https://api-inference.huggingface.co/models/akmalinn/surabaya_monument',
>>>>>>> 7f79a36f9982333c1ebb2a23141679cc080caf99
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ inputs: prompt, negative_prompt: negativePrompt }), // Include the negative prompt here
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
      
    }
  }

  loading.style.display = 'none';
  enableGenerateButton();

  selectedImageNumber = null;
}

document.getElementById('generate').addEventListener('click', () => {
  const input = document.getElementById('user-prompt').value;
  clearImageGrid();
  imageUrls.length = 0;
  generateImages(input);
});

function downloadImage(imgUrl, imageNumber) {
  const link = document.createElement('a');
  link.href = imgUrl;
  link.download = `image-${imageNumber + 1}.jpg`;
  link.click();
}

document.getElementById('reset').addEventListener('click', function() {
 
  location.reload();
});