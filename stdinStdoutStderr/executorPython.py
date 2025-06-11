from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/executar', methods=['POST'])
def executar():
    try:
        data = request.get_json()
        entrada = data.get('numero')

        # Validação do número
        try:
            numero = int(entrada)
        except (ValueError, TypeError):
            return jsonify({"error": "Texto não é permitido, somente número."}), 400

        if numero < 1 or numero > 9:
            return jsonify({"error": "Número fora do intervalo permitido (1-9)."}), 400

        # Verifica se é par ou ímpar
        if numero % 2 == 0:
            return f"{numero} é Par"
        else:
            return f"{numero} é Ímpar"
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)