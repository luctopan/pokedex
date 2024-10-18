// Seletores com as infos do Pokémon
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

// Seletores do formulário e do controle da Pokédex
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Inicia a Pokédex com o Pokémon de ID 1 (Bulbasaur)
let searchPokemon = 1;

// Aqui o usuário envia via form o nome do Pokémon ou a ID
form.addEventListener('submit', (event) => {
    event.preventDefault(); // remove o comportamento padrão do formulário
    renderPokemon(input.value.toLowerCase()); // chama a função de renderizar o Pokémon na Pokédex
    input.value = ''; // limpa o formulário
});

// botões da Pokédex -> ANTERIOR e PRÓXIMO
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) { // se o index for maior que 1, aí o botão pode funcionar
        searchPokemon -= 1; // diminui 1 do valor do index
        renderPokemon(searchPokemon); // chama a função que renderiza o Pokémon na Pokédex
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1; // aumenta 1 do valor do index
    renderPokemon(searchPokemon); // chama a função que renderiza o Pokémon na Pokédex
});

// Função para renderizar o Pokémon
const renderPokemon = async (pokemon) => {

    // Assim que a função for chamada, o usuário recebe a mensagem "Carregando..." enquanto espera
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    // data recebe os dados da função fetchPokemon, passando como parâmetro o que o usuário digitou
    const data = await fetchPokemon(pokemon);

    if (data) { // se os dados existirem, troca as infos dos seletores pelos dados do Pokémon
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
        // console.log(data);
    } else { // se não existir, retorna como Não encontrado
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :/'
        pokemonNumber.innerHTML = ''

    }

}

// Função que faz a requisição na PokéAPI
const fetchPokemon = async (pokemon) => {
    // faz a requisição para a API do PokéAPI, passando o nome/id como parâmetro
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // A condição é satisfeita se o servidor responder 200
    if (APIResponse.status == 200) {
        // converte e resposta para JSON
        const data = await APIResponse.json();
        // retorna o dado
        return data;
    }

}

// Assim que a página for carregada, renderizar o primeiro Pokémon
renderPokemon(searchPokemon);