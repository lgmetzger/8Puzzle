Matriz.prototype.constructor = Matriz;

function Matriz(_tamanho, _canvas){
	/* **********************************  Propriedades ************************************** */

	// Tamanho da matriz (ela sempre sera' quadrada)
	this.tamanho = _tamanho;
	
	// Array contendo a matriz em si
	this.mat = new Array(_tamanho);
	
	// Guarda o objeto do canvas para usar as propriedades 'offsetLeft', 'offsetTop', etc
	this.canvas = _canvas;
	
	// Contexto do canvas (necessario para desenhar)
	this.contexto = _canvas.getContext("2d");
	this.contexto.font = "36px Tahoma";
	this.contexto.fillStyle = "black";
	
	// Tamanho do lado do quadrado de cada celula da matriz
	this.tamanhoPixels = 90;
	
	/* **********************************  Métodos ************************************** */
	
	// Cria a matriz em si e a inicializa com 0
	this.inicializar = function() {
		for (var k = 0; k < this.tamanho; k++) {
			this.mat[k] = new Array(this.tamanho);
		}
		
		var cont = 1;
		var celulaMeio = Math.floor(this.tamanho/2);
		for (var k = 0; k < this.tamanho; k++) {
			for (var j = 0; j < this.tamanho; j++) {
				if (k == celulaMeio && j == celulaMeio) {
					this.mat[k][j] = 0;
				} else {
					this.mat[k][j] = cont;
					cont++;
				}
			}
		}
	}
	
	/* *********************************************************************************** */

	// Desenha os traços da matriz no canvas de destino
	this.desenhar = function() {
		
		for (var i = 0; i < this.tamanho; i++) {
			for (var k = 0; k < this.tamanho; k++) {
				// Desenha a celula da matriz
				// TODO: pode ser uma boa ideia criar um objeto Celula e instancia-lo aqui para cada celula da matriz
				// TODO: essa funcao pode ter um parametro BOOL, para dizer se deve desenhar as celulas ou nao. Caso NAO, desenha somente os numeros (para atualiza-los)
				this.contexto.beginPath();
				this.contexto.rect(80 + (k*this.tamanhoPixels), 15 + (i*this.tamanhoPixels), this.tamanhoPixels, this.tamanhoPixels);
				this.contexto.lineWidth = 5;
				this.contexto.strokeStyle = "black";
				this.contexto.stroke();
				
				// Desenha o numero dentro da celula
				this.contexto.fillText(this.mat[i][k], 120 + (k*this.tamanhoPixels), 70 + (i*this.tamanhoPixels));
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
		
		for (var i = 0; i < this.tamanho; i++) {
			for (var k = 0; k < this.tamanho; k++) {
				if (xRelativoCanvas > (80 + (k*this.tamanhoPixels))) {
					alert("dentro x");
				}
			}
		}
		
	}
	
	// Inicializa a matriz assim que o objeto é instanciado
	this.inicializar();
}