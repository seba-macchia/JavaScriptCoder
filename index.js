// pre entrega 2
// Defino una clase para representar las transacciones de divisas.
class Transaccion {
  constructor(cantidad, monedaOrigen, monedaDestino) {
    this.cantidad = cantidad;
    this.monedaOrigen = monedaOrigen;
    this.monedaDestino = monedaDestino;
    this.resultado = this.calcularResultado();
  }

  calcularResultado() {
    const tipoCambioOrigen = this.monedaOrigen === 'ARS' ? 1 : tasasDeCambio[this.monedaOrigen];
    const tipoCambioDestino = this.monedaDestino === 'ARS' ? 1 : tasasDeCambio[this.monedaDestino];
    return (this.cantidad * tipoCambioOrigen) / tipoCambioDestino;
  }
}

// Defino un objeto para representar las divisas y sus tasas de cambio a pesos argentinos (ARS).
const tasasDeCambio = {
  USD: 367,   // Tasa de cambio a pesos argentinos
  EUR: 400,
  BRL: 79,
  GBP: 440,
  CNY: 48.18,
};

// Total inicial en pesos argentinos (ARS).
let dineroDisponible = 0;

// Función de orden superior para mostrar un menú de opciones al usuario.
function mostrarMenu() {
  let salir = false; // Variable para controlar la salida del bucle while

  while (!salir) {
    const opcionesMenu = [
      'Comprar divisas',
      'Vender divisas',
      'Salir',
    ];

    const eleccion = prompt(`Elija una opción:\n1. Comprar divisas\n2. Vender divisas\n3. Salir\n\nDinero disponible: ${dineroDisponible.toFixed(2)} ARS`);

    switch (eleccion) {
      case '1':
        comprarDivisas();
        break;
      case '2':
        venderDivisas();
        break;
      case '3':
        salir = true; // pongo la variable salir en true para salir del bucle.
        break;
      default:
        alert('Opción no válida. Por favor, seleccione una opción válida.');
        break;
    }
  }
}

// Función para calcular impuestos (30%).
function calcularImpuestos(total) {
  return total * 0.3;
}

// Función para listar las divisas y sus tasas de cambio.
function listarDivisas() {
  const mensaje = 'Tasas de cambio a pesos argentinos (ARS):\n' +
    Object.entries(tasasDeCambio).map(([moneda, tasa]) => `${moneda}: ${tasa.toFixed(2)} ARS`).join('\n') +
    '\n\nNota: Los importes mostrados no incluyen el 30% de impuestos.';
  alert(mensaje);
}

// Función y condicionales para comprar divisas.
function comprarDivisas() {
  const opcionIngreso = prompt('¿Desea ingresar dinero? (Sí o No):');

  if (opcionIngreso.toLowerCase() === 'si') {
    const dineroIngresado = parseFloat(prompt('Ingrese la cantidad de dinero en pesos argentinos (ARS):'));
    if (isNaN(dineroIngresado) || dineroIngresado < 0) {
      alert('Cantidad de dinero no válida. La transacción no puede ser realizada.');
      return;
    }

    dineroDisponible += dineroIngresado; // Actualiza el saldo con el dinero ingresado.

    const mensaje = `Dinero disponible: ${dineroDisponible.toFixed(2)} ARS\nSeleccione la divisa que desea comprar (por número):\n` +
      Object.keys(tasasDeCambio).map((moneda, index) => `${index + 1}. ${moneda}`).join('\n');
      
    const eleccionDivisa = parseInt(prompt(mensaje));

    if (isNaN(eleccionDivisa) || eleccionDivisa < 1 || eleccionDivisa > Object.keys(tasasDeCambio).length) {
      alert('Opción no válida. Por favor, seleccione una opción válida.');
      return;
    }

    const simboloMoneda = Object.keys(tasasDeCambio)[eleccionDivisa - 1];
    const cantidadDivisas = parseFloat(prompt(`Ingrese la cantidad de ${simboloMoneda} que desea comprar:`));

    if (isNaN(cantidadDivisas) || cantidadDivisas <= 0) {
      alert('Cantidad no válida. La transacción no puede ser realizada.');
      return;
    }

    const tasaCambio = tasasDeCambio[simboloMoneda];
    const costoTransaccion = cantidadDivisas * tasaCambio;
    const impuestos = calcularImpuestos(costoTransaccion);
    const costoTotal = costoTransaccion + impuestos;

    if (dineroDisponible < costoTotal) {
      const divisasPuedesComprar = ((dineroDisponible * 0.7) / tasaCambio).toFixed(2); // Se multiplica por 0.7 para restar el 30% de impuestos.
      alert(`Dinero insuficiente. Puedes comprar hasta ${divisasPuedesComprar} ${simboloMoneda} (con impuestos incluidos).`);
    } else {
      dineroDisponible -= costoTotal; // Actualiza el saldo restando el costo total de la transacción.
      alert(`Transacción exitosa:\nDinero disponible: ${dineroDisponible.toFixed(2)} ARS\n${cantidadDivisas} ${simboloMoneda} => ${costoTransaccion.toFixed(2)} ARS\nImpuestos (30%): ${impuestos.toFixed(2)} ARS\nCosto total: ${costoTotal.toFixed(2)} ARS`);
    }
  } else if (opcionIngreso.toLowerCase() === 'no') {
    listarDivisas();
  } else {
    alert('Opción no válida. Por favor, seleccione "Sí" o "No".');
  }
}

// Función para vender divisas.
function venderDivisas() {
  const mensaje = `Seleccione la divisa que desea vender (por número):\n` + 
    Object.keys(tasasDeCambio).map((moneda, index) => `${index + 1}. ${moneda}`).join('\n');

  const eleccionDivisa = parseInt(prompt(mensaje));

  if (isNaN(eleccionDivisa) || eleccionDivisa < 1 || eleccionDivisa > Object.keys(tasasDeCambio).length) {
    alert('Opción no válida. Por favor, seleccione una opción válida.');
    return;
  }

  const simboloMoneda = Object.keys(tasasDeCambio)[eleccionDivisa - 1];
  const cantidad = parseFloat(prompt(`Ingrese la cantidad de ${simboloMoneda} que desea vender:`));

  if (isNaN(cantidad) || cantidad <= 0) {
    alert('Cantidad no válida. La transacción no puede ser realizada.');
    return;
  }

  const tasaCambio = tasasDeCambio[simboloMoneda];
  const resultado = cantidad * tasaCambio;
  const mensajeVenta = `Simulación de venta:\nCantidad de ${simboloMoneda} a vender: ${cantidad}\nPrecio de ${simboloMoneda}: ${tasaCambio.toFixed(2)} ARS\nResultado en pesos argentinos (ARS): ${resultado.toFixed(2)} ARS\n\nNota: Los importes mostrados no incluyen el 30% de impuestos. \n\nSi desea realizar esta operación, por favor diríjase a la sucursal más cercana.`;
  alert(mensajeVenta);
}

// Iniciar la aplicación mostrando el menú principal.
mostrarMenu();
