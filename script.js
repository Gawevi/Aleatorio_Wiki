document.addEventListener('DOMContentLoaded', () => {
    const wikiUrl = 'https://liquipedia.net/valorant';
    const categoria = 'Players';
    const apiUrl = `${wikiUrl}/api.php?action=query&list=categorymembers&cmtitle=Category:${categoria}&cmlimit=500&format=json`;

    const resultDiv = document.getElementById('result');
    const getRandomPageButton = document.getElementById('getRandomPage');

    getRandomPageButton.addEventListener('click', () => {
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

                        resultDiv.innerHTML = `
                            <p>Página aleatória da categoria '${categoria}':</p>
                            <p>Título: ${tituloPagina}</p>
                            <p>URL: <a href="${urlPagina}" target="_blank">${urlPagina}</a></p>
                        `;
                    } else {
                        resultDiv.innerHTML = "<p>Nenhuma página encontrada na categoria.</p>";
                    }
                } else {
                    resultDiv.innerHTML = "<p>Resposta da API não contém as informações esperadas.</p>";
                }
            })
            .catch(error => {
                resultDiv.innerHTML = `<p>Erro ao acessar a API: ${error}</p>`;
            });
    });
});