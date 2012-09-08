Matriz.prototype.constructor = Matriz;

function Celula(_valor, _tamanhoPixels, _indice) {
	
	// Indice da celula dentro da matriz (nao sera alterado)
	// Precisa pensar em um jeito melhor de fazer, de modo que a propria classe controle quantos objetos ja foram criados
	this.indice = _indice;
	
	// Valor guardado na celula (pode ser alterado)
	this.valor = _valor;
	
	this.tamanhoPixels = _tamanhoPixels;
	
	this.desenhar = function() {
		
	}
}