let todasAsRefeicoes = [];

function getRandomInt() {
  min = Math.ceil(0);
  max = Math.floor(15);
  return Math.floor(Math.random() * (max - min) + min);
}

async function BuscarRefeicao(){ // Função Assincrona pois assim que aplicação inicia ela ja busca as informações
    const resposta = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast");
    const data = await resposta.json();

    const objetoEscolhido = data.meals[getRandomInt()];
    
    return objetoEscolhido;
}

async function BuscarCardapio() {
    const respostaBuscarCardapio = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast");
    
    const cardapio = await respostaBuscarCardapio.json();

    todasAsRefeicoes = cardapio.meals;
    
    
}


 function mostrarCards(menu = todasAsRefeicoes){
    
    const container = document.getElementById("card");
    
   

    if(menu.length === 0){
        document.getElementById("erro").style.display = "block"
        return;
    }

    document.getElementById("erro").style.display = "none";

    container.innerHTML = "";
    menu.forEach((cafe) => {
        
        const card = document.createElement("div");
        card.className = "card";
        card.style.backgroundImage = `url('${cafe.strMealThumb}')`;
        card.innerHTML = `
        <p>
            ${cafe.strMeal}
        </p>
        `;

        card.addEventListener("click",()=>{
            card.classList.toggle("selecionado");
        });

        container.appendChild(card);
    });
};

function buscar(){

    let menu = todasAsRefeicoes;

    const texto = document.getElementById("busca").value.toLowerCase();

    document.getElementById("carregamento").style.display = "block";
    document.getElementById("erro").style.display = "none";
    document.getElementById("card").style.opacity = "1";

    setTimeout(()=>{
        document.getElementById("carregamento").style.display = "none";
        document.getElementById("card").style.opacity = "1";

        if(texto === ""){
            mostrarCards(menu);
            return;
        }

        const resultados = menu.filter(cafe => 
            cafe.strMeal.toLowerCase().includes(texto)
               
        );
        
        console.log(resultados);
        mostrarCards(resultados);

        if(resultados.length === 1){
            const CardEscolhido = document.querySelector('.card');
            if(CardEscolhido) CardEscolhido.classList.add('selecionado');
        }
    },400);
}

document.getElementById("btnBuscar").addEventListener("click",buscar);
document.getElementById("busca").addEventListener("keypress",(e) => {
    if(e.key === "Enter") buscar();
});



window.onload = async () =>{    
await BuscarCardapio();
mostrarCards();

};