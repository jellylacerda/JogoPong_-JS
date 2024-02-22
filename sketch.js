// variaveis da bola
let xbola = 300;
let ybola = 200;
let diametro = 18;
let raio = diametro / 2;


//velocidade da bola
let velocidadeXbola = 6;
let velocidadeYbola = 6;


//variaveis da raquete
let xRaquete1 = 5;
let yRaquete1 = 150;
let wRaquete = 10;
let hRaquete = 90;

//var raquete oponente
let xRaquete2 = 585;
let yRaquete2 = 150;
let velocidadeYRaquete2;

let colidiu = false;

//placar jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
  
}
//caso queira jogar com a mquina
let chanceDeErrar = 0;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  verificaColisaoBorda();
  mostraRaquete(xRaquete1, yRaquete1);
  MovimentaMinhaRaquete1();
  verificaColisaoRaquete(xRaquete1, yRaquete1);
  //coordenadasRaquete2();
  mostraRaquete(xRaquete2, yRaquete2);
  movimenteRaquete2();
  verificaColisaoRaquete(xRaquete2, yRaquete2);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function mostraBola(){
   circle(xbola, ybola, diametro);
}

function movimentaBola(){
   xbola += velocidadeXbola;
   ybola += velocidadeYbola; 
}

function verificaColisaoBorda(){
  
  if(xbola + raio > width || 
    xbola - raio < 0){
    velocidadeXbola *= -1;
 }
  if(ybola + raio > height || 
    ybola - raio <0){
    velocidadeYbola *= -1;
  }
}

function mostraRaquete(x,y){
   rect(x, y, wRaquete, hRaquete);
}

function MovimentaMinhaRaquete1(){
  if(keyIsDown(UP_ARROW)){
    yRaquete1 -= 10;
  } 
  if(keyIsDown(DOWN_ARROW)){
    yRaquete1 += 10;
  }

}

/*function verificaColisaoRaquete(){
  if (xbola - raio < xRaquete1 + wRaquete1){
    velocidadeXbola *= -1;
  }
}*/

function verificaColisaoRaquete() {
    if (xbola - raio < xRaquete1 + wRaquete
        && ybola - raio < yRaquete1 + hRaquete
        && ybola + raio > yRaquete1) {
        velocidadeXbola *= -1;
    }
}

function verificaColisaoRaquete(x,y) {
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xbola, ybola, raio); 
  if (colidiu) {
        velocidadeXbola *= -1;
    raquetada.play();
    }
}

function movimenteRaquete2(){
  // para só um oponente:
  velocidadeYRaquete2 = ybola - yRaquete2 - wRaquete / 2 - 30;
  yRaquete2 += velocidadeYRaquete2 + chanceDeErrar
  calculaChanceDeErrar()

  /*if(keyIsDown(87)){
    yRaquete2 -= 10;
  }
  if(keyIsDown(83)){
    yRaquete2 += 10;
  }*/

}
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(17);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}
function marcaPonto(){
  if(xbola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xbola < 10 ){
    pontosOponente += 1;
     ponto.play();
  }
}
//caso queira joagr com a mquina

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 49){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xbola - raio < 0){
    xbola = 23
    }
}