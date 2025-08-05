const Ticket = function (id, nombre, descripcion, estado) {
  this.id = id;
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.estado = estado;
};

let tickets = [];
let idTicket;

function guardarLista() {
  const listaJSON = JSON.stringify(tickets);
  localStorage.setItem("listaTickets", listaJSON);
}

let listaGuardada = localStorage.getItem("listaTickets");

if (listaGuardada) {
  tickets = JSON.parse(listaGuardada);

  if (tickets.length > 0) {
    const maxId = Math.max(...tickets.map((t) => t.id));
    idTicket = maxId + 1;
  } else {
    idTicket = 1;
  }

  verTickets(tickets);
} else {
  idTicket = 1;
}

function mostrarFormulario() {
  document.getElementById("crearTicket").style.display = "flex";
  document.getElementById("verTickets").style.display = "none";
  document.getElementById("filtroTickets").style.display = "none";

  document.querySelector(".new-ticket").innerHTML = "Crear Nuevo Ticket";
  document.getElementById("btnCrear").innerHTML = "Crear Ticket";
  document.getElementById("formCrearTicket").reset();
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
  mensaje += `<div class="ticket-container">`;

  lista.forEach((ticket) => {
    mensaje += `
    <div class="ticket">
      <p><strong>ID: </strong>${ticket.id}</p>
      <p class="ticket-name"><strong>Nombre: </strong>${ticket.nombre}</p>
      <p class="ticket-desc"><strong>Descripción: </strong>${
        ticket.descripcion
      }</p>
      <p><strong>Estado: </strong>${ticket.estado}</p>
      <div class="container-btn-ticket">
        
        ${
          ticket.estado == true
            ? `<button class="btnModificar" data-id="${ticket.id}">Modificar</button>
            <button class="btnCerrar" data-id="${ticket.id}">Cerrar</button>`
            : ``
        }
      </div>
    </div>`;
  });

  mensaje += `</div>`;

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
  const tituloForm = document.querySelector(".new-ticket");

  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("desc").value;

  if (edicion == null) {
    let ticketNuevo = new Ticket(idTicket, nombre, descripcion, true);
    tickets.push(ticketNuevo);
    alert("TICKET GENERADO CORRECTAMENTE");

    guardarLista();

    idTicket++;
  } else {
    edicion.nombre = nombre;
    edicion.descripcion = descripcion;

    alert("TICKET MODIFICADO CORRECTAMENTE");

    guardarLista();

    mostrarTickets();
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
    guardarLista();
    alert("TICKET CERRADO CORRECTAMENTE");
  }

  verTickets(tickets);
}

let ticketEditado = null;

function modificarTicket(id) {
  const tituloForm = document.querySelector(".new-ticket");
  tituloForm.innerHTML = "Modificar Ticket";
  document.getElementById("btnCrear").innerHTML = "Modificar Ticket";

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
