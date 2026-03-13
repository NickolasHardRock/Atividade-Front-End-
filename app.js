async function BuscarRefeicao(){ // Função Assincrona pois assim que aplicação inicia ela ja busca as informações
    const resposta = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast");
    const data = await resposta.json();

    const objetoEscolhido = data.meals[getRandomInt()];
    
    return objetoEscolhido;
}
console.log(BuscarRefeicao());

function getRandomInt() {
  min = Math.ceil(0);
  max = Math.floor(15);
  return Math.floor(Math.random() * (max - min) + min);
}
console.log(getRandomInt());

// $(function(){$('div').on('click',function(){
//     $(this).toggleClass('show-description');
//     });
// });

async function CarregarImagem(){
    
    const comida = await BuscarRefeicao();

    const indexarImagem = document.getElementById('card');
    indexarImagem.innerHTML = `
     <div style="background-image: url('${comida.strMealThumb}');"> 
        <p>
            ${comida.strMeal} 
        </p>
    </div>
    `;
}
window.onload = () =>{    
CarregarImagem();

};


    
//     .then(res => res.json())
//     .then(data => {
        
//         console.log(data);
//         const objetoEscolhido = data.meals[1];
//         console.log(objetoEscolhido.strMealThumb)

//         const resultado = document.getElementById('resultado');

//         resultado.innerHTML = `
//         <p>Prato do Dia: ${objetoEscolhido.strMeal}<p>
//         <img src="${objetoEscolhido.strMealThumb}" alt="Qualquer Coisa" title="Qualquer coisa" />
//         `;
        
//     })
//     .catch(erro => console.error(`Erro ao consumir API:`, erro));
// }