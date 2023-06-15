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

const candidatos = [];
const votos = {};

async function main() {
    console.log("### Bem vindo ao sistema eleitoral da TreinaWeb ###");
    console.log("\nEscolha um número das opções a seguir\n");

    let continuarLoop = true;
    do {
        console.log("1 - Cadastrar Candidato");
        console.log("2 - Iniciar Eleição");
        console.log("3 - Imprimir Candidatos");
        const opcao = await question('Escolha uma opção: ')

        switch (opcao) {
            case '1':
                await cadastrarCandidato();
                break;
            case '2':
                if (candidatos.length > 1) {
                    await iniciarEleicao();
                    continuarLoop = false;
                } else {
                    console.error("\nUma eleição precisa de no minimo de dois candidatos\n");
                }
                break;
            case '3':
                console.log('\nOs candidatos são: ');
                candidatos.forEach(function (candidato) {
                    console.log(`Nome: ${candidato.nome}, Número: ${candidato.numero}`);
                });
                console.log('\n');
                break;
            default:
                console.error('\nOpção inválida. Tente novamente\n');
                break;
        }

    } while (continuarLoop)
    readline.close();
}