// Carrega o Pyodide
let pyodideReady = loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
});

async function simulatorStandard() {
    const numeroInput = document.getElementById("numeroInput").value;
    const output = document.getElementById("standard");

    // Validação do input
    const numero = parseInt(numeroInput);
    if (isNaN(numero) || numero < 1 || numero > 9) {
        output.textContent = "Erro: Insira um número válido entre 1 e 9.";
        return;
    }

    try {
        // Aguarda o Pyodide carregar
        let pyodide = await pyodideReady;

        // Código Python a ser executado
        const pythonCode = `
def verificar_par_ou_impar(numero):
    if numero % 2 == 0:
        return f"{numero} é Par"
    else:
        return f"{numero} é Ímpar"

verificar_par_ou_impar(${numero})
        `;

        // Executa o código Python e obtém o resultado
        const resultado = await pyodide.runPythonAsync(pythonCode);
        output.textContent = resultado;
    } catch (error) {
        console.error("Erro ao executar o código Python:", error);
        output.textContent = "Erro: " + error.message;
    }
}

function limparNumero() {
    document.getElementById("numeroInput").value = "";
    document.getElementById("standard").textContent = "";
}