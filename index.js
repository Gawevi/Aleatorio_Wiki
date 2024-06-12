const categoria = 'Players';
const wikiUrl = 'https://liquipedia.net/valorant';
const apiUrl = `${wikiUrl}/api.php?action=query&list=categorymembers&cmtitle=Category:${categoria}&cmlimit=500&format=json`;

require = require('esm')(module /*, options*/);
module.exports = require('./randomPage.js');

import('node-fetch').then(({ default: fetch }) => {
    fetch(apiUrl)
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

                    console.log(`Página aleatória da categoria '${categoria}':`);
                    console.log(`Título: ${tituloPagina}`);
                    console.log(`URL: ${urlPagina}`);
                } else {
                    console.log("Nenhuma página encontrada na categoria.");
                }
            } else {
                console.log("Resposta da API não contém as informações esperadas.");
            }
        })
        .catch(error => {
            console.error(`Erro ao acessar a API: ${error}`);
        });
});