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