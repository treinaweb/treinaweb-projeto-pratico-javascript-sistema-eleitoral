const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})


function question(query) {
    return new Promise(function (resolve) {
        readline.question(query, function (resposta) {

            resolve(resposta)
        });
    });
}

question("pergunta aleatória: ").then(function (resposta) {
    console.log(resposta);
    readline.close();
});
