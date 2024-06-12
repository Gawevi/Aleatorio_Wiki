// Importa o módulo node-fetch
const fetch = require('node-fetch');

// Função assíncrona para obter uma página aleatória da categoria 'Players'
async function getRandomPage() {
    try {
        const categoria = 'Players';
        const wikiUrl = 'https://liquipedia.net/valorant';
        const apiUrl = `${wikiUrl}/api.php?action=query&list=categorymembers&cmtitle=Category:${categoria}&cmlimit=500&format=json`;

        // Obtém os dados da API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro ao acessar a API: ${response.status}`);
        }
        const data = await response.json();

        // Verifica se os dados da resposta estão no formato esperado
        if ('query' in data && 'categorymembers' in data.query) {
            const paginas = data.query.categorymembers;

            // Verifica se há páginas disponíveis
            if (paginas.length > 0) {
                // Seleciona uma página aleatória
                const paginaAleatoria = Math.floor(Math.random() * paginas.length);
                const tituloPagina = paginas[paginaAleatoria].title;
                const urlPagina = `${wikiUrl}/${tituloPagina.replace(' ', '_')}`;

                // Retorna os detalhes da página aleatória
                return {
                    title: tituloPagina,
                    url: urlPagina
                };
            } else {
                throw new Error("Nenhuma página encontrada na categoria.");
            }
        } else {
            throw new Error("Resposta da API não contém as informações esperadas.");
        }
    } catch (error) {
        throw new Error(`Erro ao obter página aleatória: ${error.message}`);
    }
}

// Exporta a função getRandomPage para uso em outros módulos
module.exports = getRandomPage;