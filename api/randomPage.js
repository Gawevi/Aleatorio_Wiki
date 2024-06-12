// randomPage.js

// Função que retorna uma página aleatória
export default function getRandomPage() {
    const categoria = 'Players';
    const wikiUrl = 'https://liquipedia.net/valorant';
    const apiUrl = `${wikiUrl}/api.php?action=query&list=categorymembers&cmtitle=Category:${categoria}&cmlimit=500&format=json`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao acessar a API: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if ('query' in data && 'categorymembers' in data.query) {
                const paginas = data.query.categorymembers;

                if (paginas.length > 0) {
                    const paginaAleatoria = Math.floor(Math.random() * paginas.length);
                    const tituloPagina = paginas[paginaAleatoria].title;
                    const urlPagina = `${wikiUrl}/${tituloPagina.replace(' ', '_')}`;

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
        })
        .catch(error => {
            throw new Error(`Erro ao acessar a API: ${error}`);
        });
}