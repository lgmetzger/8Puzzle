function inicio(){
	matrizInicial = new Matriz(3, document.getElementById("canv_inicial"));
	matrizFinal = new Matriz(3, document.getElementById("canv_final"));
	matrizPrincipal	= new Matriz(3, document.getElementById("canv_main"));
	
	matrizInicial.desenhar();
	matrizFinal.desenhar();
	matrizPrincipal.desenhar();
	
	
	// Variáveis globais que não são as matrizes principais
	matrizAuxiliar = new Array(3);
	//possibilidades;
	custo = 0;	// custo = G
	heuristica = 0; // heuristica = H
	
	window.addEventListener("click", clicou, false);
}

function clicou(e){
	var canvasClicado = e.target.id;
	var posX = e.clientX;
	var posY = e.clientY;
	
	if (canvasClicado == "canv_inicial") {
		matrizInicial.tratarClick(posX, posY);
	} else if (canvasClicado == "canv_final") {
		matrizFinal.tratarClick(posX, posY);
	}
}

function executar() {
	matrizPrincipal.mat = matrizInicial.mat;
	matrizPrincipal.desenhar();
	
	for (var i = 0; i < 3; i++) {
		matrizAuxiliar[i] = new Array(3);
	}
	
	matrizAuxiliar = matrizPrincipal.mat;
	
	// A partir da configuracao atual, calcular o F de todas as possibilidades
	
	// Enquanto matrizPrincipal != matrizFinal ...
	while (!comparaMatrizes(matrizPrincipal.mat, matrizFinal.mat)) {
		for (var i = 0; i < matrizPrincipal.tamanho; i++) {
			for (var j = 0; j < matrizPrincipal.tamanho; j++) {
				if (matrizPrincipal.mat[i][j].valor == 0) {
					// Calcula as possibilidades
					// F = G + H
					if (i == 1 && j == 1) {
						// Se estiver no meio, tem 4 possibilidades
						
						// Ordem: cima, direita, baixo, esquerda
						possibilidades = new Array();
						var custoAnterior = custo;
						
						// ao invés de fazer essa ladainha toda e repeti-la toda santa vez, fazer uma funçaozinha, passando a matrizAuxiliar, custo, i, j
						
						for (var k = 0; k < 4; k++) {
							
							var possibilidadeObj;
							
							if (k == 0) {
								matrizAuxiliar[i][j] = matrizAuxiliar[0][1];
								matrizAuxiliar[0][1] = 0;
								
								possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 0, 1 );
							} else if (k == 1) {
								matrizAuxiliar[i][j] = matrizAuxiliar[1][2];
								matrizAuxiliar[1][2] = 0;
								
								possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 2 );
							} else if (k == 2) {
								matrizAuxiliar[i][j] = matrizAuxiliar[2][1];
								matrizAuxiliar[2][1] = 0;
								
								possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 2, 1 );
							} else if (k == 3) {
								matrizAuxiliar[i][j] = matrizAuxiliar[1][0];
								matrizAuxiliar[1][0] = 0;
								
								possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 0 );
							}
							
							possibilidades.push( possibilidadeObj );
							matrizAuxiliar = matrizPrincipal.mat;
						}
						
					} else if ((i == 0 && j == 0) || (i == 0 && j == 2) || (i == 2 && j == 0) || (i == 2 && j == 2)) {
						// Se estiver no canto, tem 2 possibilidades
						
						// Ordem: cima, direita, baixo, esquerda
						possibilidades = new Array();
						var custoAnterior = custo;
						
						if (i == 0 && j == 0) {
							for (var k = 0; k < 2; k++) {
								var possibilidadeObj;
								
								// muda de lugar
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[0][1];
									matrizAuxiliar[0][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 0, 1 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][0];
									matrizAuxiliar[1][0] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 0 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							
							}
						} else if (i == 0 && j == 2) {
							for (var k = 0; k < 2; k++) {
								var possibilidadeObj;
								
								// muda de lugar
								// 0,1 | 1,2 | 2,1 | 1,0
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[0][1];
									matrizAuxiliar[0][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 0, 1 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][2];
									matrizAuxiliar[1][2] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 2 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							
							}
						} else if (i == 2 && j == 0) {
							for (var k = 0; k < 2; k++) {
								var possibilidadeObj;
								
								// muda de lugar
								// 0,1 | 1,2 | 2,1 | 1,0
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][0];
									matrizAuxiliar[1][0] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 0 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[2][1];
									matrizAuxiliar[2][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 2, 1 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							
							}
						} else if (i == 2 && j == 2) {
							for (var k = 0; k < 2; k++) {
								var possibilidadeObj;
								
								// muda de lugar
								// 0,1 | 1,2 | 2,1 | 1,0
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][2];
									matrizAuxiliar[1][2] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 2 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[2][1];
									matrizAuxiliar[2][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 2, 1 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							
							}
						}
					} else {
						// Senao, tem 3 possibilidades
						
						// Ordem: cima, direita, baixo, esquerda
						possibilidades = new Array();
						
						if (i == 0 && j == 1) {
							for (var k = 0; k < 3; k++) {
								var possibilidadeObj;
							
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[0][0];
									matrizAuxiliar[0][0] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 0, 0 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[0][1];
									matrizAuxiliar[0][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 0, 1 );
								} else if (k == 2) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][1];
									matrizAuxiliar[1][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 1 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							}
						} else if (i == 1 && j == 2) {
							for (var k = 0; k < 3; k++) {
								var possibilidadeObj;
								
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[0][2];
									matrizAuxiliar[0][2] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 2 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][1];
									matrizAuxiliar[1][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 1 );
								} else if (k == 2) {
									matrizAuxiliar[i][j] = matrizAuxiliar[2][2];
									matrizAuxiliar[2][2] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 2, 2 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							}
						} else if (i == 2 && j == 1) {
							for (var k = 0; k < 3; k++) {
								var possibilidadeObj;
								
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][1];
									matrizAuxiliar[1][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 1 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[2][2];
									matrizAuxiliar[2][2] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 2, 2 );
								} else if (k == 2) {
									matrizAuxiliar[i][j] = matrizAuxiliar[2][0];
									matrizAuxiliar[2][0] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 2, 0 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							}
						} else if (i == 1 && j == 0) {
							for (var k = 0; k < 3; k++) {
								var possibilidadeObj;
								
								if (k == 0) {
									matrizAuxiliar[i][j] = matrizAuxiliar[0][0];
									matrizAuxiliar[0][0] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 0, 0 );
								} else if (k == 1) {
									matrizAuxiliar[i][j] = matrizAuxiliar[1][1];
									matrizAuxiliar[1][1] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 1, 1 );
								} else if (k == 2) {
									matrizAuxiliar[i][j] = matrizAuxiliar[2][0];
									matrizAuxiliar[2][0] = 0;
									
									possibilidadeObj = new Possibilidade( matrizAuxiliar, i, j, 2, 0 );
								}
								
								possibilidades.push( possibilidadeObj );
								matrizAuxiliar = matrizPrincipal.mat;
							}
						}
					}
					
					
					// passa o array de possibilidades pra ver qual a melhor e atualiza a matriz principal
					verificaEAplicaMelhorPossibilidade();
					custo++;
					matrizAuxiliar = matrizPrincipal.mat;
					i = 0;
					j = 0;
				}
			}
		}
	}
	
	matrizPrincipal.desenhar();
	alert(matrizPrincipal.mat);
}

