let totalPrice = 0;
window.onload = function () {
  loadProducts();
};
function addProduct() {
  const productName = document.querySelector(".productName").value;
  const productPrice = parseFloat(
    document.querySelector(".productPrice").value
  );

  if (productName && !isNaN(productPrice) && productPrice > 0) {
    const productList = document.querySelector(".productList");
    const newProductDiv = document.createElement("div");

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = `${productName} - ${productPrice} AZN`;
    newInput.disabled = true;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Sil";
    deleteButton.onclick = function () {
      productList.removeChild(newProductDiv);
      updateSummary(-productPrice);
      saveProducts();
    };

    newProductDiv.appendChild(newInput);
    newProductDiv.appendChild(deleteButton);

    productList.appendChild(newProductDiv);
    updateSummary(productPrice);
    saveProducts();
  }

  document.querySelector(".productName").value = "";
  document.querySelector(".productPrice").value = "";
}

function updateSummary(priceChange) {
  const productCount = document.querySelectorAll(".productList div").length;
  totalPrice += priceChange;

  document.querySelector(".productCount").innerText = productCount;
  document.querySelector(".totalPrice").innerText = totalPrice.toFixed(2);
}
function saveProducts() {
  const productListDivs = document.querySelectorAll(".productList div");
  const products = [];

  productListDivs.forEach((div) => {
    const input = div.querySelector("input").value;
    const price = parseFloat(input.split("-")[1].trim().split(" ")[0]);
    products.push({ value: input, price });
  });

  localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((product) => {
    const productList = document.querySelector(".productList");
    const newProductDiv = document.createElement("div");

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = product.value;
    newInput.disabled = true;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Sil";
    deleteButton.className = "deleteButton";
    deleteButton.onclick = function () {
      productList.removeChild(newProductDiv);
      updateSummary(-product.price);
      saveProducts();
    };

    newProductDiv.appendChild(newInput);
    newProductDiv.appendChild(deleteButton);

    productList.appendChild(newProductDiv);

    updateSummary(product.price);
  });
}
