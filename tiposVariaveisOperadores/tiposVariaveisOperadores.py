class Calculadora:
    def calcular(self, n1, n2, operacao):
        if operacao == '+':
            return n1 + n2
        elif operacao == '-':
            return n1 - n2
        elif operacao == '*':
            return n1 * n2
        elif operacao == '/':
            if n2 == 0:
                return "Erro: Divisão por zero"
            return n1 / n2
        else:
            return "Operação inválida."
        
    def simular_variavel(self):
        saida = ""
        idade = 25
        saida += f"idade = {idade}\n"
        saida += f"print(idade)  # {idade}\n\n"
        idade = 26
        saida += f"idade = {idade}\n"
        saida += f"print(idade)  # {idade}\n"
        return saida
