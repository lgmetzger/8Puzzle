Celula.prototype.constructor = Celula;

function Celula(_valor, _tamanhoPixels, _indice) {
	
	// Indice da celula dentro da matriz (nao sera alterado)
	// Precisa pensar em um jeito melhor de fazer, de modo que a propria classe controle quantos objetos ja foram criados
	this.indice = _indice;
	
	// Valor guardado na celula (pode ser alterado)
	this.valor = _valor;
	
	this.tamanhoPixels = _tamanhoPixels;
	
	// Cor de fundo da celula
	this.corDeFundo = "green";
	
	this.desenhar = function(_contexto, _i, _k) {
		_contexto.beginPath();
		_contexto.rect(80 + (_k*this.tamanhoPixels), 15 + (_i*this.tamanhoPixels), this.tamanhoPixels, this.tamanhoPixels);
		_contexto.lineWidth = 3;
		_contexto.strokeStyle = "black";
		_contexto.stroke();
		
		// Desenha o numero dentro da celula
		_contexto.fillStyle = "black";
		_contexto.fillText(this.valor == 0 ? '' : this.valor, 120 + (_k*this.tamanhoPixels), 70 + (_i*this.tamanhoPixels));
	}
}