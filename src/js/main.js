"use strict";
/*Funktioner på startsidan */

//Sido-meny admin
const showAdminLoginEl = document.getElementById("show-admin-login"); //knapp för att visa inlogg admin

//Sidans huvudområde
const mainAreaEl = document.getElementById("index-area");

//Admin
const adminContainerEl = document.getElementById("login-admin-container"); //container för inlogg admin
const loginAdminBtnEl = document.getElementById("login-admin-btn"); //logga in admin
const inputAdminEl = document.getElementById("admin_name");//input användarnamn admin
const inputAdminPassEl = document.getElementById("admin_password");//input lösenord admin

//Skapa ny admin
const newAdminContainerEl = document.getElementById("create-admin-container"); //container för inlogg admin
const newLoginAdminBtnEl = document.getElementById("create-admin-btn"); //logga in admin
const newInputAdminEl = document.getElementById("new_admin_name");//input användarnamn admin
const newInputAdminPassEl = document.getElementById("new_admin_password");//input lösenord admin

const messageEl = document.getElementById("message");//Eventuellt meddelande till användaren  

//Eventlyssnare
loginAdminBtnEl.addEventListener("click", loginAdmin, false); //logga in admin

//visa login admin-rutan
showAdminLoginEl.onclick = function () {
    if(adminContainerEl.style.display === "none") {
        adminContainerEl.style.display = "block";        
        mainAreaEl.style.display = "none";
        newAdminContainerEl.style.display = "none";        
    }
    else {
        adminContainerEl.style.display = "none";
    }
}

//inloggning
async function loginAdmin(e){
    e.preventDefault();

    try{
        let response = await fetch('http://localhost:3333/api/auth/loginadmin', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            admin_name: inputAdminEl.value,
            admin_password: inputAdminPassEl.value
        })
    })

   let data = await response.json();
    if(!response.ok){
        messageEl.innerHTML = "Inloggningen misslyckades!";
        throw new Error('Inloggningen misslyckades');
        
    }
    console.log(data.response.token);

    if(response.status === 200){
        localStorage.setItem('token', data.response.token); 
        let adminBtn = document.getElementById("getadmin-btn");

        adminBtn.style.display = "block";       
        
    } else {
        console.log("Fel e-postadress eller lösenord");
    }
    }catch (error){
        messageEl.innerHTML = "Fel användarnamn eller lösenord!";
    
    }
}
