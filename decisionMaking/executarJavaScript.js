function conditionalSimulator() {
    let outputElement = document.getElementById("saidaCondicionais");
    if (outputElement) {
        outputElement.innerText = "";
    }

    try {
        let idade = Number(document.getElementById("idadeCondicinnalInput").value);
        let resultado;

        if (isNaN(idade)) {
            resultado = "Por favor, insira um número válido.";
        } else if ( idade >= 18) {
            resultado = "Você é maior de idade!";
        } else if (idade >= 16) {
            resultado = "Quase de maior de idade!";
        } else {
            resultado = "Você é menor de idade!";
        }

        outputElement.innerText = resultado;
    } catch (error) {
        console.error("Erro ao executar Simulador idade: " , error);
        outputElement.innerText = "Erro: " + error.message;
    }
}

function limparResultado() {
    document.getElementById("saidaCondicionais").textContent = "";
    document.getElementById("idadeCondicinnalInput").value = "";
    
}

function simularSwitch() {
    let outputElement = document.getElementById("saidaSwitch");
    if (outputElement) {
        outputElement.innerText = "";
    }

    try {
        let dia = Number(document.getElementById("diaInput").value);
        let resultado;

        switch (dia) {
                    case 1:
                        resultado = "Domingo";
                        break;
                    case 2:
                        resultado = "Segunda-Feira";
                        break;
                    case 3:
                        resultado = "Terça-Feira";
                        break;
                    case 4:
                        resultado = "Quarta-Feira";
                        break;
                    case 5:
                        resultado = "Quinta-Feira";
                        break;
                    case 6:
                        resultado = "Sexta-Feira";
                        break;
                    case 7:
                        resultado = "Sábado-Feira";
                        break;
                    default:
                        resultado = "Dia Inválido!"; 
        }

        outputElement.innerText = resultado;
    } catch (error) {
        console.error("Erro ao executar Simulador de Dias da Semana: " , error);
        outputElement.innerText = "Erro: " + error.message;
    }
}

function limparDay() {
    document.getElementById("saidaSwitch").textContent = "";
    document.getElementById("diaInput").value = "";
}
