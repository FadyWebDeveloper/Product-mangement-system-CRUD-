let productName = document.getElementById("productname");
let productPrice = document.getElementById("productprice");
let productCategory = document.getElementById("productcategory");
let productDescr = document.getElementById("productdesc");
let addBtn = document.getElementById("add");
let updateBtn = document.getElementById("update");
let searchInput = document.getElementById("search");
let containerProduct;
let globalIndex = 0;


if (localStorage.getItem("list") != null) {
  containerProduct = JSON.parse(localStorage.getItem("list"));
  displayProduct(containerProduct);
} else {
  containerProduct = [];
}
addBtn.addEventListener("click", function () {
  if (validateName() && validatePrice() && validateDesc()) {
    let productWrapper = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescr.value,
    }
    containerProduct.push(productWrapper);
    setItemStorage();
    displayProduct(containerProduct);
    clearForm();
  }
})
function displayProduct(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
    <tr>
  <td>${i + 1}</td>
  <td>${arr[i].newName ? arr[i].newName : arr[i].name}</td>
  <td>${arr[i].price}</td>
  <td>${arr[i].category}</td>
  <td>${arr[i].description}</td>
  <td><button class="btn btn-danger" onclick="updateProducts(${i})">update</button></td>
  <td><button class="btn btn-dark" onclick="deleteProduct(${i})">delete</button></td>
</tr>`
  }
  document.getElementById("tbody").innerHTML = box;

}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescr.value = "";
}

function setItemStorage(){
  localStorage.setItem("list", JSON.stringify(containerProduct));

}

function deleteProduct(i) {
  containerProduct.splice(i, 1);
  setItemStorage();
  displayProduct(containerProduct);
}

function updateProducts(i) {
  globalIndex = i;
  productName.value = containerProduct[i].name;
  productPrice.value = containerProduct[i].price;
  productCategory.value = containerProduct[i].category;
  productDescr.value = containerProduct[i].description;
  addBtn.classList.add("d-none");
  updateBtn.classList.replace("d-none", "d-block")
}

updateBtn.addEventListener("click", function () {
  if (validateName() && validatePrice() && validateDesc()){
  containerProduct[globalIndex].name = productName.value;
  containerProduct[globalIndex].price = productPrice.value;
  containerProduct[globalIndex].category = productCategory.value;
  containerProduct[globalIndex].description = productDescr.value;
  setItemStorage();
  displayProduct(containerProduct);
  addBtn.classList.remove("d-none");
  updateBtn.classList.replace("d-block", "d-none");
  clearForm();
}
})

searchInput.addEventListener("keyup", function () {
  let searchArr = [];
  for (let i = 0; i < containerProduct.length; i++) {
    if (containerProduct[i].name.toLowerCase().trim().includes(this.value.toLowerCase().trim())) {
      containerProduct[i].newName = containerProduct[i].name.toLowerCase().trim().replace(this.value.toLowerCase().trim(), ` <span class="text-bg-danger">${this.value}</span>`);
      searchArr.push(containerProduct[i]);
    }
  }
  displayProduct(searchArr);
})


function validateName() {
  let alertName=document.getElementById("alertName");
  let regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value)) {
    alertName.classList.replace("d-block", "d-none");
    return true;
  } else {
   alertName.classList.replace("d-none", "d-block"); return false;
  }
}
productName.addEventListener("keyup", validateName);

function validatePrice() {
  let alertPrice= document.getElementById("alertPrice");
  let regex = /^(1[0-9]{3}|[2-9][0-9]{3}|10000)\b/;
  if (regex.test(Number(productPrice.value))) {
    alertPrice.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertPrice.classList.replace("d-none", "d-block");
    return false;
  }
}
productPrice.addEventListener("keyup", validatePrice);

function validateDesc() {
  let alertArea= document.getElementById("alertArea");
  let regex = /^.{50,}$/;
  if (regex.test(productDescr.value)) {
    alertArea.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertArea.classList.replace("d-none", "d-block"); return false;
  }
}
productDescr.addEventListener("keyup", validateDesc);
