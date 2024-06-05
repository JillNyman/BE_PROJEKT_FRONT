"use strict";
//Admin-sida där användare kan lägga till produkter

import { accessInbox } from "./links";
import { accessList } from "./links";

const inboxBtn = document.getElementById("inbox-link"); //länk till inbox.html
const adminBtn = document.getElementById("admin-link"); //länk till admin.html

//Nå skyddad route, inbox.html
inboxBtn.addEventListener("click", accessInbox, false);
//Åtkomst till skyddad route: admin.html
adminBtn.addEventListener("click", accessList, false);


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
    const response = await fetch('http://localhost:3333/api/menu/menu', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(product)
    });

  
    if(!response.ok){
        postMessageEl.innerHTML = "Produkten kunde inte läggas till";
        return;
    }
    let data = await response.json();
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

