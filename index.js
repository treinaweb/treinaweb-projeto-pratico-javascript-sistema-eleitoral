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

async function cadastrarCandidato() {
    const numero = await question('\nDigite o número do candidato: ');

    if (isNaN(numero)) {
        console.error("\nO candidato deve receber um número. Tente novamente\n");
        return;
    }

    const candidatoExiste = candidatos.find(function (candidato) {
        return candidato.numero === numero;
    });

    if (candidatoExiste) {
        console.error("\nJá existe um candidato com este número. Por favor, tente novamente com um número diferente\n");
        return;
    }

    const nome = await question('Digite o nome do candidato: ');

    const novoCandidato = { numero, nome };

    candidatos.push(novoCandidato);

    votos[novoCandidato.numero] = 0;

    console.log(`\n${novoCandidato.nome} cadastrado com sucesso\n`);
}




async function iniciarEleicao() {
    console.log("\nEleição inicializada");
    console.log("Digite 'fim' para encerrar a eleição.");

    let continuarLoop = true;
    do {

        const numero = await question('Digite o número do candidato em que deseja votar: ');
        if (numero === 'fim') {
            continuarLoop = false;
            console.log("\nFinal da eleição\n");
            resultadoDaEleicao();
            return;
        }


        if (votos[numero] === undefined) {
            console.error("\nNúmero do candidato não existente. Tente novamente\n");
        } else {
            votos[numero]++;
            console.log(`Voto para o candidato com o número ${numero} confirmado!`);
        }
    } while (continuarLoop)
}


function resultadoDaEleicao() {

    const resultado = candidatos.map(function (candidato) {
        return { nome: candidato.nome, numero: candidato.numero, votos: votos[candidato.numero] }
    });

    resultado.sort(function (a, b) {
        return b.votos - a.votos;
    });

    const candidatoVencedor = resultado[0];

    const totalVotos = Object.values(votos).reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    }, 0);

    console.log('\nResultado da eleição\n');
    console.log(`O vencedor da eleição é: ${candidatoVencedor.nome} com ${candidatoVencedor.votos} votos`);
    console.log(`Total de votos: ${totalVotos}`);
    console.log("Lista de candidatos e votos");
    resultado.forEach(function (candidato) {
        console.log(`Nome: ${candidato.nome}, Número: ${candidato.numero}, Votos: ${candidato.votos}`);
    });
}

main();