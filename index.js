// Alumno: Macchia Sebastian
let tasasDeCambioCompra = {};
let tasasDeCambioVenta = {};

try{
  fetch("./tasas.json")
  .then((res) => res.json())
  .then((data) => {
    tasasDeCambioCompra = data.cambioCompra;
    tasasDeCambioVenta = data.cambioVenta;

    mostrarDivisas();
  });
}catch(error){
  console.log(error);
}

// Obtener referencias a los elementos HTML
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const transaccionForm = document.getElementById("transaccion-form");
const comprarButton = document.getElementById("comprar");
const venderButton = document.getElementById("vender");
const borrarTransaccionesButton = document.getElementById("borrar-transacciones");
const historialTransacciones = document.getElementById("transacciones");
const botonTransacciones = document.getElementById("mostrar-transacciones");

// Ocultar botones y elementos al inicio
comprarButton.style.display = "none";
venderButton.style.display = "none";
borrarTransaccionesButton.style.display = "none";
historialTransacciones.style.display = "none";
botonTransacciones.style.display = "none";


// Función para manejar el inicio de sesión
function iniciarSesion(event) {
  event.preventDefault(); // Evita que el formulario se envíe
  const login = document.getElementById("login");

  const username = usernameInput.value;
  const password = passwordInput.value;
  // Verificar credenciales 
  if (username === "pedro" && password === "pedro123") {
    usernameInput.innerHTML = "";
    passwordInput.innerHTML = "";
    usernameInput.value = "";
    passwordInput.value = "";

    // Almacenar el usuario en el localStorage
    localStorage.setItem("usuario", username);
    localStorage.setItem("password", password);

    // Ocultar el formulario de inicio de sesión y mostrar mensaje de bienvenida
    loginForm.style.display = "none";
    let bienvenido = document.createElement("h2");
    bienvenido.innerHTML = `Bienvenido ${username}`;
    login.innerHTML = "";
    let button = document.createElement("button");
    button.style.backgroundColor = "#007bff";
    button.style.color = "#fff";
    button.innerHTML = "Cerrar sesión";
    button.addEventListener("click", function () {
      cerrarSesion();
    });
    login.appendChild(bienvenido);
    login.appendChild(button);

    // Mostrar la sección de inicio con los botones "Comprar", "Vender" y "botonTransacciones"
    comprarButton.style.display = "block";
    venderButton.style.display = "block";   
    botonTransacciones.style.display = "block";
  } else {
    Swal.fire("Credenciales incorrectas");
    usernameInput.innerHTML = "";
    passwordInput.innerHTML = "";
    usernameInput.value = "";
    passwordInput.value = "";
  }

}

// Agregar un manejador de eventos al formulario de inicio de sesión
loginForm.addEventListener("submit", iniciarSesion);

// Función para mostrar divisas
function mostrarDivisas(){
  const divisas = document.getElementById("inicio-article");
  let compra = document.createElement("div");
  let compraTitulo = document.createElement("h3");
  compraTitulo.innerHTML = "Tasas de compra";
  compra.appendChild(compraTitulo);
  let venta = document.createElement("div");
  let ventaTitulo = document.createElement("h3");
  ventaTitulo.innerHTML = "Tasas de venta";
  venta.appendChild(ventaTitulo);
  for (let moneda in tasasDeCambioCompra) {
    const divisa = document.createElement("p");
    divisa.innerHTML = `${moneda}: ${tasasDeCambioCompra[moneda]} ARS`;
    compra.appendChild(divisa);
  }
  for (let moneda in tasasDeCambioVenta) {
    const divisa = document.createElement("p");
    divisa.innerHTML = `${moneda}: ${tasasDeCambioVenta[moneda]} ARS`;
    venta.appendChild(divisa);
  }
  divisas.appendChild(compra);
  divisas.appendChild(venta);
}

