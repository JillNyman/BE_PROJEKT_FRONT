"use strict";
/*Funktioner på startsidan */

//Sido-meny admin
const showAdminLoginEl = document.getElementById("show-admin-login"); //knapp för att visa inlogg admin
const createAdminLoginEl = document.getElementById("create-admin-login"); //knapp skapa ny 

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

//visa login admin
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

//knapp "visa skapa admin"
createAdminLoginEl.onclick = function () {
    if(newAdminContainerEl.style.display === "none") {
        newAdminContainerEl.style.display ="block";
        adminContainerEl.style.display = "none";
        mainAreaEl.style.display = "none";        
    } else {
        newAdminContainerEl.style.display = "none";
    }
}

async function loginAdmin(e){
    e.preventDefault();

    try{
        let response = await fetch('http://localhost:3334/api/auth/loginadmin', {
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
        //return window.location.href = "http://127.0.0.1:54896/admin.html";
        
    } else {
        console.log("Fel e-postadress eller lösenord");
    }
    }catch (error){
        //console.error("Error: " + error);
        messageEl.innerHTML = "Fel användarnamn eller lösenord!";
    
    }
}
