// Product
const a = new Date();
let year = a.getFullYear();
document.getElementById('footer').innerHTML = year;

// Product display
let Products = JSON.parse(localStorage.getItem('product'))
  ? JSON.parse(localStorage.getItem('product'))
  : localStorage.setItem(
      'product',
      JSON.stringify([
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
      ])
    );

function displayProducts() {
  let productWrapper = document.querySelector('[data-products]');
  productWrapper.innerHTML = '';

  if (Products) {
    Products.forEach((product) => {
      productWrapper.innerHTML += `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.id}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.price}</p>
                        <button class="btn btn-dark">      <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>Add to Cart
</button>
                    </div>
                </div>`;
    });
  } else {
    productWrapper.innerHTML = 'No product';
  }
}

displayProducts();

// Search button
let searchProduct = document.getElementById('searchproduct');

let productWrapper = document.querySelector('[data-products]');

searchProduct.addEventListener('keyup', () => {
  let searchItems = Products.filter((prod) => {
    return prod.name.toLowerCase().includes(searchProduct.value.toLowerCase());
  });

  if (searchItems.length > 0) {
    productWrapper.innerHTML = '';
    searchItems.forEach((item) => {
      productWrapper.innerHTML += `
                    <div class="card">
                        <img src="${item.image}" class="card-img-top" alt="${item.id}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text">${item.price}</p>
                            <button class="btn btn-dark" data-add-to-cart>      <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>Add to Cart
</button>
                        </div>
                    </div>
                `;
    });
  } else {
    displayProducts();
  }
});

// Sort product

let sortBtn = document.querySelector('[data-sort]');

let highest = false;

sortBtn?.addEventListener('click', function () {
  highest = highest ? false : true;
  productWrapper.innerHTML = '';
  let p = [];
  if (highest) {
    p = Products.sort((a, b) => {
      return a.price - b.price;
    });
  } else {
    p = Products.sort((a, b) => {
      return b.price - a.price;
    });
  }
  console.log(p);
  for (let item of Products) {
    productWrapper.innerHTML += `
                    <div class="card">
                        <img src="${item.image}" class="card-img-top" alt="${item.id}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text">${item.price}</p>
                            <button class="btn btn-dark" data-add-to-cart>      <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>Add to Cart
</button>
                        </div>
                    </div>
                `;
  }
});

// add to cart

// document.addEventListener('DOMContentLoaded', function () {

document.addEventListener('click', function (event) {
  if (event.target && event.target.getAttribute('data-add-to-cart') !== null) {
    const productId = parseInt(
      event.target.getAttribute('data-add-to-cart'),
      10
    );
    const product = Products.find((product) => product.id === productId);

    if (product) {
      addToCart(product);
    }
  }
});

function displayProducts() {
  let productWrapper = document.querySelector('[data-products]');
  productWrapper.innerHTML = '';

  Products.forEach((product) => {
    productWrapper.innerHTML += `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${
      product.id
    }">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}</p>
                    <button class="btn btn-dark" data-add-to-cart="${
                      product.id
                    }" onclick="addToCart(${JSON.stringify(
      product
    )})"><span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>Add to Cart</button>
                </div>
            </div>`;
  });
}

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // If the product is not in the cart, add it to the cart array
    cartItems.push({
      id: product.id,
      name: product.make,
      price: product.price,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));

  alert(`${product.make} added to cart!`);
}

document.addEventListener('DOMContentLoaded', function () {
  updateCartInfo();

  document.addEventListener('click', function (event) {
    if (
      event.target &&
      event.target.getAttribute('data-add-to-cart') !== null
    ) {
      const productId = parseInt(
        event.target.getAttribute('data-add-to-cart'),
        10
      );
      const product = Products.find((product) => product.id === productId);

      if (product) {
        addToCart(product);
        updateCartInfo();
      }
    }
  });
});

function displayProducts() {
  let productWrapper = document.querySelector('[data-products]');
  productWrapper.innerHTML = '';

  Products.forEach((product) => {
    productWrapper.innerHTML += `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${
      product.id
    }">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}</p>
                    <button class="btn btn-dark" data-add-to-cart="${
                      product.id
                    }" onclick="addToCart(${JSON.stringify(
      product
    )})">  <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span> Add to Cart
</button>
                </div>
            </div>`;
  });
}

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: product.id,
      name: product.make,
      price: product.price,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));

  //updateCartInfo;
}