"use strict";
//Admin-sida där användare kan lägga till produkter

//Lägg till produkt i addproduct.html
const inputCategory = document.getElementById("item-category");
const inputName = document.getElementById("item-name");
const inputDescription = document.getElementById("item-description");
const inputPrice= document.getElementById("item-price");
const addItemBtn = document.getElementById("add-btn");
const postMessageEl = document.getElementById("post-message");

//Knapp för lägg till produkt i formulär
addItemBtn.addEventListener('click', addProduct, false);

async function addProduct(e) {
    e.preventDefault();

    let product = {
        prod_category: inputCategory.value,
        prod_name: inputName.value,
        prod_description: inputDescription.value,
        prod_price: inputPrice.value
    };

    try{
    const response = await fetch('http://localhost:3334/api/menu/menu', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    let data = await response.json();
    if(!response.ok){
        postMessageEl.innerHTML = "Produkten kunde inte läggas till";
        return;
    }

  
        postMessageEl.innerHTML = `Produkten <i>${product.prod_name}</i> har lagts till!`;
        inputCategory.value = '';
        inputName.value = '';
        inputDescription.value = '';
        inputPrice.value = '';
        return data;
        
    
} catch (error) {
    console.error("Error: ", error);
    postMessageEl.innerHTML = "Databasen tog inte emot posten.";
}
}

