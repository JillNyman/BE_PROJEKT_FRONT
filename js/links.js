

//logga in om token finns
export function checkAdminAccess(){
    return localStorage.getItem("token") !== null;
}

export async function loginAdmin(admin_name, admin_password){
    try{
        let response = await fetch('http://localhost:3333/api/auth/loginadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ admin_name, admin_password })
        });

        if(!response.ok){
            throw new Error("Fel användarnamn eller lösenord!");
        }

        let data = await response.json();
        console.log("Server response:", data); 

        let token = data.response.token;
        if(token){
            localStorage.setItem("token", token); //spara token i localstorage
            return true;
        } else {
            console.error("Token saknas i svaret från servern.");
            return false;
        }
        
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
}

export async function logoutAdmin(){
    const token = localStorage.getItem("token");

    try{
        let response = await fetch('http://localhost:3333/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if(!response.ok){
            console.error("Utloggning på serversidan misslyckades")
        }
        localStorage.removeItem("token");
        return true;
    } catch (error) {
        console.error("Fel vid utloggning:", error);
        
    } finally {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
}

//Funktion: om inlogg fungerar, ska knappen logga in bytas ut till logga ut
export function updateButtons(){
    const loginBtn = document.getElementById("login-admin-btn");
    const logoutBtn = document.getElementById("logout-link");
    

    if(checkAdminAccess()){
        if(loginBtn) loginBtn.style.display = "none";
        if(logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
        if(loginBtn) loginBtn.style.display = "inline-block";
        if(logoutBtn) logoutBtn.style.display = "none";
    }
}
        
    
//åtkomst till lägg till produkt
export async function accessAddProdFunction(e){
    e.preventDefault();
    console.log("Trying to access addproduct.html");//
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
            console.log("Access granted, redirecting to addproduct.html");
            window.location.href = "addproduct.html";
            console.log("Du fick tillgång till skyddad route! ", data);
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Lyckades inte ge dig tillgång!");
        return;
    }

   
}

//till produktlistan
export async function accessList(e){
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

//åtkomst till kundmeddelanden
export async function accessInbox(e){
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