// Función para mostrar las transacciones del usuario
function mostrarTransacciones(valor) {

    if (valor != "actualizar") {
      if (historialTransacciones.style.display === "block") {
        historialTransacciones.style.display = "none";
      } else {
        historialTransacciones.style.display = "block";
      }
      if (borrarTransaccionesButton.style.display === "block") {
        borrarTransaccionesButton.style.display = "none";
      } else {
        borrarTransaccionesButton.style.display = "block";
      }
    } else {
      if (historialTransacciones.style.display === "none"){
        historialTransacciones.style.display = "block";
      }
      if (borrarTransaccionesButton.style.display === "none"){
        borrarTransaccionesButton.style.display = "block";
      }
    }
    const transaccionesGuardadas =
      JSON.parse(localStorage.getItem("transacciones")) || [];
    const tbody = document.querySelector("#transacciones tbody");

    // Limpia la tabla antes de agregar las nuevas transacciones
    tbody.innerHTML = "";


    // Itera sobre las transacciones guardadas y agrega filas a la tabla
    transaccionesGuardadas.forEach((transaccion) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>   ${transaccion.tipo} </td>
        <td>   ${transaccion.moneda} </td>
        <td>   ${transaccion.cantidad} </td>
        <td>   ${transaccion.resultado} ARS  </td>
        <td>    ${transaccion.fecha}  </td>
      `;
      tbody.appendChild(row);
    });
  }


// Función para realizar una transacción (compra o venta)
function transaccion(moneda, opcion) {
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const aplicarImpuesto = document.getElementById("impuesto").checked;

  if (!tasasDeCambioCompra.hasOwnProperty(moneda) || !tasasDeCambioVenta.hasOwnProperty(moneda)) {
    Swal.fire("Moneda no válida.");
    return;
  }

  if (isNaN(cantidad) || cantidad <= 0) {
    Swal.fire("Cantidad no válida.");
    return;
  }

  let resultado = 0;

  if (opcion === "compra") {
    resultado = cantidad * tasasDeCambioCompra[moneda];
  } else if (opcion === "venta") {
    resultado = tasasDeCambioVenta[moneda] * cantidad;
  }

  if (aplicarImpuesto) {
    // Calcula el impuesto y agrega al resultado
    const impuesto = resultado * 0.3; // Cambia el 0.3 al porcentaje de impuesto que desees aplicar
    resultado += impuesto;
  }

  // Almacena la transacción en el localStorage
  const transaccion = {
    tipo: opcion,
    moneda: moneda,
    cantidad: cantidad,
    resultado: resultado.toFixed(2),
    fecha: new Date().toLocaleDateString(),
  };

  transaccionesGuardadas =
    JSON.parse(localStorage.getItem("transacciones")) || [];
  transaccionesGuardadas.push(transaccion);
  localStorage.setItem(
    "transacciones",
    JSON.stringify(transaccionesGuardadas)
  );
  // Ocultar el formulario de transacción nuevamente
  transaccionForm.style.display = "none";

  // Llama a la función para mostrar las transacciones actualizadas
  mostrarTransacciones("actualizar");
}

// Función para mostrar las opciones de compra y venta de divisas
function mostrarMonedas(opcion) {
  const moneda = document.getElementById("selector-compra");
  moneda.innerHTML = "";
  const cantidad = document.getElementById("cantidad");
  cantidad.value = "";
  let h3 = document.getElementById("transaccion-form-h3");
  h3.innerHTML = "";
  
  if (opcion === "compra") {
    h3.innerHTML = "Compra de divisas";
  } else if (opcion === "venta") {
    h3.innerHTML = "Venta de divisas";
  }
  for (elemento in tasasDeCambioCompra || tasasDeCambioVenta) {
    let valor = document.createElement("option");
    valor.value = elemento;
    valor.innerHTML = elemento;
    moneda.appendChild(valor);
  }
  // Mostrar el formulario de transacción
  transaccionForm.style.display = "block";
  document.getElementById("realizar-transaccion").onclick = function () {
    transaccion(moneda.value, opcion);
  }
}

// Agregar un manejador de eventos para el botón de borrar transacciones
borrarTransaccionesButton.addEventListener("click", function() {
  Swal.fire({
    title: "¿Está seguro que desea borrar las transacciones?",
    text: "Una vez borradas no se podrán recuperar.",
    icon: "warning",
    showCancelButton: true, // Agregamos el botón de cancelar
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar"
  })
  .then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("transacciones");
      mostrarTransacciones(); // Actualiza la tabla de transacciones
    }
  });
});


// Función para cerrar la sesión
function cerrarSesion() {
  usernameInput.innerHTML = "";
  passwordInput.innerHTML = "";
  usernameInput.value = "";
  passwordInput.value = "";
  localStorage.clear();
  location.reload();
}