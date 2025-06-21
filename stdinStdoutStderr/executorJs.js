// Inicializa o Pyodide com a versão especificada
let pyodideReady = loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
});

// Função para carregar o Pyodide e o módulo executor.py
async function carregarPythonExterno() {
    console.log("Carregando Pyodide...");
    let pyodide;
    try {
        pyodide = await pyodideReady;
        console.log("Pyodide carregado com sucesso.");
    } catch (error) {
        console.error("Erro ao carregar Pyodide:", error);
        throw new Error("Falha ao inicializar o Pyodide");
    }

    // Verifica se o sistema de arquivos está disponível
    if (!pyodide.FS) {
        console.error("Sistema de arquivos do Pyodide (FS) não está disponível");
        throw new Error("Sistema de arquivos do Pyodide não inicializado");
    }

    console.log("Buscando executor.py...");
    try {
        const response = await fetch("http://localhost:5000/executor.py");
        if (!response.ok) {
            throw new Error(`Falha ao carregar executor.py: ${response.statusText}`);
        }
        const pythonScript = await response.text();
        console.log("executor.py carregado com sucesso:", pythonScript);

        console.log("Gravando executor.py no FS do Pyodide...");
        pyodide.FS.writeFile("/executor.py", pythonScript);
        console.log("executor.py gravado com sucesso.");

        console.log("Importando módulo executor...");
        await pyodide.runPythonAsync(`
import sys
sys.path.append('/')
import executor
        `);
        console.log("Módulo executor importado com sucesso.");
    } catch (error) {
        console.error("Erro em carregarPythonExterno:", error);
        throw error;
    }
}

// Simulador para stdin/stdout (verifica se o número é par ou ímpar)
async function simulatorStandard() {
    const numeroInput = document.getElementById("numeroInput").value;
    const output = document.getElementById("standard");
    const stderr = document.getElementById("saidaStderr");
    stderr.textContent = ""; // Limpa stderr
    output.textContent = ""; // Limpa stdout antes de executar

    const numero = parseInt(numeroInput);
    if (isNaN(numero) || numero < 1 || numero > 9) {
        output.textContent = "Erro: Insira um número válido entre 1 e 9.";
        return;
    }

    try {
        await carregarPythonExterno();

        console.log(`Executando verificar_par_ou_impar(${numero})...`);
        const cmd = `
from executor import verificar_par_ou_impar
verificar_par_ou_impar(${numero})
        `;
        const pyodide = await pyodideReady;
        const resultado = await pyodide.runPythonAsync(cmd);
        output.textContent = resultado;
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
        await carregarPythonExterno();

        console.log("Executando simular_erro...");
        const cmd = `
import sys
from executor import simular_erro
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