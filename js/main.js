/*Funktioner på startsidan */

//Importera från links.js
import { loginAdmin, updateButtons } from "./links.js";
//Visa inlogg för admin
const showAdminLoginEl = document.getElementById("show-admin-login"); //** knapp som tar fram inlogg admin

//Sidans huvudområde
const mainAreaEl = document.getElementById("index-area");

//Admin
const adminContainerEl = document.getElementById("login-admin-container"); //container för inlogg admin

//Eventlyssnare
document.addEventListener("DOMContentLoaded", function() {
    updateButtons();

    const loginAdminForm = document.getElementById("login-admin"); //formulär för inlogg

    if(loginAdminForm){
        loginAdminForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            //input användarnamn admin
            const admin_name = document.getElementById("admin_name").value;
            //input lösenord admin
            const admin_password = document.getElementById("admin_password").value;
            
            if(!admin_name){
                console.error("User name is missing");
                alert("Fyll i både användarnamn och lösenord!");
                return;
            }
            if(!admin_password){
                console.error("Password is missing");
                alert("Fyll i både användarnamn och lösenord!");
                return;
            }
            try{
                const success = await loginAdmin(admin_name, admin_password); //invänta att funktionen loginAdmin skickar anvnamn och lösenord till backend
                if(success){
                    const savedToken = localStorage.getItem("token");
                    console.log("Login successful, token:", savedToken);//
                    //Extra kontroller som lagts in när omdirigeringen inte fungerade som den skulle
                    if(savedToken){
                        console.log("Attempting to redirect to admin.html");
                        // Dirigera om till admin-sidan
                        window.location.href = "admin.html";
                    } else {
                        console.error("Token sparades inte korrekt i lokal lagring.");
                        alert("Inloggningen misslyckades. Försök igen.");
                    }
                } else {
                    alert("Inloggningen misslyckades. Försök igen.");
                }
            } catch (error){
                console.error("Login error:", error);
                alert("Ett fel uppstod vid inloggning. Försök igen senare.");
            }
                
        });
    }
});

//visa login admin-rutan 
showAdminLoginEl.onclick = function () {
    if(adminContainerEl.style.display === "none") {
        adminContainerEl.style.display = "block";        
        mainAreaEl.style.display = "none";           
    }
    else {
        adminContainerEl.style.display = "none";
    }
}

