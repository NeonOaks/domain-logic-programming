# executorPython.py
import sys

def verificar_par_ou_impar(numero):
    if not isinstance(numero, int) or numero < 1 or numero > 9:
        raise ValueError("Número inválido. Deve ser um inteiro entre 1 e 9.")
    return "Par" if numero % 2 == 0 else "Ímpar"

def simular_erro():
    print("Este é um erro simulado no stderr", file=sys.stderr)
    raise Exception("Erro simulado: divisão por zero")