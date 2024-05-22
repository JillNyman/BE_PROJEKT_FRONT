"use strict";

let cakePieEl = document.getElementById("cakes-pies");

getCakes();

//Hämta lista på produkter
async function getCakes(){
    //e.preventDefault();

    const response = await fetch("http://localhost:3334/api/menu", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.table(data);

    makeCakeList(data);
};

//Skriv ut listan
function makeCakeList(data){

    data.forEach(dat => {
        if(dat.prod_category === "tårta" || dat.prod_category === "paj"){
        let newEl = document.createElement("div");
        newEl.className = "product-frame";
        
        newEl.innerHTML =`
        <h3>${dat.prod_name}</h3>            
        <h4>${dat.prod_price} </h4>
        <p>${dat.prod_description} </p>       
            `;

            let orderBtn = document.createElement('button');
            orderBtn.textContent = "Beställ";
            orderBtn.id = dat.prod_id;
            orderBtn.className = "orderBtn";
            orderBtn.addEventListener('click', () => deletePost(dat.prod_id));
            newEl.appendChild(orderBtn);
            cakePieEl.appendChild(newEl);
        };

       });
}