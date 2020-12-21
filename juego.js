const btnEmpezar = document.getElementById("btnEmpezar");
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const ULTIMO_NIVEL = 1;

class Juego {
  constructor() {
    this.inicializar();
    setTimeout(() => {
      this.generarSecuencia();
      this.siguienteNivel();
    }, 800);
  }
  inicializar = () => {
    this.elegirColor.bind(this);
    this.toggleBtnEmpezar()
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  };

  toggleBtnEmpezar = () => {
      btnEmpezar.classList.contains('hide') ? btnEmpezar.classList.remove("hide") : btnEmpezar.classList.add("hide")
  }

  generarSecuencia = () => {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((index) => Math.floor(Math.random() * 4));
  };

  siguienteNivel = () => {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarClick();
  };

  transformarNumeroAColor = (numero) => {
    //return colores.get(numero)
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  };

  iluminarSecuencia = () => {
    for (let i = 0; i < this.nivel; i++) {
      let color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 500 * i);
    }
  };

  iluminarColor = (color) => {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  };

  apagarColor = (color) => {
    this.colores[color].classList.remove("light");
  };

  agregarClick = () => {
    /*Si no usamos el bind, el event listener toma como padre al this.colores, y no al juego*/
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  };
  eliminarClick = () => {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
  };

  elegirColor = (ev) => {
    const colorEvento = ev.target.dataset.color;
    const colorSecuencia = this.transformarNumeroAColor(
      this.secuencia[this.subnivel]
    );
    this.iluminarColor(colorEvento);
    if (colorEvento === colorSecuencia) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarClick();
        //swal("Avanzaste");
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.gano(
            "Ganador",
            "Felicitaciones! Ganaste el juego.",
            "success",
            "Avanzar"
          );
        } else {
          setTimeout(this.siguienteNivel, 1000);
        }
      }
    } else {
      this.perdio("Perdedor", "Lo siento! Perdiste :(", "error", "Continuar"); //Perdio
    }
  };

  gano = (title, text, icon, button) => {
    swal({ title, text, icon, button }).then(this.inicializar);
  };
  perdio = (title, text, icon, button) => {
    swal({ title, text, icon, button }).then(() => {
      this.eliminarClick();
      this.inicializar();
    });
  };
}
empezarJuego = () => {
  var juego = new Juego();
};
