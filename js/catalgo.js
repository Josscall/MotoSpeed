const motos = [
  {
    nom: "Ninja ZX-10R",
    marca: "Kawasaki",
    tipo: "Deportiva",
    motor: "998cc",
    pot: "203 CV",
    potN: 203,
    peso: "207 kg",
    pesoN: 207,
    precio: "$18500",
    precioN: 18500,
    img: "../img/img2.jpg",
  },

  {
    nom: "R1250 GS",
    marca: "BMW",
    tipo: "Adventure",
    motor: "1254cc",
    pot: "136 CV",
    potN: 136,
    peso: "249 kg",
    pesoN: 249,
    precio: "$22900",
    precioN: 22900,
    img: "../img/img3.jpg",
  },

  {
    nom: "MT-07",
    marca: "Yamaha",
    tipo: "Naked",
    motor: "689cc",
    pot: "73 CV",
    potN: 73,
    peso: "184 kg",
    pesoN: 184,
    precio: "$9200",
    precioN: 9200,
    img: "../img/img8.png",
  },

  {
    nom: "CB500F",
    marca: "Honda",
    tipo: "Urbana",
    motor: "471cc",
    pot: "47 CV",
    potN: 47,
    peso: "189 kg",
    pesoN: 189,
    precio: "$7500",
    precioN: 7500,
    img: "../img/img5.png",
  },

  {
    nom: "Panigale V4",
    marca: "Ducati",
    tipo: "Deportiva",
    motor: "1103cc",
    pot: "214 CV",
    potN: 214,
    peso: "175 kg",
    pesoN: 175,
    precio: "$32000",
    precioN: 32000,
    img: "../img/img6.jpg",
  },

  {
    nom: "Z900",
    marca: "Kawasaki",
    tipo: "Naked",
    motor: "948cc",
    pot: "125 CV",
    potN: 125,
    peso: "193 kg",
    pesoN: 193,
    precio: "$10500",
    precioN: 10500,
    img: "../img/img7.jpg",
  },
    {
    nom: "Ninja ZX-10R",
    marca: "Kawasaki",
    tipo: "Deportiva",
    motor: "998cc",
    pot: "203 CV",
    potN: 203,
    peso: "207 kg",
    pesoN: 207,
    precio: "$18500",
    precioN: 18500,
    img: "../img/img2.jpg",
  },

  {
    nom: "R1250 GS",
    marca: "BMW",
    tipo: "Adventure",
    motor: "1254cc",
    pot: "136 CV",
    potN: 136,
    peso: "249 kg",
    pesoN: 249,
    precio: "$22900",
    precioN: 22900,
    img: "../img/img3.jpg",
  },

  {
    nom: "MT-07",
    marca: "Yamaha",
    tipo: "Naked",
    motor: "689cc",
    pot: "73 CV",
    potN: 73,
    peso: "184 kg",
    pesoN: 184,
    precio: "$9200",
    precioN: 9200,
    img: "../img/img8.png",
  },

  {
    nom: "CB500F",
    marca: "Honda",
    tipo: "Urbana",
    motor: "471cc",
    pot: "47 CV",
    potN: 47,
    peso: "189 kg",
    pesoN: 189,
    precio: "$7500",
    precioN: 7500,
    img: "../img/img5.png",
  },

  {
    nom: "Panigale V4",
    marca: "Ducati",
    tipo: "Deportiva",
    motor: "1103cc",
    pot: "214 CV",
    potN: 214,
    peso: "175 kg",
    pesoN: 175,
    precio: "$32000",
    precioN: 32000,
    img: "../img/img6.jpg",
  },

  {
    nom: "Z900",
    marca: "Kawasaki",
    tipo: "Naked",
    motor: "948cc",
    pot: "125 CV",
    potN: 125,
    peso: "193 kg",
    pesoN: 193,
    precio: "$10500",
    precioN: 10500,
    img: "../img/img7.jpg",
  },
];

let filterCat = "";
let searchQ = "";
let sortCol = "";
let sortAsc = true;

function filtered() {
  return motos
    .filter((m) => {
      const matchQ =
        !searchQ ||
        m.nom.toLowerCase().includes(searchQ) ||
        m.marca.toLowerCase().includes(searchQ);

      const matchCat = !filterCat || m.tipo === filterCat;

      return matchQ && matchCat;
    })
    .sort((a, b) => {
      if (!sortCol) return 0;

      const va = a[sortCol];
      const vb = b[sortCol];

      const cmp =
        typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));

      return sortAsc ? cmp : -cmp;
    });
}

function renderTable() {
  const tbody = document.getElementById("tableBody");

  const data = filtered();

  document.getElementById("countDisplay").textContent = data.length;

  tbody.innerHTML = data
    .map(
      (m, index) => `

<tr>

<td>${m.nom}</td>
<td>${m.marca}</td>
<td>${m.tipo}</td>
<td>${m.motor}</td>
<td>${m.pot}</td>
<td>${m.peso}</td>
<td>${m.precio}</td>

<td>

<button class="btn btn-dark btn-sm"
onclick="openMoto(${index})">

Ver

</button>

</td>

</tr>

`,
    )
    .join("");
}

function openMoto(index) {
  const m = filtered()[index];

  document.getElementById("motoImg").src = m.img;

  document.getElementById("motoNombre").textContent = m.nom;

  const modal = new bootstrap.Modal(document.getElementById("motoModal"));

  modal.show();
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQ = e.target.value.toLowerCase();

  renderTable();
});

document.querySelectorAll(".filtro-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filtro-btn")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    filterCat = btn.dataset.cat;

    renderTable();
  });
});

document.querySelectorAll("#specsTable th[data-col]").forEach((th) => {
  th.addEventListener("click", () => {
    const map = {
      nom: "nom",
      marca: "marca",
      tipo: "tipo",
      pot: "potN",
      peso: "pesoN",
      precio: "precioN",
    };

    const key = map[th.dataset.col];

    if (sortCol === key) {
      sortAsc = !sortAsc;
    } else {
      sortCol = key;

      sortAsc = true;
    }

    renderTable();
  });
});

renderTable();
