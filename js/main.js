function inicio(){
	matrizInicial = new Matriz(3, document.getElementById("canv_inicial"));
	matrizFinal = new Matriz(3, document.getElementById("canv_final"));
	matrizPrincipal	= new Matriz(3, document.getElementById("canv_main"));
	
	matrizInicial.desenhar();
	matrizFinal.desenhar();
	matrizPrincipal.desenhar();
	
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
	} else if (canvasClicado == "canv_main") {
		matrizPrincipal.tratarClick(posX, posY);
	}
}

window.addEventListener("load", inicio, false);