/*function calculaHeuristica(_matrizAuxiliar){
	var cont = 0;

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (_matrizAuxiliar[i][j] != matrizFinal.mat[i][j].valor) {
				cont++;
			}
		}
	}
	
	return cont;
}*/

function verificaEAplicaMelhorPossibilidade() {
	var menor = possibilidades[0].total;
	var cont = 0;
	var indice = 0;
	
	for (var i = 0; i < possibilidades.length; i++) {
		if (menor > possibilidades[i].total) {
			menor = possibilidades[i].total;
			indice = i;
			cont = 1;
		} else if (menor == possibilidades[i].total) {
			cont++;
		}
	}
	
	// pega essa buxa haha
	matrizPrincipal.mat[possibilidades[indice].i][possibilidades[indice].j].valor = matrizPrincipal.mat[possibilidades[indice].linha][possibilidades[indice].coluna].valor;
}

function comparaMatrizes(_matriz1, _matriz2) {
	var tamanho = _matriz1.length;

	for (var i = 0; i < tamanho; i++) {
		for (var j = 0; j < tamanho; j++) {
			if (_matriz1[i][j].valor != _matriz2[i][j].valor) {
				return false;
			}
		}
	}
	
	return true;
}


/*function trataPossibilidade() {
	

	// calcula
	heuristica = calculaHeuristica(matrizAuxiliar);
	custo++;
	
	// grava no array
	possibilidades.push( heuristica + custo );
	
	// reseta a matriz auxiliar
	matrizAuxiliar = matrizPrincipal.mat;
	
	custo = custoAnterior;
}*/


window.addEventListener("load", inicio, false);