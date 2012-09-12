Celula.prototype.constructor = Celula;

function Celula(_valor, _tamanhoPixels, _indice, _pequena) {
	
	// Indice da celula dentro da matriz (nao sera alterado)
	// Precisa pensar em um jeito melhor de fazer, de modo que a propria classe controle quantos objetos ja foram criados
	this.indice = _indice;
	
	// Valor guardado na celula (pode ser alterado)
	this.valor = _valor;
	
	this.tamanhoPixels = _tamanhoPixels;
	
	this.pequena = _pequena;
	
	// Cor de fundo da celula
	this.corDeFundo = "green";
	
	this.desenhar = function(_contexto, _i, _k) {
		var offsetTextoX = 120;
		var offsetTextoY = 70;
		var offsetMatrizX;
		var offsetMatrizY;
		var margemEsquerdaCelula = 80;
		var margemSuperiorCelula = 15;
	
		_contexto.beginPath();
		_contexto.rect(80 + (_k*this.tamanhoPixels), 15 + (_i*this.tamanhoPixels), this.tamanhoPixels, this.tamanhoPixels);
		_contexto.lineWidth = 3;
		_contexto.strokeStyle = "black";
		_contexto.stroke();
		
		// Desenha o numero dentro da celula
		_contexto.fillStyle = "black";
		_contexto.fillText(this.valor == 0 ? '' : this.valor, offsetTextoX + (_k*this.tamanhoPixels), offsetTextoY + (_i*this.tamanhoPixels));
	}
	
	this.desenharPequena = function(_contexto, _i, _k, _indice, _cor) {
		var offsetTextoX = 95;
		var offsetTextoY = 45;
		var offsetMatrizX;
		var offsetMatrizY;
		var margemEsquerdaCelula = 80;
		var margemSuperiorCelula = 15;
		
		if (_indice % 2 != 0) {
			offsetMatrizX = this.tamanhoPixels*3 + margemEsquerdaCelula;
		} else {
			offsetMatrizX = 0;
		}
		
		if (_indice > 1) {
			offsetMatrizY = this.tamanhoPixels*3 + margemSuperiorCelula*3;
		} else {
			offsetMatrizY = 0;
		}
	
		_contexto.beginPath();
		_contexto.rect(margemEsquerdaCelula + offsetMatrizX + (_k*this.tamanhoPixels), margemSuperiorCelula + offsetMatrizY + (_i*this.tamanhoPixels), this.tamanhoPixels, this.tamanhoPixels);
		_contexto.lineWidth = 3;
		_contexto.strokeStyle = "black";
		_contexto.stroke();
		
		// Desenha o numero dentro da celula
		if (_cor) {
			_contexto.fillStyle = _cor;
		} else {
			_contexto.fillStyle = "black";
		}
		_contexto.fillText(this.valor == 0 ? '' : this.valor, offsetTextoX + offsetMatrizX + (_k*this.tamanhoPixels), offsetTextoY + offsetMatrizY + (_i*this.tamanhoPixels));
	}
}