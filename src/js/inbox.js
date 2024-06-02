"use strict";

const postMessageEl = document.getElementById("post-message");

getMessageList();

//Hämta lista på produkter
async function getMessageList(){
    // e.preventDefault();
     try{
     const response = await fetch('http://localhost:3334/api/contact' , {
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
 
 //Skriv ut listan FUNKAR
 function makeMessageList(data){
     postMessageEl.innerHTML = "";
     let newEl = document.createElement("div");
 
     data = Object.values(data);
 
     data.forEach(dat => {
         
         newEl.innerHTML +=`
         <div class="message-div">
         <h4 class="message-name">Från: ${dat.sender_name}, ${dat.sender_email}</h4>
         <h5 class="message-digits">Mail: ${dat.sender_email}| Tfn: ${dat.sender_number})</h5>
         <p class="message_message">${dat.sender_message}</p>            
         </div>
         `;     
 
         let answerBtn = document.createElement("button");
         answerBtn.textContent = "Svara";
         //deleteBtn.id = dat.prod_id; 
         answerBtn.className = "answerBtn"; 
        
 
         newEl.appendChild(answerBtn);
 
         
         postMessageEl.appendChild(newEl);
        
        });
        
 }
 