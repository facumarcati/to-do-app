const Ticket = function (id, nombre, descripcion, estado) {
  this.id = id;
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.estado = estado;
};

let tickets = [];
let idTicket = 1;

function mostrarFormulario() {
  document.getElementById("crearTicket").style.display = "block";
  document.getElementById("verTickets").style.display = "none";
}

function mostrarTickets() {
  document.getElementById("crearTicket").style.display = "none";
  document.getElementById("verTickets").style.display = "block";

  verTickets(tickets);
}

function verTickets(lista) {
  let mensaje;

  if (lista.length === 0) {
    mensaje = "No hay tickets";
    document.getElementById("verTickets").innerHTML = mensaje;
    return;
  }

  mensaje = `<h3>LISTA DE TICKETS</h3>`;

  lista.forEach((ticket) => {
    mensaje += `
  <p><strong>ID: </strong>${ticket.id}</p>
  <p><strong>Nombre: </strong>${ticket.nombre}</p>
  <p><strong>Descripcion: </strong>${ticket.descripcion}</p>
  <p><strong>Estado: </strong>${ticket.estado}</p>
  <button class="btnModificar" data-id=${ticket.id}>Modificar</button>
  ${
    ticket.estado == true
      ? `<button class="btnCerrar" data-id=${ticket.id}>Cerrar</button>`
      : ``
  }`;
  });

  const contenedor = document.getElementById("verTickets");
  contenedor.innerHTML = mensaje;

  const botonesCerrar = contenedor.querySelectorAll(".btnCerrar");
  botonesCerrar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.getAttribute("data-id"));
      cerrarTicket(id);
    });
  });
}

function filtrarTickerEstado() {
  let estadoFiltrar;

  let estadoBool = true;
  while (estadoBool) {
    if (estadoFiltrar == 1 || estadoFiltrar == 0) {
      estadoBool = false;
    } else {
      console.error("Estado incorrecto");

      estadoFiltrar = parseInt(
        prompt("Que estado queres ver? 0-Falso 1-Verdadero")
      );
    }
  }

  if (estadoFiltrar == 0) {
    estadoFiltrar = false;
  } else {
    estadoFiltrar = true;
  }

  let resultado = tickets.filter((ticket) => ticket.estado === estadoFiltrar);
  console.table(resultado);
}

function generarTicket() {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("desc").value;

  let ticketNuevo = new Ticket(idTicket, nombre, descripcion, true);
  tickets.push(ticketNuevo);
  alert("TICKET GENERADO CORRECTAMENTE");

  idTicket++;
}

function cerrarTicket(id) {
  let ticket = tickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    alert("Ticket no encontrado");
    return;
  }

  confirm("Seguro que queres cerrar el ticket?");

  ticket.estado = false;
  alert("TICKET CERRADO CORRECTAMENTE");

  verTickets(tickets);
}

function modificarTicket() {
  let id = parseInt(prompt("Id Ticket a modificar"));

  let existe = tickets.find((ticket) => ticket.id === id);
  if (!existe) {
    console.error("No se encontro ticket");
    return;
  }

  const nombre = prompt("Nombre del usuario:");
  const descripcion = prompt("Descripcion del problema");

  existe.nombre = nombre;
  existe.descripcion = descripcion;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("crearTicket").style.display = "none";
  document.getElementById("verTickets").style.display = "none";

  document
    .getElementById("btnCrearTicket")
    .addEventListener("click", mostrarFormulario);

  document
    .getElementById("btnVerTickets")
    .addEventListener("click", mostrarTickets);

  document.getElementById("btnCrear").addEventListener("click", (event) => {
    event.preventDefault();
    generarTicket();
    document.getElementById("formCrearTicket").reset();
  });
});
