let pyodideReady = loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
});

async function executarPython() {
    const pyodide = await pyodideReady;

    // Carrega o arquivo Python externo
    try {
        const response = await fetch("tiposVariaveisOperadores.py");
        const codigoPython = await response.text();
        await pyodide.runPythonAsync(codigoPython);
    } catch (err) {
        console.error("Erro ao carregar o código Python:", err);
        alert("Erro ao carregar o código Python!");
        return;
    }

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const op = document.getElementById("op").value;

    // Validação simples dos inputs
    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, insira números válidos.");
        return;
    }

    const comando = `
        calc = Calculadora()
        resultado = calc.calcular(${num1}, ${num2}, "${op}")
        resultado
    `;

    try {
        const result = await pyodide.runPythonAsync(comando);
        document.getElementById("output").textContent = `Resultado: ${result}`;
    } catch (err) {
        console.error("Erro ao executar o código Python:", err);
        document.getElementById("output").textContent = "Erro: " + err;
    }


}

function limparResultado() {
    document.getElementById("output").textContent = "Resultado: ";
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("op").value = "";
}

async function loadPyodideAndRun() {
    let pyodide = await loadPyodide({
        stdout: (text) => {
            // Captura a saída do print() e adiciona ao elemento desejado
            let outputElement = document.getElementById("saidaVariavel") || document.getElementById("saidaOperadores");
            if (outputElement) {
                outputElement.innerText += text + "\n";
            }
        }
    });
    await pyodide.loadPackage("micropip"); // Carrega pacotes adicionais, se necessário
    return pyodide;
}

async function simularVariavel() {
    // Limpa a saída anterior
    let outputElement = document.getElementById("saidaVariavel");
    if (outputElement) {
        outputElement.innerText = "";
    }

    try {
        let pyodide = await loadPyodideAndRun();
        let code = `
                    idade = 25
                    print("Idade inicial:", idade)
                    idade = 26
                    print("Idade atualizada:", idade)
        `;
        await pyodide.runPythonAsync(code);
    } catch (error) {
        console.error("Erro ao executar simularVariavel:", error);
        if (outputElement) {
            outputElement.innerText = "Erro: " + error.message;
        }
    }
}

async function simularOperadores() {
    // Limpa a saída anterior
    let outputElement = document.getElementById("saidaOperadores");
    if (outputElement) {
        outputElement.innerText = "";
    }

    let idade = document.getElementById("idadeInput").value;
    let temCarteira = document.getElementById("carteiraInput").value;

    try {
        let pyodide = await loadPyodideAndRun();
        let code = `
                    idade = ${idade}
                    tem_carteira = ${temCarteira}
                    if idade >= 18 and tem_carteira:
                        print("Pode dirigir!")
                    else:
                        print("Não pode dirigir!")
                        
                    if idade == 20:
                        print("Tem exatamente 20 anos!")
                        
                    if idade < 18 or tem_carteira:
                        print("Pelo menos uma condição é verdadeira!")
        `;
        await pyodide.runPythonAsync(code);
    } catch (error) {
        console.error("Erro ao executar simularOperadores:", error);
        if (outputElement) {
            outputElement.innerText = "Erro: " + error.message;
        }
    }
    
}