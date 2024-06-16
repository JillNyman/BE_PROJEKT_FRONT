
//Kopplat till admin.html
const addProdBtn = document.getElementById("ladd-product-link"); //Länk till "lägg till produkt"
const inboxBtn = document.getElementById("linbox-link"); //länk till inbox.html

const productlistEl = document.getElementById("product-list"); //produktlist

//Fält i modalen
const prodName = document.getElementById('prod-name');
const prodCategory = document.getElementById('prod-category');
const prodPrice = document.getElementById('prod-price');
const prodDescription = document.getElementById('prod-description');
//const updateForm = document.getElementById('update-form');
const updateModal = document.getElementById('update-modal');
const submitUpdate = document.getElementById('submit-update');
const closeModal = document.getElementsByClassName('close');

addProdBtn.addEventListener("click", accessMore, false);
inboxBtn.addEventListener("click", moveToInbox, false );

let url = "http://localhost:3333/api/menu";

//Hämta produklista vid laddning av sidan
getProductList();

//Till addproduct.html, skyddad route
async function accessMore(){
    try{
        if(!localStorage.getItem("token")) {
            alert("Du måste vara inloggad för att redigera produktlistan.");
            return;
            
        }
        //Skicka token vid varje anrop
        let token = localStorage.getItem("token");
        console.log("Lagrad token: ", token);

        let response = await fetch('http://localhost:3333/api/protected', {
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
            console.log("Access granted, redirecting to addproduct.html");
            //window.location.href = "addproduct.html"; <-- Denna länk, på just admin.html, fungerade inte utan visade index.html istället. Felsökt från A till Ö, men inte lyckats lösa problemet. Till slut skapade jag extraknappar för att komma runt det. Ska nämnas att detta fungerade som det skulle i projektet i början av utvecklingen.
            const newBtn = document.getElementById("new-button");

        newBtn.style.display = "block";   
            console.log("Du fick tillgång till skyddad route! ", data);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Lyckades inte ge dig tillgång!");
        return;
    }
}

//Till inbox.html, skyddad route
async function moveToInbox(){
    try{
        if(!localStorage.getItem("token")) {
            alert("Du måste vara inloggad för att se kundmeddelanden.");
            return;
            
        }
        //Skicka token vid varje anrop
        let token = localStorage.getItem("token");
        console.log("Lagrad token: ", token);

        let response = await fetch('http://localhost:3333/api/protected', {
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
            //window.location.href = "inbox.html";
            const newInbox = document.getElementById("new-inbox");

            newInbox.style.display = "block";  
            console.log("Du fick tillgång till skyddad route! ", data);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Lyckades inte ge dig tillgång!");
        return;
    }
}


//Hämta lista på produkter
async function getProductList(){
  
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
        deleteBtn.addEventListener('click', (event) =>{   const id = event.target.dataset.id;
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
       
    productlistEl.appendChild(newEl);
}

//Hämta uppgifter om produkten som ska uppdateras och lägg i formulär för uppdatering
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

//Redigera produktinfo i modal, skicka till databasen
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
        const response = await fetch(`http://localhost:3333/api/menu/edit/${prod_id}`, {
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
        
    } catch (error){
        console.error("Fel vid uppdatering: ", error);
    }
};

