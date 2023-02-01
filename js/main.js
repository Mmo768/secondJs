var productName = document.getElementById("ProductName");
var Productcatalog = document.getElementById("Productcatalog");
var ProductPrice = document.getElementById("ProductPrice");
var productdesc = document.getElementById("productdesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var search = document.getElementById("search");
var tbody = document.getElementById("tbody");
var x = 0;

var products = [];

if(localStorage.getItem("products") != null){
    getStorage();
    searchproducts()
}

function resetproduct(){
    productName.value = "" ;
    Productcatalog.value = "" ;
    ProductPrice.value = "" ;
    productdesc.value = "" ;
}

function AddProduct(){
    
    var prod = {
        name: productName.value,
        catalog: Productcatalog.value,
        price: ProductPrice.value,
        desc: productdesc.value,
    }
    products.push(prod);
    searchproducts()
    resetproduct();
    setStorage();


}

function display(){
    var result = ``;
    for(i=0;i<products.length;i++){
        result += `
        <tr>
        <td>${i+1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].catalog}</td>
        <td>${products[i].price}</td>
        <td>${products[i].desc}</td>
        <td><button onclick="updateproduct(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button onclick="del(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button></td>
      </tr>
        `;
    }
    tbody.innerHTML = result;
}


function del(index){
    products.splice(index,1);
    searchproducts()
    setStorage();
}

function updateproduct(index){
    productName.value = products[index].name ;
    Productcatalog.value =  products[index].catalog ;
    ProductPrice.value =  products[index].price ;
    productdesc.value =  products[index].desc ;
    x=index;
    setStorage();
    addBtn.classList.replace("d-inline-block","d-none");
    updateBtn.classList.replace("d-none","d-inline-block");
}

function addUpdate(){
    var prod = {
        name: productName.value,
        catalog: Productcatalog.value,
        price: ProductPrice.value,
        desc: productdesc.value,
    }
    products.splice(x,1,prod);
    searchproducts()
    resetproduct();
    setStorage();
    updateBtn.classList.replace("d-inline-block","d-none");
    addBtn.classList.replace("d-none","d-inline-block");

}



function searchproducts(){
    var result = ``;
    for(i=0;i<products.length;i++){
        if(products[i].name.includes(search.value)){
            result += `
            <tr>
            <td>${i+1}</td>
            <td>${products[i].name.replace(search.value,`<span class="bg-warning">${search.value}</span>`)}</td>
            <td>${products[i].catalog}</td>
            <td>${products[i].price}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="updateproduct(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button onclick="del(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>
            `;
        }
    }
    tbody.innerHTML = result;
}

function setStorage(){
    localStorage.setItem("products",JSON.stringify(products));
}

function getStorage(){
    products = JSON.parse(localStorage.getItem("products"));
}