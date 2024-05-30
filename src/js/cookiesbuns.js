"use strict";

let cookiesEl = document.getElementById("cookies-buns");

getCookie();

//Hämta lista på produkter
async function getCookie(){
    //e.preventDefault();

    const response = await fetch("http://localhost:3334/api/menu", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.table(data);

    makeCookieList(data);
};

//Skriv ut listan
function makeCookieList(data){

    data.forEach(dat => {
        if(dat.prod_category === "bulle" || dat.prod_category === "kaka"  ){
        let newEl = document.createElement("div");
        newEl.className = "product-frame";
        
        newEl.innerHTML =`
        <h3>${dat.prod_name}</h3>            
        <h4>${dat.prod_price} </h4>
        <div class="prod-img">
        <img class="product-img" src="./css/images/${dat.prod_id}.jpg"/>  </div>
        <p>${dat.prod_description} </p>   
            
            `;

            let orderBtn = document.createElement('button');
            orderBtn.textContent = "Beställ";
            orderBtn.id = dat.prod_id;
            orderBtn.className = "orderBtn";
            orderBtn.addEventListener('click', () => orderProduct(dat.prod_id));
            newEl.appendChild(orderBtn);
            cookiesEl.appendChild(newEl);
        };

       });
}