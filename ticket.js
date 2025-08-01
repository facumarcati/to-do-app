const Ticket = function (id, nombre, descripcion, estado) {
  this.id = id;
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.estado = estado;
};

let tickets = [];
let idTicket = 1;

function mostrarFormulario() {
  document.getElementById("crearTicket").style.display = "flex";
  document.getElementById("verTickets").style.display = "none";
  document.getElementById("filtroTickets").style.display = "none";
}

function mostrarTickets() {
  document.getElementById("crearTicket").style.display = "none";
  document.getElementById("verTickets").style.display = "flex";
  document.getElementById("filtroTickets").style.display = "none";

  verTickets(tickets);
}

function mostrarFiltroTickets() {
  document.getElementById("crearTicket").style.display = "none";
  document.getElementById("verTickets").style.display = "flex";
  if (tickets.length > 0) {
    document.getElementById("filtroTickets").style.display = "flex";
  }

  filtrarTickerEstado();
}

function verTickets(lista) {
  let mensaje;

  if (lista.length === 0) {
    mensaje = `<p class="no-tickets"><strong>No hay tickets</strong></p>`;
    document.getElementById("verTickets").innerHTML = mensaje;
    return;
  }

  mensaje = `<h3>LISTA DE TICKETS</h3>`;

  lista.forEach((ticket) => {
    mensaje += `<div class="ticket">
  <p><strong>ID: </strong>${ticket.id}</p>
  <p><strong>Nombre: </strong>${ticket.nombre}</p>
  <p><strong>Descripcion: </strong>${ticket.descripcion}</p>
  <p><strong>Estado: </strong>${ticket.estado}</p>
  <div class="container-btn-ticket">
  <button class="btnModificar" data-id=${ticket.id}>Modificar</button>
  ${
    ticket.estado == true
      ? `<button class="btnCerrar" data-id=${ticket.id}>Cerrar</button>`
      : ``
  }</div>
  </div>`;
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

  const botonesModificar = contenedor.querySelectorAll(".btnModificar");
  botonesModificar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.getAttribute("data-id"));
      modificarTicket(id);
    });
  });
}

function filtrarTickerEstado(estado) {
  let estadoFiltrar;

  if (estado === "cerrados") {
    estadoFiltrar = false;
  } else if (estado === "activos") {
    estadoFiltrar = true;
  } else {
    verTickets(tickets);
    return;
  }

  let resultado = tickets.filter((ticket) => ticket.estado === estadoFiltrar);

  verTickets(resultado);
}

function generarTicket(edicion) {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("desc").value;

  if (edicion == null) {
    let ticketNuevo = new Ticket(idTicket, nombre, descripcion, true);
    tickets.push(ticketNuevo);
    alert("TICKET GENERADO CORRECTAMENTE");

    idTicket++;
  } else {
    edicion.nombre = nombre;
    edicion.descripcion = descripcion;

    alert("TICKET MODIFICADO CORRECTAMENTE");
  }

  document.getElementById("formCrearTicket").reset();
  ticketEditado = null;
}

function cerrarTicket(id) {
  let ticket = tickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    alert("Ticket no encontrado");
    return;
  }

  if (confirm("Seguro que queres cerrar el ticket?")) {
    ticket.estado = false;
    alert("TICKET CERRADO CORRECTAMENTE");
  }

  verTickets(tickets);
}

let ticketEditado = null;

function modificarTicket(id) {
  ticketEditado = tickets.find((ticket) => ticket.id === id);

  document.getElementById("crearTicket").style.display = "flex";
  document.getElementById("verTickets").style.display = "none";
  document.getElementById("filtroTickets").style.display = "none";

  document.getElementById("nombre").value = ticketEditado.nombre;
  document.getElementById("desc").value = ticketEditado.descripcion;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("crearTicket").style.display = "none";
  document.getElementById("verTickets").style.display = "none";
  document.getElementById("filtroTickets").style.display = "none";

  document
    .getElementById("btnCrearTicket")
    .addEventListener("click", mostrarFormulario);

  document
    .getElementById("btnVerTickets")
    .addEventListener("click", mostrarTickets);

  document.getElementById("btnCrear").addEventListener("click", (event) => {
    event.preventDefault();
    generarTicket(ticketEditado);
    document.getElementById("formCrearTicket").reset();
  });

  document
    .getElementById("btnFiltrarTickets")
    .addEventListener("click", mostrarFiltroTickets);

  document.querySelectorAll(".btnFiltrar").forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      const valorFiltro = event.target.value;
      filtrarTickerEstado(valorFiltro);
    });
  });
});
