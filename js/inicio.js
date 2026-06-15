const motos = [
  {
    id: 1,
    ico: '<img src="img/img5.png" style="width:100%;height:100%;object-fit:cover;">',
    marca: 'Kawasaki',
    nom: 'Ninja ZX-10R',
    tipo: 'Deportiva',
    motor: '998cc, 4 cilindros',
    pot: '203 CV',
    torq: '114.9 Nm',
    peso: '207 kg',
    dep: '17 L',
    color: 'Verde / Negro',
    precio: '$18,500'
  },
  {
    id: 2,
    ico: '<img src="img/img6.jpg" style="width:100%;height:100%;object-fit:cover;">',
    marca: 'BMW',
    nom: 'R1250 GS',
    tipo: 'Adventure',
    motor: '1254cc Boxer',
    pot: '136 CV',
    torq: '143 Nm',
    peso: '249 kg',
    dep: '20 L',
    color: 'Blanco / Azul',
    precio: '$22,900'
  },
  {
    id: 3,
    ico: '<img src="img/img7.jpeg" style="width:100%;height:100%;object-fit:cover;">',
    marca: 'Yamaha',
    nom: 'MT-07',
    tipo: 'Naked',
    motor: '689cc',
    pot: '73 CV',
    torq: '68 Nm',
    peso: '184 kg',
    dep: '13 L',
    color: 'Gris / Negro',
    precio: '$9,200'
  },
  {
    id: 4,
    ico: '<img src="img/img8.png" style="width:100%;height:100%;object-fit:cover;">',
    marca: 'KTM',
    nom: 'Duke 390',
    tipo: 'Naked',
    motor: '373cc',
    pot: '44 CV',
    torq: '37 Nm',
    peso: '149 kg',
    dep: '13.4 L',
    color: 'Naranja / Negro',
    precio: '$6,800'
  }
];

document.addEventListener("DOMContentLoaded", function () {

  const modal = new bootstrap.Modal(
    document.getElementById("motoModal")
  );

  const botones = document.querySelectorAll(".btn-ver");

  botones.forEach(function (boton) {

    boton.addEventListener("click", function () {

      const id = parseInt(this.dataset.mid);

      const moto = motos.find(m => m.id === id);

      if (!moto) return;

      document.getElementById("mIco").innerHTML = moto.ico;
      document.getElementById("mMarca").textContent = moto.marca;
      document.getElementById("mNom").textContent = moto.nom;
      document.getElementById("mTipo").textContent = moto.tipo;
      document.getElementById("mMotor").textContent = moto.motor;
      document.getElementById("mPot").textContent = moto.pot;
      document.getElementById("mTorq").textContent = moto.torq;
      document.getElementById("mPeso").textContent = moto.peso;
      document.getElementById("mDep").textContent = moto.dep;
      document.getElementById("mColor").textContent = moto.color;
      document.getElementById("mPrecio").textContent = moto.precio;

      modal.show();

    });

  });

});