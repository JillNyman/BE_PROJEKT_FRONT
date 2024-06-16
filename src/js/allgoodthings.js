let goodThingsEl = document.getElementById("good-things");

//Hämta produkter inom kategorin när sidan laddas
getGood();

//Hämta lista på produkter
async function getGood(){
    

    try{
    const response = await fetch("http://localhost:3333/api/menu", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(!response.ok){
        console.log("Lyckades inte hämta data");
        return;
    }
    let data = await response.json();
    console.table(data);

    makeGoodList(data);
} catch (error) {
    console.error("Fel när data skulle hämtas: ", error);
}
};

//Skriv ut listan
function makeGoodList(data){

    data.forEach(dat => {
        if(dat.prod_category === "smått&gott" ){
        let newEl = document.createElement("div");
        newEl.className = "product-frame";
        
        newEl.innerHTML =`
        <div class="product-info">
        <h3>${dat.prod_name}</h3>            
        <h4>${dat.prod_price} </h4>
        </div>
        <div class="product-desc">  
        <p>${dat.prod_description} </p>    
        </div>          
            `;
            
            let plusBtn = document.createElement("a");
            plusBtn.className = "order-btn";
            plusBtn.href = "#";
  
            newEl.appendChild(plusBtn);
            goodThingsEl.appendChild(newEl);
        };

       });
}