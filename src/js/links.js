"use strict";

//Funktioner i admingränssnittet som finns på samtliga admin-sidor

const addProdBtn = document.getElementById("add-product-link"); //Länk till "lägg till produkt"
const inboxBtn = document.getElementById("inbox-link"); //länk till inbox.html
const adminBtn = document.getElementById("admin-link"); //länk till admin.html

//Nå skyddad route, addproduct.html
addProdBtn.addEventListener("click", accessAddProd, false);
//Nå skyddad route, inbox.html
inboxBtn.addEventListener("click", accessInbox, false);
//Åtkomst till skyddad route: admin.html
adminBtn.addEventListener("click", accessList, false);

//Åtkomst skyddad route: addproduct.html
async function accessAddProd(e){
    e.preventDefault();

    try{
        if(!localStorage.getItem("token")) {
            alert("Du måste vara inloggad för att redigera produktlistan.");
            return;
            
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
        return;
    }
}

//Åtkomst skyddad route: inbox.html
async function accessInbox(e){
    e.preventDefault();

    try{
        if(!localStorage.getItem("token")) {
            alert("Du måste vara inloggad för att se kundmeddelanden.");
            return;
            
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
            window.location.href = "inbox.html";
            console.log("Du fick tillgång till skyddad route! ", data);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Lyckades inte ge dig tillgång!");
        return;
    }
}

//Åtkomst skyddad route: admin.html
async function accessList(e){
    e.preventDefault();

    try{
        if(!localStorage.getItem("token")) {
            alert("Du måste vara inloggad för att se kundmeddelanden.");
            return;
            
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
            window.location.href = "admin.html";
            console.log("Du fick tillgång till skyddad route! ", data);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Lyckades inte ge dig tillgång!");
        return;
    }
}
