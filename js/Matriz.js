Matriz.prototype.constructor = Matriz;

function Matriz(_tamanho, _canvas, _pequena){
	/* **********************************  Propriedades ************************************** */

	// Tamanho da matriz (ela sempre sera' quadrada)
	this.tamanho = _tamanho;
	
	// Array contendo a matriz em si
	this.mat = new Array(_tamanho);
	
	// Se for desenhar mais de uma matriz em um mesmo contexto, ela deve ser pequena
	this.pequena = _pequena;
	
	if (_canvas) {
		// Guarda o objeto do canvas para usar as propriedades 'offsetLeft', 'offsetTop', etc
		this.canvas = _canvas;
		
		// Contexto do canvas (necessario para desenhar)
		this.contexto = _canvas.getContext("2d");
		this.contexto.fillStyle = "black";
	}
	
	// Tamanho do lado do quadrado de cada celula da matriz
	if (!this.pequena) {
		this.tamanhoPixels = 90;
		
		this.contexto.font = "36px Tahoma";
	} else {
		this.tamanhoPixels = 40;
		
		this.contexto.font = "22px Tahoma";
	}
	
	/* **********************************  Métodos ************************************** */
	
	// Cria a matriz em si e a inicializa com 0
	this.inicializar = function() {
		for (var k = 0; k < this.tamanho; k++) {
			this.mat[k] = new Array(this.tamanho);
		}
		
		var cont = 1;
		var contIndice = 1;
		var celulaMeio = Math.floor(this.tamanho/2);
		
		for (var k = 0; k < this.tamanho; k++) {
			for (var j = 0; j < this.tamanho; j++) {
				if (k == celulaMeio && j == celulaMeio) {
					this.mat[k][j] = new Celula(0, this.tamanhoPixels, contIndice, this.pequena);
				} else {
					this.mat[k][j] = new Celula(cont, this.tamanhoPixels, contIndice, this.pequena);
					cont++;
				}
				
				contIndice++;
			}
		}
	}
	
	/* *********************************************************************************** */

	// Desenha os traços da matriz no canvas de destino
	this.desenhar = function() {
		if (!this.pequena) {
			this.contexto.clearRect(0, 0, 425, 300);
		}
		
		for (var i = 0; i < this.tamanho; i++) {
			for (var k = 0; k < this.tamanho; k++) {
				// Desenha a celula da matriz
				
				this.mat[i][k].desenhar(this.contexto, i, k);
				
			}
		}
	}
	
	this.desenharPequena = function(_indice, _cor, _heuristica, _custo) {
		var offsetX;
		var offsetY;
	
		for (var i = 0; i < this.tamanho; i++) {
			for (var k = 0; k < this.tamanho; k++) {
				// Desenha a celula da matriz
				
				this.mat[i][k].desenharPequena(this.contexto, i, k, _indice, _cor, _heuristica, _custo);
				
			}
		}
		
		if (_indice % 2 != 0) {
			offsetX = this.tamanhoPixels*3 + 120;
		} else {
			offsetX = 40;
		}
		
		if (_indice > 1) {
			offsetY = this.tamanhoPixels*3 + 165;
		} else {
			offsetY = this.tamanhoPixels*3;
		}
		
		this.contexto.fillText("F = " + _heuristica + " + " + _custo, offsetX + (this.tamanhoPixels), offsetY + (this.tamanhoPixels));
	}
	
	/* *********************************************************************************** */
	
	// Define a matriz interna a partir de uma outra já existente
	this.setMatrizInterna = function(_novaMatriz) {
	
		for (var i = 0; i < this.tamanho; i++) {
			for (var j = 0; j < this.tamanho; j++) {
				if (_novaMatriz[i][j].valor) {
					this.mat[i][j].valor = _novaMatriz[i][j].valor;
				} else {
					this.mat[i][j].valor = _novaMatriz[i][j];
				}
			}
		}
	}
	
	/* *********************************************************************************** */
	
	// Detecta qual celula foi clicada
	// Os parametros posX e posY se referem as coordenadas do clique referentes ao documento
	this.tratarClick = function(posX, posY) {
	
		// Assim adquire-se as coordenadas relativas ao canvas
		var xRelativoCanvas = posX-this.canvas.offsetLeft;
		var yRelativoCanvas = posY-this.canvas.offsetTop;
		
		// Primeira linha
		if (yRelativoCanvas < 106 && yRelativoCanvas > 16) {
			this.defineCelulaClicada(0, xRelativoCanvas);
		} else if (yRelativoCanvas < 196 && yRelativoCanvas > 107) {
			// Segunda linha
			
			this.defineCelulaClicada(1, xRelativoCanvas);
		} else if (yRelativoCanvas < 287 && yRelativoCanvas > 196) {
			// Terceira linha
			
			this.defineCelulaClicada(2, xRelativoCanvas);
		}
		
		this.desenhar();
	}
	
	// Funcao interna auxiliar
	this.defineCelulaClicada = function(_linha, xRelativoCanvas){
		if (xRelativoCanvas > 80 && xRelativoCanvas < 170) {
			// Primeira coluna
			this.buscaEInverteValor(_linha, 0);
		} else if (xRelativoCanvas > 170 && xRelativoCanvas < 260) {
			// Segunda coluna
			this.buscaEInverteValor(_linha, 1);
		} else if (xRelativoCanvas > 260 && xRelativoCanvas < 350) {
			// Terceira coluna
			this.buscaEInverteValor(_linha, 2);
		}
	}
	
	this.buscaEInverteValor = function(_linha, _coluna) {
		var valorNovo = parseInt(window.prompt("Novo valor", ""));
		var valorAntigo = this.mat[_linha][_coluna].valor;
		
		if (valorNovo > 8 || valorNovo < 0 || valorNovo == valorAntigo || isNaN(valorNovo)) {
			return false;
		}
		
		for (var i = 0; i < this.tamanho; i++) {
			for (var j = 0; j < this.tamanho; j++) {
				if (this.mat[i][j].valor == valorNovo) {
					this.mat[i][j].valor = valorAntigo;
					
					break;
				}
			}
		}
		
		this.mat[_linha][_coluna].valor = valorNovo;
	}
	
	// Inicializa a matriz assim que o objeto é instanciado
	this.inicializar();
}