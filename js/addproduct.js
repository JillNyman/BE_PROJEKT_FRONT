
//Admin-sida där användare kan lägga till produkter

import { accessInbox, accessList, updateButtons, logoutAdmin } from "./links";


const inboxBtn = document.getElementById("inbox-link"); //länk till inbox.html
const adminBtn = document.getElementById("admin-link"); //länk till admin.html

//åtkomst till skyddad route: inbox.html
inboxBtn.addEventListener("click", accessInbox, false);
//Åtkomst till skyddad route: admin.html
adminBtn.addEventListener("click", accessList, false);


//Fälten i formuläret för "Lägg till produkt" i addproduct.html
const inputCategory = document.getElementById("item-category");
const inputName = document.getElementById("item-name");
const inputDescription = document.getElementById("item-description");
const inputPrice= document.getElementById("item-price");
const addItemBtn = document.getElementById("add-btn");
const postMessageEl = document.getElementById("post-message");

//Knapp för "lägg till produkt" i formulär
addItemBtn.addEventListener('click', addProduct, false);

document.addEventListener('DOMContentLoaded', () => {
    //funktion körs, som visar eller döljer logga in/logga ut
    updateButtons();
        //länk till utloggning
        const logoutBtn = document.getElementById("logout-link");
        if(logoutBtn){
            logoutBtn.addEventListener("click", logoutAdmin);
        }
})

//Logga ut admin
function logoutAdmin(){
    //Radera token från localstorage
    localStorage.removeItem('token');

    //Omdirigera till startsidan
    window.location.href = "index.html";
}

//Lägg till produkt
async function addProduct(e) {
    e.preventDefault();

    //värdet av inmatningsfälten
    let product = {
        prod_category: inputCategory.value,
        prod_name: inputName.value,
        prod_description: inputDescription.value,
        prod_price: inputPrice.value
    }

      //Validering
      if(!product.prod_name){
        console.error("Product name is missing");
        alert("Samtliga fält ska vara ifyllda!");
        return;
    }
      
      if(!product.prod_category){
        console.error("Product category is missing");
        alert("Samtliga fält ska vara ifyllda!");
        return;
    }
      
      if(!product.prod_description){
        console.error("Product description is missing");
        alert("Samtliga fält ska vara ifyllda!");
        return;
    }
      
      if(!product.prod_price){
        console.error("Product price is missing");
        alert("Samtliga fält ska vara ifyllda!");
        return;
    }

    try{
        //hämta token från local storage
        const token = localStorage.getItem('token');
        //POST-anrop
        const response = await fetch('http://localhost:3333/api/menu/menu', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
    });

    let data = await response.json(); 
    //felhantering
    if(!response.ok){
        console.log("Något gick fel");//
        postMessageEl.innerHTML = "Något gick fel";
        return;
    }
 
    //Om svar är ok, läggs produkten till i backend och fälten i formuläret töms
    if(response.status === 200){
        alert(`Produkten ${product.prod_name} har lagts till!`);
            inputCategory.value = "";
            inputName.value = "";
            inputDescription.value = "";
            inputPrice.value = "";
            return data;        
        }
    
} catch (error) {
     //felhantering
    console.error("Error: ", error);
    postMessageEl.innerHTML = "Databasen tog inte emot posten.";
}
}

