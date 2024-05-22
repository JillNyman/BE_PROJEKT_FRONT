"use strict";

const productlistEl = document.getElementById("product-list");

getProductList();

//Hämta lista på produkter
async function getProductList(){
    //e.preventDefault();

    const response = await fetch("http://localhost:3334/api/menu", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.table(data);

    makeProductList(data);
};

//Skriv ut listan FUNKAR
function makeProductList(data){

    data.forEach(dat => {
        let newEl = document.createElement("tbody");
        
        newEl.innerHTML =`
        <tr rowspan="2">
            <td> ${dat.prod_id}</td>
            <td>${dat.prod_name} </td>
            <td>${dat.prod_price} kr </td>
            <td>${dat.prod_description} </td>
       </tr>
       <tr>
           <td>${dat.prod_category}</td>
            <td > <a class="deleteBtn" href="delete/${dat.prod_id}">Radera</a></td>
            <td><a class="editBtn" href="edit/${dat.prod_id}">Redigera</a></td>
            <td></td>
            `;       

            let divLine = document.createElement('div');
            divLine.className = "list-line";
            newEl.appendChild(divLine);
            
            productlistEl.appendChild(newEl);

       });
}