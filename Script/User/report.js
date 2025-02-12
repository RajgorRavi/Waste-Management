document.getElementById('file-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const previewImage = document.getElementById('preview-image');

  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          previewImage.src = e.target.result;
      }
      reader.readAsDataURL(file);
  } else {
      previewImage.src = '';
  }
});


document.getElementById('submit-button').addEventListener('click', function() {
  const progress = document.getElementById('progress');
  let width = 0;
  const interval = setInterval(function() {
      if (width >= 100) {
          clearInterval(interval);
      } else {
          width += 10;
          progress.style.width = width + '%';
      }
  }, 100);
});
