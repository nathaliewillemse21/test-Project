// Admin
const a = new Date();
let year = a.getFullYear();
document.getElementById('footer').innerHTML = year;

// Sample products data
const products = [
  {
          image: 'https://i.postimg.cc/W1mV8yrp/ichigo-daifuku.jpg',
          id: 1,
          name: 'Ichigo Daifuku',
          description:
            'It is filled with a sweet red bean paste and a strawberry.',
          price: 60,
        },
        {
          image: 'https://i.postimg.cc/05HyKhGL/sakura-mochi.jpg',
          id: 2,
          name: 'Sakura Mochi ',
          description:
            'This classic mochi is wrapped in a pickled sakura leaf.',
          price: 60,
        },
        {
          image: 'https://i.postimg.cc/m2pWqV9G/bota-mochi.jpg',
          id: 3,
          name: 'Bota Mochi',
          description:
            'This is a mochi where the sweet red bean filling surrounds the chewy mochi goodness.',
          price: 65,
        },
        {
          image: 'https://i.postimg.cc/htYLCCqw/Yatsuhashi-mochi.jpg',
          id: 4,
          name: 'Yatsuhashi Mochi',
          description:
            'This kind of mochi very unique cause of it shape and because it is filled with cinnamon. ',
          price: 70,
        },
        {
          image: 'https://i.postimg.cc/g09wX1pY/mochi-icecream.jpg',
          id: 5,
          name: 'Ice-Cream Mochi',
          description:
            "As if mochi, couldn't get any better, this mochi is filled with ice cream and you can pick any flavour you fancy.",
          price: 70,
        },
        {
          image: 'https://i.postimg.cc/W4rk5T8F/Kusa-mochi.jpg',
          id: 6,
          name: 'Kusa Mochi',
          description:
            'This mochi is filled with the sweet red bean paste and give of a hint of green tea.',
          price: 75,
            },
            // Add more products as needed
];

// Function to display products in a table
function displayProducts() {
  const tableContainer = document.getElementById('table');
  const tableHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product => `
          <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
              <button class="btn btn-primary" onclick="editProduct(${product.id})">Edit</button>
              <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>

            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  tableContainer.innerHTML = tableHTML;
}


function showMessage(message, messageType) {
  const messageContainer = document.getElementById('message');
  messageContainer.innerHTML = `<div class="alert alert-${messageType}" role="alert">${message}</div>`;
}


function editProduct(productId) {
  // Find the product to edit
  const productToEdit = products.find((product) => product.id === productId);

  // Check if the product is found
  if (productToEdit) {
    // Prompt the user for updated information (you can customize this)
    const updatedName = prompt(
      `Enter updated name for product ${productId}:`,
      productToEdit.name
    );
    const updatedDescription = prompt(
      `Enter updated description for product ${productId}:`,
      productToEdit.description
    );
    const updatedPrice = prompt(
      `Enter updated price for product ${productId}:`,
      productToEdit.price
    );

    // Update the product with the new information
    productToEdit.name = updatedName || productToEdit.name;
    productToEdit.description = updatedDescription || productToEdit.description;
    productToEdit.price = updatedPrice
      ? parseFloat(updatedPrice)
      : productToEdit.price;

    // Display the updated products
    displayProducts();
  } else {
    console.error(`Product with ID ${productId} not found.`);
  }
}


 function deleteProduct(productId) {
   // Logic to delete the product based on the productId
   console.log(`Delete product with ID ${productId}`);
   // Remove the product from the array
   const index = products.findIndex((product) => product.id === productId);
   if (index !== -1) {
       products.splice(index, 1);
     localStorage.removeItem('product')
     displayProducts();
   }
 }

 // Initial display of products
 displayProducts();

 function addProduct() {
    const newProduct = {
      id: products.length + 1,
      name: 'New Product',
      description: 'Description',
      price: 0,
    };
  
    // Add the new product to the products array
    products.push(newProduct);
  
    // Update local storage with the new products array
    updateLocalStorage();
  
    // Display the updated products
    displayProducts();
  }
  

 // Add this JavaScript code to your existing script

// Function to open the edit modal and populate it with product information
function openEditModal(product) {
    const editModal = document.getElementById('editModal');
    const updatedNameInput = document.getElementById('updatedName');
    const updatedDescriptionInput = document.getElementById('updatedDescription');
    const updatedPriceInput = document.getElementById('updatedPrice');
  
    // Populate modal inputs with product information
    updatedNameInput.value = product.name;
    updatedDescriptionInput.value = product.description;
    updatedPriceInput.value = product.price;
  
    // Display the modal
    editModal.style.display = 'block';
  }
  
  // Function to close the edit modal
  function closeEditModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
  }
  
  // Function to handle the form submission in the edit modal
  function submitEditForm(productId) {
    const productToEdit = products.find((product) => product.id === productId);
  
    if (productToEdit) {
      const updatedName = document.getElementById('updatedName').value;
      const updatedDescription = document.getElementById('updatedDescription').value;
      const updatedPrice = parseFloat(document.getElementById('updatedPrice').value);
  
      // Validate the price input
      if (isNaN(updatedPrice)) {
        console.error('Invalid price entered. Product not updated.');
        return;
      }
  
      // Update the product with the new information
      productToEdit.name = updatedName;
      productToEdit.description = updatedDescription;
      productToEdit.price = updatedPrice;
  
      // Update local storage and display products
      updateLocalStorage();
      displayProducts();
  
      // Close the edit modal
      closeEditModal();
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  }
  
  // Function to update local storage with the current products array
  function updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  // Usage in the editProduct function
  function editProduct(productId) {
    const productToEdit = products.find((product) => product.id === productId);
  
    if (productToEdit) {
      // Open the edit modal and populate it with product information
      openEditModal(productToEdit);
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  }
  