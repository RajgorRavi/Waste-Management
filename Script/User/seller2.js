document.getElementById('recycleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const itemName = document.getElementById('itemName').value;
    const materialType = document.getElementById('materialType').value;
    const itemWeight = document.getElementById('itemWeight').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const imageFile = document.getElementById('image').files[0]; // Get the uploaded file

    // Check if an image was uploaded
    let imageUrl = '';
    if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile); // Create a URL for the uploaded image
    }

    // Create a new list item
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>Material:</strong> ${itemName} <br>
        ${imageUrl ? `<img src="${imageUrl}" alt="Material Image" style="max-width: 200px;">` : ''} <br />
        <strong>Type:</strong> ${materialType} <br>
        <strong>Weight:</strong> ${itemWeight} kg <br>
        <strong>Price:</strong> $${itemPrice} <br>
    `;

    // Add the new list item to the list
    document.getElementById('materialList').appendChild(li);

    // Clear the form
    document.getElementById('recycleForm').reset();
});
