"use strict";

const inputSender = document.getElementById("sender");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputMessage = document.getElementById("customer-message");
const sendBtn = document.getElementById("send-btn");
const customerMsg = document.getElementById("customer-msg");

sendBtn.addEventListener('click', sendMessage, false);

async function sendMessage(e){
    e.preventDefault();

    let customerInput = {
        sender_name: inputSender.value,
        sender_email: inputEmail.value,
        sender_number: inputPhone.value,
        sender_message: inputMessage.value
    }

    try{
        const response = await fetch('http://localhost:3334/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(customerInput)
        });

        if(!response.ok){
            console.log("Något gick fel");
            return;
        }
        let data = await response.json();
        //customerMsg.innerHTML = "Tack! Ditt meddelande har skickats!";
        alert("Tack! Ditt meddelande har skickats!");
        inputSender.value = "";
        inputEmail.value = "";
        inputPhone.value = "";
        inputMessage.value = "";
        return data;


    } catch (error) {
        console.error("Error: ", error);
        customerMsg.innerHTML = "Meddelandet skickades inte. Försök igen!";
    }
}