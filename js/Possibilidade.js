Possibilidade.prototype.constructor = Possibilidade;

function Possibilidade(_matrizAuxiliar, _i, _j, _linha, _coluna) {
	
	this.linha1 = _i;
	this.coluna1 = _j;
	this.linha = _linha;
	this.coluna = _coluna;
	this.matrizAuxiliar = _matrizAuxiliar;
	
	this.setMatrizParaComparacao = function() {
		this.mat = new Matriz(3, false);
		
		this.mat.setMatrizInterna(_matrizAuxiliar);
	
		/*this.mat = new Array(_matrizAuxiliar.length);
		
		for (var i = 0; i < _matrizAuxiliar.length; i++) {
			this.mat[i] = new Array(_matrizAuxiliar.length);
		}
		
		for (var i = 0; i < _matrizAuxiliar.length; i++) {
			for (var j = 0; j < _matrizAuxiliar.length; j++) {
				this.mat[i][j] = _matrizAuxiliar[i][j].valor;
			}
		}*/
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
	
	//this.total = this.heuristica() + custo + 1;
	this.total = this.heuristica() + custo;
	this.setMatrizParaComparacao();
	
	//alert("total da possibilidade: " + this.total);
	
}