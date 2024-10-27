//Kontaktformulär för kunder
//Inputfält i formuläret contact.html
const inputSender = document.getElementById("sender");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputMessage = document.getElementById("customer-message");
const sendBtn = document.getElementById("send-btn");
const customerMsg = document.getElementById("customer-msg");

//Skicka-knapp
sendBtn.addEventListener('click', sendMessage, false);

//Skicka meddelande
async function sendMessage(e){
    e.preventDefault();

    let customerInput = {
        sender_name: inputSender.value.trim(),
        sender_email: inputEmail.value.trim(),
        sender_number: parseInt(inputPhone.value.trim(), 10), // Konvertera till heltal
        sender_message: inputMessage.value.trim()
    }

    // Validera samtliga fält
    if(!customerInput.sender_name){
        console.error("Sender name is missing");
        alert("Fyll i ditt namn!");
        return;
    }
    if(!customerInput.sender_email){
        console.error("Sender email is missing");
        alert("Fyll i din mailadress!");
        return;
    }
    if (isNaN(customerInput.sender_number) || customerInput.sender_number <= 0) {
        customerMsg.innerHTML = "Vänligen ange ett giltigt telefonnummer.";
        return;
    }
    if(!customerInput.sender_message){
        console.error("Sender message is missing");
        alert("Skriv ett meddelande!");
        return;
    }

    console.log("Sending data:", JSON.stringify(customerInput));//

    try {
        const response = await fetch('http://localhost:3333/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(customerInput)
        });

        if(!response.ok){
            const errorBody = await response.text();
            console.log("Error body:", errorBody);
            customerMsg.innerHTML = "Något gick fel. Försök igen senare.";
            return;
        }
        let data = await response.json();
        alert("Tack! Ditt meddelande har skickats!");
        inputSender.value = "";
        inputEmail.value = "";
        inputPhone.value = "";
        inputMessage.value = "";
        return data;


    } catch (error) {
        console.error("Error:", error);
        customerMsg.innerHTML = "Ett fel uppstod. Kontrollera din internetanslutning och försök igen.";
    }
}