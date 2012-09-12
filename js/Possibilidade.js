Possibilidade.prototype.constructor = Possibilidade;

function Possibilidade(_matrizAuxiliar, _i, _j, _linha, _coluna) {
	
	this.linha1 = _i;
	this.coluna1 = _j;
	this.linha = _linha;
	this.coluna = _coluna;
	this.matrizAuxiliar = _matrizAuxiliar;
	
	Possibilidade.quantidade++;
	
	this.setMatrizParaComparacao = function() {
		this.mat = new Matriz(3, document.getElementById("canv_exec"), true);
		
		this.mat.setMatrizInterna(_matrizAuxiliar);
	}
	
	this.desenhar = function(_indice, _cor) {
		this.mat.desenharPequena(_indice, _cor, this.valorHeuristica, custo + 1);
	}
	
	this.heuristica = function () {
		var heuristica = 0;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if ((this.matrizAuxiliar[i][j] != matrizFinal.mat[i][j].valor) && matrizFinal.mat[i][j].valor != 0) {
					heuristica++;
				}
			}
		}
		
		return heuristica;
	}
	
	this.valorHeuristica = this.heuristica();
	this.total = this.valorHeuristica + custo + 1;
	this.setMatrizParaComparacao();
	
}

// Variavel estatica
Possibilidade.quantidade = 0;