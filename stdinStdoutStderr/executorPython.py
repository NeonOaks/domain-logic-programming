from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sys
import traceback
import os

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir requisições do navegador

# Rota para servir o arquivo executor.py
@app.route('/executor.py')
def serve_executor():
    try:
        # Assume que executor.py está na mesma pasta do app.py
        file_path = os.path.join(os.getcwd(), 'executor.py')
        if not os.path.exists(file_path):
            return jsonify({"stderr": "Arquivo executor.py não encontrado"}), 404
        return send_from_directory(os.getcwd(), 'executor.py')
    except Exception as e:
        return jsonify({"stderr": f"Erro ao servir executor.py: {str(e)}"}), 500

# Rota para verificar se um número é par ou ímpar
@app.route('/executar', methods=['POST'])
def executar():
    try:
        data = request.get_json()
        if not data or 'numero' not in data:
            return jsonify({"stderr": "Nenhum número fornecido"}), 400

        numero = int(data.get('numero'))
        if numero < 1 or numero > 9:
            return jsonify({"stderr": "Número fora do intervalo permitido (1-9)."}), 400

        if numero % 2 == 0:
            return jsonify({"stdout": f"{numero} é Par"})
        else:
            return jsonify({"stdout": f"{numero} é Ímpar"})
    except ValueError:
        return jsonify({"stderr": "Número inválido. Deve ser um valor inteiro."}), 400
    except Exception as e:
        return jsonify({"stderr": f"Erro: {str(e)}"}), 400

# Rota para simular um erro com stack trace
@app.route('/simular-erro', methods=['GET'])
def simular_erro():
    try:
        print("Este é um erro simulado no stderr", file=sys.stderr)
        1 / 0  # Erro proposital (divisão por zero)
    except Exception:
        erro_traceback = traceback.format_exc()
        return jsonify({"stderr": erro_traceback}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)