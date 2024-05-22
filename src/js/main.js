"use strict";
//Sido-meny kund
const showCustomerLoginEl = document.getElementById("show-customer-login"); //knapp för att visa inlogg kund
const createCustomerLoginEl = document.getElementById("create-customer-login"); //knapp skapa ny kund

//Sido-meny admin
const showAdminLoginEl = document.getElementById("show-admin-login"); //knapp för att visa inlogg admin
const createAdminLoginEl = document.getElementById("create-admin-login"); //knapp skapa ny 


//Sidans huvudområde
const mainAreaEl = document.getElementById("index-area");

//Kund
const customerContainerEl = document.getElementById("login-customer-container"); //container för inlogg kund
const loginCustomerBtnEl = document.getElementById("login-customer-btn"); //logga in kund
const inputCustomerEl = document.getElementById("username");//input användarnamn kund
const inputCustomerPassEl = document.getElementById("password");//input lösenord kund

//Skapa ny kund
const newCustomerContainerEl = document.getElementById("create-customer-container"); //container för inlogg kund
const newLoginCustomerBtnEl = document.getElementById("create-customer-btn"); //logga in kund
const newInputCustomerEl = document.getElementById("new_username");//input användarnamn kund
const newInputCustomerPassEl = document.getElementById("new_password");//input lösenord kund

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

loginCustomerBtnEl.addEventListener("click", loginCustomer, false);

//visa login kund
showCustomerLoginEl.onclick = function () {
    if(customerContainerEl.style.display === "none") {
        customerContainerEl.style.display = "block";
        adminContainerEl.style.display = "none";
        mainAreaEl.style.display = "none";
        newAdminContainerEl.style.display = "none";
        newCustomerContainerEl.style.display = "none";
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
        newAdminContainerEl.style.display = "none";
        newCustomerContainerEl.style.display = "none";
    }
    else {
        adminContainerEl.style.display = "none";
    }

}

//knapp "visa skapa användare"
createCustomerLoginEl.onclick = function () {
    if(newCustomerContainerEl.style.display === "none"){
        newCustomerContainerEl.style.display = "block";
        adminContainerEl.style.display = "none";
        mainAreaEl.style.display = "none";
        customerContainerEl.style.display = "none";
        newAdminContainerEl.style.display = "none";
    } else {
        newCustomerContainerEl.style.display = "none";
    }
}



//knapp "visa skapa admin"
createAdminLoginEl.onclick = function () {
    if(newAdminContainerEl.style.display === "none") {
        newAdminContainerEl.style.display ="block";
        adminContainerEl.style.display = "none";
        mainAreaEl.style.display = "none";
        customerContainerEl.style.display = "none";
        newCustomerContainerEl.style.display = "none";
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
        
        window.location.href = "admin.html";
    } else {
        console.log("Fel e-postadress eller lösenord");
    }
    }catch (error){
        //console.error("Error: " + error);
        messageEl.innerHTML = "Fel användarnamn eller lösenord!";
    
    }
}

async function loginCustomer(e){
    e.preventDefault();

    try{
        let response = await fetch('http://localhost:3333/api/cstauth/logincustomer', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            customer_name: inputCustomerEl.value,
            customer_password: inputCustomerPassEl.value
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
        
        window.location.href = "menu.html";
    } else {
        console.log("Fel e-postadress eller lösenord");
    }
    }catch (error){
        //console.error("Error: " + error);
        messageEl.innerHTML = "Fel användarnamn eller lösenord!";
    
    }
}