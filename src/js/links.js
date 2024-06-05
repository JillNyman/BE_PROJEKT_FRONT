"use strict";

export function accessAddProd(){
    console.log("Addproduct exporterad");
}

export function accessList(){
    console.log("Admin productlist exporterad");
}

export function accessInbox(){
    console.log("Inbox exporterad");
}
//Funktioner i admingränssnittet som finns på samtliga admin-sidor

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
            window.location.href = "admin.html";
            console.log("Du fick tillgång till skyddad route! ", data);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Lyckades inte ge dig tillgång!");
        return;
    }
}
