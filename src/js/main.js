"use strict";

const showCustomerLoginEl = document.getElementById("show-customer-login"); //knapp för att visa inlogg kund
const showAdminLoginEl = document.getElementById("show-admin-login"); //knapp för att visa inlogg admin
const customerContainerEl = document.getElementById("login-customer-container");
const adminContainerEl = document.getElementById("login-admin-container");
const mainAreaEl = document.getElementById("main-area");
const loginAdminBtnEl = document.getElementById("login-admin-btn");
const inputAdminEl = document.getElementById("admin_name");
const inputAdminPassEl = document.getElementById("admin_password");
const messageEl = document.getElementById("message");

loginAdminBtnEl.addEventListener("click", loginAdmin, false);

//visa login kund
showCustomerLoginEl.onclick = function () {
    if(customerContainerEl.style.display === "none") {
        customerContainerEl.style.display = "block";
        adminContainerEl.style.display = "none";
        mainAreaEl.style.display = "none";
    }
    else {
        customerContainerEl.style.display = "none";
    }
}

//visa login admin
showAdminLoginEl.onclick = function () {
    if(adminContainerEl.style.display === "none") {
        adminContainerEl.style.display = "block";
        customerContainerEl.style.display = "none";
        mainAreaEl.style.display = "none";
    }
    else {
        adminContainerEl.style.display = "none";
    }

}

async function loginAdmin(e){
    e.preventDefault();

    try{
        let response = await fetch('http://localhost:3335/api/loginadmin', {
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
        
        window.location.href = "admin.html";
    } else {
        console.log("Fel e-postadress eller lösenord");
    }
    }catch (error){
        //console.error("Error: " + error);
        messageEl.innerHTML = "Fel användarnamn eller lösenord!";
    
    }
}