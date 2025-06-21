// Carrega o Pyodide
let pyodideReady = loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
});

// Função para carregar e executar o código Python externo
async function executarPython() {
    const pyodide = await pyodideReady;

    // Carrega o arquivo Python externo
    try {
        const response = await fetch("executorPython.py");
        if (!response.ok) {
            throw new Error(`Falha ao carregar executorPython.py: ${response.statusText}`);
        }
        const codigoPython = await response.text();
        await pyodide.runPythonAsync(codigoPython);
        console.log("Código Python carregado com sucesso.");
    } catch (err) {
        console.error("Erro ao carregar o código Python:", err);
        alert("Erro ao carregar o código Python!");
        return;
    }
}

// Simulador para stdin/stdout (verifica se o número é par ou ímpar)
async function simulatorStandard() {
    const numeroInput = document.getElementById("numeroInput").value;
    const output = document.getElementById("standard");
    const stderr = document.getElementById("saidaStderr");
    stderr.textContent = ""; // Limpa stderr
    output.textContent = ""; // Limpa stdout antes de executar

    const numero = parseFloat(numeroInput);
    if (isNaN(numero) || !Number.isInteger(numero) || numero < 1 || numero > 9) {
        output.textContent = "Erro: Insira um número inteiro válido entre 1 e 9.";
        return;
    }

    try {
        await executarPython(); // Carrega o código Python

        console.log(`Executando verificar_par_ou_impar(${numero})...`);
        const cmd = `
verificar_par_ou_impar(${numero})
        `;
        const pyodide = await pyodideReady;
        const resultado = await pyodide.runPythonAsync(cmd);
        output.textContent = `Resultado: ${resultado}`;
        console.log("Execução bem-sucedida:", resultado);
    } catch (error) {
        console.error("Erro ao executar simulatorStandard:", error);
        output.textContent = `Erro: ${error.message}`;
    }
}

// Simulador para stderr (simula um erro com stack trace)
async function simulatorStderr() {
    const diaInput = document.getElementById("diaInput").value;
    const output = document.getElementById("saidaStderr");
    const stdout = document.getElementById("standard");
    stdout.textContent = ""; // Limpa stdout
    output.textContent = ""; // Limpa stderr antes de executar

    try {
        await executarPython(); // Carrega o código Python

        console.log("Executando simular_erro...");
        const cmd = `
import sys
try:
    simular_erro()
except Exception as e:
    print(str(e), file=sys.stderr)
    raise
        `;
        const pyodide = await pyodideReady;
        await pyodide.runPythonAsync(cmd);
    } catch (error) {
        console.error("Simulação de stderr capturada:", error);
        output.textContent = `stderr: ${error.message}`;
    }
}

// Função para limpar o simulador de stdin/stdout
function limparNumero() {
    document.getElementById("numeroInput").value = "";
    document.getElementById("standard").textContent = "";
    document.getElementById("saidaStderr").textContent = "";
}

// Função para limpar o simulador de stderr
function limparStderr() {
    document.getElementById("diaInput").value = "";
    document.getElementById("saidaStderr").textContent = "";
    document.getElementById("standard").textContent = "";
}