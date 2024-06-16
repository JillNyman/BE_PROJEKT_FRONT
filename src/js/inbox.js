

//Lista på inkomna meddelanden inbox.html

import { accessList } from "./links";
import { accessAddProdFunction } from "./links";

const addProdBtn = document.getElementById("add-product-link"); //Länk till "lägg till produkt"
const adminBtn = document.getElementById("admin-link"); //länk till admin.html

//Åtkomst till skyddad route: admin.html
adminBtn.addEventListener("click", accessList, false);
//Nå skyddad route, addproduct.html
addProdBtn.addEventListener("click", accessAddProdFunction, false);

const postMessageEl = document.getElementById("post-message");

//Hämta alla meddelanden
getMessageList();

//Hämta lista på produkter
async function getMessageList(){
    //e.preventDefault();
     try{
     const response = await fetch('http://localhost:3333/api/contact' , {
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
         
         newEl.innerHTML +=`
         
         <h6 class="message-name">Från: ${dat.sender_name}, ${dat.sender_email}</h6>
         <h5 class="message-digits">Mail: ${dat.sender_email}| Tfn: ${dat.sender_number}</h5>
         <p class="message_message">${dat.sender_message}</p>     
         `;     
 
         let answerBtn = document.createElement("button");
         answerBtn.textContent = "Svara";
         answerBtn.className = "answerBtn";         
 
         newEl.appendChild(answerBtn); 
         
         postMessageEl.appendChild(newEl);        
        });
        
 }
 