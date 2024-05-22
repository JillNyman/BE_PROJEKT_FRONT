"use strict";

//Lägg till produkt i adminvyn FUNKAR

const inputCategory = document.getElementById("item-category");
const inputName = document.getElementById("item-name");
const inputDescription = document.getElementById("item-description");
const inputPrice= document.getElementById("item-price");
const addItemBtn = document.getElementById("add-btn");
const postMessageEl = document.getElementById("post-message");

addItemBtn.addEventListener('click', addProduct, false);

async function addProduct(e) {
    e.preventDefault();

    let product = {
        prod_category: inputCategory.value,
        prod_name: inputName.value,
        prod_description: inputDescription.value,
        prod_price: inputPrice.value
    };

    const response = await fetch('http://localhost:3334/menu', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    let data = await response.json();
    postMessageEl.innerHTML = `Produkten <i>${product.prod_name}</i> har lagts till!`;
    return data;
    //console.log(data);
}

