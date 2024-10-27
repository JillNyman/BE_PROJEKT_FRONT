//Lista på inkomna meddelanden inbox.html (admin)

import { accessList, accessAddProdFunction, updateButtons, logoutAdmin } from "./links";

const addProdBtn = document.getElementById("add-product-link"); //Länk till "lägg till produkt"
const adminBtn = document.getElementById("admin-link"); //länk till admin.html

//Åtkomst till skyddad route: admin.html
adminBtn.addEventListener("click", accessList, false);
//Åtkomst till skyddad route: addproduct.html
addProdBtn.addEventListener("click", accessAddProdFunction, false);

const postMessageEl = document.getElementById("post-message");

document.addEventListener('DOMContentLoaded', () => {
    //Hämta alla inkomna meddelanden
    getMessageList();
    //visa eller dölj logga in/ut-knapp
    updateButtons();

    //länk till utloggning
    const logoutBtn = document.getElementById("logout-link");
    if(logoutBtn){
            logoutBtn.addEventListener("click", logoutAdmin);
        }
})

//Hämta lista på produkter
async function getMessageList(){
    
     try{
        const token = localStorage.getItem('token');
     const response = await fetch('http://localhost:3333/api/contact' , {
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
     console.table(data);//
 
     makeMessageList(data);
 } catch (error) {
     console.error("Fel när data skulle hämtas: ", error);
 }
 };
 
 //Skriv ut listan 
 function makeMessageList(data){
     postMessageEl.innerHTML = "";
     let newEl = document.createElement("div");
     newEl.className = "message-div";
 
     data = Object.values(data);
 
     data.forEach(dat => {
         const messageElement = document.createElement("div");
         messageElement.className = "message-item";
        
         messageElement.innerHTML = `
             <h6 class="message-name">Från: ${dat.sender_name}</h6>
             <h5 class="message-digits">Mail: ${dat.sender_email}| Tfn: ${dat.sender_number}</h5>
             <p class="message_message">${dat.sender_message}</p>     
         `;     
 
         //Knapp för "svara", utan funktion
         let answerBtn = document.createElement("button");
         answerBtn.textContent = "Svara";
         answerBtn.className = "answerBtn";         
        //Knapp för radera meddelande
         let deleteBtn = document.createElement("button");
         deleteBtn.textContent = "Radera";
         deleteBtn.className = "deleteBtn";
         deleteBtn.id = `message-${dat.email_id}`;
         deleteBtn.addEventListener("click", () => deleteMessage(dat.email_id));

         let messageLine = document.createElement("div");
         messageLine.className = "message-line";
 
         messageElement.appendChild(answerBtn);
         messageElement.appendChild(deleteBtn);
         messageElement.appendChild(messageLine);
         
         newEl.appendChild(messageElement);        
     });
     
     postMessageEl.appendChild(newEl);
 }
 
 //Funktion för radera meddelande
 async function deleteMessage(id) {
     try {
         const token = localStorage.getItem('token');
         const response = await fetch(`http://localhost:3333/api/contact/${id}`, {
             method: 'DELETE',
             headers: {
                 'Authorization': 'Bearer ' + token
             },
         });
 
         if (!response.ok) {
             throw new Error('Kunde inte radera meddelandet');
         }
 
         console.log('Meddelande raderat');
         getMessageList(); // Uppdatera listan efter radering
     } catch (error) {
         console.error('Fel vid radering av meddelande:', error);
         alert('Kunde inte radera meddelandet. Försök igen senare.');
     }
 }
