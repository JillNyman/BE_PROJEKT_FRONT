//Kopplat till admin.html, administratörens startsida

import { checkAdminAccess, logoutAdmin, updateButtons, accessAddProdFunction, accessInbox} from "./links.js";

const productlistEl = document.getElementById("product-list"); //produktlista
const closeModal = document.getElementsByClassName('close'); //kryss som stänger modal

//Fält i modalen som vid uppdatering av produkt ska vara förifyllda
const prodName = document.getElementById('prod-name');
const prodCategory = document.getElementById('prod-category');
const prodPrice = document.getElementById('prod-price');
const prodDescription = document.getElementById('prod-description');


//vid laddning av sidan
document.addEventListener('DOMContentLoaded', () => {

    //kontrollera admin-tillgång
    checkAdminAccess();

    if(!checkAdminAccess()){
        window.location.href = "index.html";
        return;
    }

    //visa main-area när sidan laddats
    document.querySelector('.main-area').style.display = 'block';
    updateButtons();

     //Hämta produktlista vid laddning av sidan
     getProductList();
    
    //Länk till "lägg till produkt"
    const addProdBtn = document.getElementById("ladd-product-link"); 
    addProdBtn.addEventListener("click", accessAddProdFunction, false); 
    
    //länk till inbox.html
    const inboxBtn = document.getElementById("linbox-link"); 
    inboxBtn.addEventListener("click", accessInbox, false); 
    
     //länk till utloggning
    const logoutBtn = document.getElementById("logout-link");
    if(logoutBtn){
        logoutBtn.addEventListener("click", logoutAdmin);
    }
   
    //Modal för uppdatering
    const updateForm = document.getElementById('update-form');
    if(updateForm){
        updateForm.addEventListener('submit', editPost);
    } else {
        console.error('Update form not found');
    }

    //visa/dölj modal
    const updateModal = document.getElementById('update-modal');
    const closeModal = document.getElementsByClassName('close')[0];

    if (closeModal) {
      closeModal.onclick = function() {
        updateModal.style.display = "none";
      }
    }

    window.onclick = function(event) {
      if (event.target == updateModal) {
        updateModal.style.display = "none";
      }
    }

});

let url = "http://localhost:3333/api/menu";



//Hämta lista på produkter
async function getProductList(){
    const token = localStorage.getItem('token');
   
    try{    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    if(!response.ok){
        console.log("Lyckades inte hämta data");
        return;
    }
    let data = await response.json();
   
    makeProductList(data);
} catch (error) {
    console.error("Fel när data skulle hämtas: ", error);
}
};

//Skriv ut listan 
function makeProductList(data){
    productlistEl.innerHTML = "";
    //skapa div för  produkterna ???
    let newEl = document.createElement("div");
    newEl.classname = "admin-product-item"; //ange klass

    data = Object.values(data);

    data.forEach(dat => {
        //skapa div för varje produkt
        let adminProdBox = document.createElement("div");
        adminProdBox.id = `prod-${dat.prod_id}`; //tilldela id baserat på id produkten har i databasen

        adminProdBox.innerHTML =`        
        <h2 class="product-name" id="pn-${dat.prod_name}">${dat.prod_name} | ${dat.prod_price}</h2>
        <h5 class="product-category">${dat.prod_category}   (Art.nr.${dat.prod_id})</h5>
        <p class="product-description">${dat.prod_description}</p>   
        `;     
        //skapa knapp för radera produkt
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Radera";
        deleteBtn.dataset.id = dat.prod_id; 
        deleteBtn.className = "deleteBtn"; 
        deleteBtn.addEventListener('click', (event) =>{   const id = event.target.dataset.id;
            deletePost(id);

        });

        adminProdBox.appendChild(deleteBtn);
          //skapa knapp för uppdatera produkt
        let editBtn = document.createElement("button");
        editBtn.textContent = "Uppdatera";
        editBtn.dataset.productId = dat.prod_id;
        editBtn.className = "editBtn"; 
        editBtn.addEventListener('click', (event) => {
            console.log("Edit button clicked");
            const prod_id = event.target.dataset.productId;
            console.log("Product ID:", prod_id);
            toggleEdit(prod_id);
        });
        adminProdBox.appendChild(editBtn);
        newEl.appendChild(adminProdBox);       
       
    });
       
    productlistEl.appendChild(newEl);
}

//Logga ut admin
function logoutAdmin(){
    //Radera token från localstorage
    localStorage.removeItem('token');

    //Omdirigera till startsidan
    window.location.href = "index.html";
}

//Hämta uppgifter om produkten som ska uppdateras och lägg i formulär för uppdatering
async function toggleEdit(prod_id){
    console.log("toggleEdit called with prod_id:", prod_id);//
    
    const updateModal = document.getElementById('update-modal');
    if (!updateModal) {
        console.error("Update modal not found");
        return;
    }
    
    // Sätt prod_id som data-attribut på modalen
    updateModal.dataset.productId = prod_id;

    //Hämta elementet för vald produkt
    const productEl = document.getElementById(`prod-${prod_id}`);
    if (!productEl) {
        console.error(`Product element not found for id: prod-${prod_id}`);
        return;
    }

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
    console.log("Modal should be visible now");//
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
    console.log("Hämtat från DOM: ", id);  //

    try{
        const token = localStorage.getItem('token'); //Hämta token från localstorage
        const response = await fetch(`http://localhost:3333/api/menu/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
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

//Redigera produktinfo i modal, skicka till databasen
async function editPost(e){  
    e.preventDefault();

    const updateModal = document.getElementById('update-modal');
    const prod_id = updateModal.dataset.productId;  

    if (!prod_id) {
        console.error("Product ID is missing");
        return;
    }

    let product = {
        prod_name: prodName.value,
        prod_category: prodCategory.value,
        prod_price: prodPrice.value,
        prod_description: prodDescription.value,
        prod_id: prod_id
    };

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
    if(!product.prod_price){
        console.error("Product price is missing");
        alert("Samtliga fält ska vara ifyllda!");
        return;
    }
    if(!product.prod_description){
        console.error("Product description is missing");
        alert("Samtliga fält ska vara ifyllda!");
        return;
    }

    try{
        const token = localStorage.getItem('token'); //Hämta token från localstorage
        console.log("TOKEN: " + token);
        const response = await fetch(`http://localhost:3333/api/menu/edit/${prod_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
         
            body: JSON.stringify(product)
            
        });
       

        if(!response.ok){
            throw new Error(`${response.status}`);
        }
        console.log("Lagrad token: ", token);//
        const result = await response.json();
        console.log(result);//
        
        getProductList();
        
        document.getElementById('update-modal').style.display = "none";
                
    } catch (error){
        console.error("Fel vid uppdatering: ", error);
    }
};






