// Admin
const a = new Date();
let year = a.getFullYear();
document.getElementById('footer').innerHTML = year;
// Function to display the checkout table
function displayProducts() {
    const tableContainer = document.getElementById('table');
    let tableHTML = [
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
    ];
  
    if (cart.length > 0) {
      tableHTML += '<table>';
      tableHTML += '<tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>';
  
      cart.forEach(item => {
        tableHTML += `<tr><td>${product.name}</td><td>${product.quantity}</td><td>$${product.price.toFixed(2)}</td><td>$${(item.price * item.quantity).toFixed(2)}</td></tr>`;
      });
  
      tableHTML += '</table>';
    } else {
      tableHTML += '<p>Your cart is empty.</p>';
    }
  
    tableContainer.innerHTML = tableHTML;
  }
  