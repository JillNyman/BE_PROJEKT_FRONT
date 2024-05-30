"use strict";

const addProdBtn = document.getElementById("add-product-link"); //Länk till "lägg till produkt"

const productlistEl = document.getElementById("product-list"); //produktlist
const adminAreaEl = document.getElementById("admin-area"); 
//const alertBoxEl = document.getElementById("admin-alert-box");
//const alertMsgEl = document.getElementById("admin-alert-msg");
//const closeBtn = document.querySelector(".close");

const prodName = document.getElementById('prod-name');
const prodCategory = document.getElementById('prod-category');
const prodPrice = document.getElementById('prod-price');
const prodDescription = document.getElementById('prod-description');
const updateForm = document.getElementById('update-form');
const updateModal = document.getElementById('update-modal');
const submitUpdate = document.getElementById('submit-update');

let url = "http://localhost:3334/api/menu";

submitUpdate.addEventListener('click', editPost, false);

/*closeBtn.addEventListener('click', function (){
    alertBoxEl.style.display = "none";
});*/

//Nå skyddad route
addProdBtn.addEventListener("click", accessAddProd, false);

getProductList();

//Åtkomst skyddad route
async function accessAddProd(e){
    e.preventDefault();

    try{
        if(!localStorage.getItem("token")) {
            alert("Du måste vara inloggad för att redigera produktlistan.");
            
        }
        //Skicka token vid varje anrop
        let token = localStorage.getItem("token");
        console.log("Lagrad token: ", token);

        let response = await fetch('http://localhost:3334/api/protected', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        let data = response.status;
        if(!response.ok){
            alert("Du har inte tillgång till sidan!");
            throw new Error("Du har inte tillgång till sidan!");
        }

        if(response.status === 200) {
            window.location.href = "addproduct.html";
            console.log("Du fick tillgång till skyddad route! ", data);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Lyckades inte ge dig tillgång!");
    }
}

//Hämta lista på produkter
async function getProductList(){
   // e.preventDefault();
    try{
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(!response.ok){
        console.log("Lyckades inte hämta data");
        return;
    }
    let data = await response.json();
    console.table(data);

    makeProductList(data);
} catch (error) {
    console.error("Fel när data skulle hämtas: ", error);
}
};

//Skriv ut listan FUNKAR
function makeProductList(data){
    productlistEl.innerHTML = "";
    let newEl = document.createElement("div");

    data = Object.values(data);

    data.forEach(dat => {
        
        newEl.innerHTML +=`
        <div class="product-div">
        <h2 class="product-name">${dat.prod_name} | ${dat.prod_price}</h2>
        <h5 class="product-category">${dat.prod_category}(Art.nr.${dat.prod_id})</h5>
        <p class="product-description">${dat.prod_description}</p>            
        </div>
        `;     

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Radera";
        deleteBtn.id = dat.prod_id; 
        deleteBtn.className = "deleteBtn"; 
        deleteBtn.addEventListener('click', () => deletePost(dat.prod_id), false);

        newEl.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Uppdatera";
        editBtn.id = dat.prod_id; 
        editBtn.className = "editBtn"; 
        editBtn.addEventListener('click', () => toggleEdit(), false);

        newEl.appendChild(editBtn);
        adminAreaEl.appendChild(newEl);
       
       });
       
}

//editBtn.addEventListener('click', () => editPost(dat.prod_id, dat), false);

function toggleEdit(){
    updateModal.style.display = "block";

}

//Radera produkt
async function deletePost(id){
    console.log("Hämtat från DOM: ", id);

    try{
        const response = await fetch(`http://localhost:3333/api/menu/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(!response.ok){
            console.log("Lyckades inte radera produkten!");
            return;
        }

        let data = await response.json();
        console.log("Posten raderad: ", data);

       /* let deletePop = document.querySelector(".deleteBtn");
        deletePop.addEventListener('click', function () {
            alertMsgEl.innerHTML = "Produkten raderad!";
            alertBoxEl.style.display = "block";
        });*/

        getProductList(); //Uppdatera listan så den raderade posten försvinner
    } catch (error) {
        console.error("Error: ", error);
        //Gör popup för felmeddelande?
    }
}

async function editPost(id, data){
    
    prodName.value = data.prod_name;
    prodCategory.value = data.prod_category;
    prodPrice.value = data.prod_price;
    prodDescription.value = data.prod_description;

   

    let product = {
    prod_name: prodName.value,
    prod_category: prodCategory.value,
    prod_price: prodPrice.value,
    prod_description: prodDescription.value
}

    try{
        const response = await fetch(`http://localhost:3334/api/menu/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if(!response.ok){
            throw new Error(`${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        alert(result.message);
        updateModal.style.display = "none";
        getProductList();
    } catch (error){
        console.error("Fel vid uppdatering: ", error);
    }
};