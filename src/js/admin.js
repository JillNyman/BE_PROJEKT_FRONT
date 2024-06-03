"use strict";
//Kopplat till admin.html

const productlistEl = document.getElementById("product-list"); //produktlist
const adminAreaEl = document.getElementById("admin-area"); 
//Fält i modalen
const prodName = document.getElementById('prod-name');
const prodCategory = document.getElementById('prod-category');
const prodPrice = document.getElementById('prod-price');
const prodDescription = document.getElementById('prod-description');
const updateForm = document.getElementById('update-form');
const updateModal = document.getElementById('update-modal');
const submitUpdate = document.getElementById('submit-update');
const closeModal = document.getElementsByClassName('close');

let url = "http://localhost:3334/api/menu";

//Hämta produklista vid laddning av sidan
getProductList();


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

//Skriv ut listan 
function makeProductList(data){
    productlistEl.innerHTML = "";
    let newEl = document.createElement("div");
    newEl.classname = "admin-product-item";

    data = Object.values(data);

    data.forEach(dat => {

        let adminProdBox = document.createElement("div");
        adminProdBox.id = `prod-${dat.prod_id}`;

        adminProdBox.innerHTML =`        
        <h2 class="product-name" id="pn-${dat.prod_name}">${dat.prod_name} | ${dat.prod_price}</h2>
        <h5 class="product-category">${dat.prod_category}   (Art.nr.${dat.prod_id})</h5>
        <p class="product-description">${dat.prod_description}</p>   
        `;     

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Radera";
        deleteBtn.dataset.id = dat.prod_id; 
        deleteBtn.className = "deleteBtn"; 
        deleteBtn.addEventListener('click', (event) =>{    // const prodID = event.target.dataset.id;
            //deleteBtn.dataset.id = prodID;
            deletePost(id);

        });

        adminProdBox.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Uppdatera";
        editBtn.dataset.productId = dat.prod_id;
        editBtn.className = "editBtn"; 
        editBtn.addEventListener('click', (event) => {
            const prod_id = event.target.dataset.productId;
            updateModal.dataset.productId = prod_id;
            toggleEdit(prod_id);
        });
        adminProdBox.appendChild(editBtn);
        newEl.appendChild(adminProdBox);       
       
    });
       
    adminAreaEl.appendChild(newEl);
}

async function toggleEdit(prod_id){
      
    //Hämta elementet för vald produkt
    const productEl = document.getElementById(`prod-${prod_id}`);

    //Hämta värden från elementen
    const prodNameEl = productEl.querySelector('.product-name');
    const prodCatEl = productEl.querySelector('.product-category');
    const prodDesEl = productEl.querySelector('.product-description');

    //Separera produktnamn och pris
    const [prod_name, prod_price] = prodNameEl.textContent.split(' | ');
    //Lägg in värden i modalformuläret
    prodName.value = prod_name.trim();
    prodPrice.value = prod_price.trim();
    prodCategory.value = prodCatEl.textContent.replace(` (Art.nr.${prod_id})`, '').trim();
    prodDescription.value = prodDesEl.textContent.trim();

     //Visa modalen
    updateModal.style.display = "block";    

}
//Stäng modal
closeModal.onclick = function() {
    updateModal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == updateModal){
        updateModal.style.display = "none";
    }
}

//Radera produkt
async function deletePost(id){
    console.log("Hämtat från DOM: ", id);
    //const id = deleteBtn.dataset.id;

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

        getProductList(); //Uppdatera listan så den raderade posten försvinner
    } catch (error) {
        console.error("Error: ", error);
        
    }
}

//Eventlyssnare för uppdatera-knapp
submitUpdate.addEventListener('click', editPost, false);

//Redigera produktinfo i modal
async function editPost(e){  
    e.preventDefault();

    const prod_id = updateModal.dataset.productId;

    let product = {
        prod_name: prodName.value,
        prod_category: prodCategory.value,
        prod_price: prodPrice.value,
        prod_description: prodDescription.value,
        prod_id: prod_id
    };

    try{
        const response = await fetch(`http://localhost:3334/api/menu/edit/${prod_id}`, {
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
        
        window.location.reload();
        
        updateModal.style.display = "none";
        //verkar inte funka?
    } catch (error){
        console.error("Fel vid uppdatering: ", error);
    }
};

