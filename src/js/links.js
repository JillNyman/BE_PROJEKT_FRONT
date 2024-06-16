
//åtkomst till lägg till produkt
export async function accessAddProdFunction(e){
    e.preventDefault();
    console.log("Trying to access addproduct.html");
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

