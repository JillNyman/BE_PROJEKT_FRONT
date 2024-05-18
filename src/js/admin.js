"use strict";

const productlistEl = document.getElementById("product-list");

getProductList(e);

//Hämta lista på produkter
async function getProductList(e){
    e.preventDefault();

    const response = await fetch("http://localhost:3335/menu", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.table(data);

    makeProductList(data);
};

//Skriv ut listan
function makeProductList(data){

    data.forEach(dat => {
        let newEl = document.createElement("tbody");
        
        newEl.innerHTML =`
        <tr rowspan="2">
            <td> ${dat.prod_id} </td>
            <td>${dat.prod_name} </td>
            <td>${dat.prod_price} </td>
            <td>${dat.prod_description} </td>
       </tr>
       <tr>
           <td>${dat.prod_category}</td>
            <td> </td>
            <td></td>
            <td></td>
            `;

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Radera";
            deleteBtn.id = dat.prod_id;
            deleteBtn.className = "deleteBtn";
            deleteBtn.addEventListener('click', () => deletePost(dat.prod_id));
            newEl.appendChild(deleteBtn);
            episodes.appendChild(newEl);

       });
}