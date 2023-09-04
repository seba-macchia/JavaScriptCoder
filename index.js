//se realiza un programa de cambio, con lo visto en clase. La idea es que a futuro, los valores
//de la cotizacion, sean tomados desde la página web.
// const tasaDolar = 350; 
// const tasaEuro = 380; 

// // Función para realizar el cambio de moneda
// function realizarCambio() {
//   alert('Recuerde en esta empresa, el valor de la compra, es el valor que compra el cliente y el valor de venta, es el valor que compra Cambio Bahia');
  
//   while (true) {
//     const opcion = parseInt(prompt('Seleccione una opción:\n1. Comprar dólar/euro\n2. Vender dólar/euro\n3. Salir'));
    
//     if (opcion === 1 || opcion === 2) {
//       const cantidadMoneda = parseFloat(prompt('Ingrese la cantidad de Dólares o Euros:'));
//       const tipoMoneda = parseInt(prompt('Ingrese el tipo de moneda:\n1. Dólar\n2. Euro'));

//       if (isNaN(cantidadMoneda) || cantidadMoneda <= 0) {
//         alert('Por favor ingrese una cantidad válida.');
//         continue;
//       }

//       let resultado = 0;
//       let tasaCambio = 0;
//       let impuesto = 1; // Inicializamos el impuesto

//       if (opcion === 1) {
//         tasaCambio = tipoMoneda === 1 ? tasaDolar : tasaEuro;
//         resultado = cantidadMoneda * tasaCambio;
//         const moneda = tipoMoneda === 1 ? 'dólares' : 'euros';
//         const deseaImpuestos = prompt('¿Desea agregar impuestos (Sí/No)?').toLowerCase();
//         if (deseaImpuestos === 'si' || deseaImpuestos === 'sí') {
//           impuesto = 1.7; // Aplicamos el impuesto de compra
//         }
//         resultado *= impuesto;
//         alert(`El resultado de la compra de ${cantidadMoneda} ${moneda} es: ${resultado.toFixed(2)} pesos`);
//       } else if (opcion === 2) {
//         tasaCambio = tipoMoneda === 1 ? tasaDolar : tasaEuro;
//         resultado = cantidadMoneda * tasaCambio;
//         const moneda = tipoMoneda === 1 ? 'dólares' : 'euros';
//         const deseaImpuestos = prompt('¿Desea agregar impuestos (Sí/No)?').toLowerCase();
//         if (deseaImpuestos === 'si' || deseaImpuestos === 'sí') {
//           impuesto = 1.4; // Aplicamos el impuesto de venta
//         }
//         resultado *= impuesto;
//         alert(`El resultado de la venta de ${cantidadMoneda} ${moneda} es: ${resultado.toFixed(2)} pesos`);
//       }
      
//     } else if (opcion === 3) {
//       alert('Hasta luego.');
//       break;
//     } else {
//       alert('Número ingresado incorrecto. Por favor seleccione una opción válida.');
//     }
//   }
// }

// Llamamos a la función para comenzar el programa
// realizarCambio();

// pre entrega 2
// Define una clase para representar las transacciones de divisas.
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

// Define un objeto para representar las divisas y sus tasas de cambio a pesos argentinos (ARS).
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
      return;
    default:
      alert('Opción no válida. Por favor, seleccione una opción válida.');
      mostrarMenu();
      break;
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
  mostrarMenu();
}

// Función para comprar divisas.
function comprarDivisas() {
  const opcionIngreso = prompt('¿Desea ingresar dinero? (Sí o No):');

  if (opcionIngreso.toLowerCase() === 'si') {
    const dineroIngresado = parseFloat(prompt('Ingrese la cantidad de dinero en pesos argentinos (ARS):'));
    if (isNaN(dineroIngresado) || dineroIngresado < 0) {
      alert('Cantidad de dinero no válida. La transacción no puede ser realizada.');
      mostrarMenu();
      return;
    }

    dineroDisponible += dineroIngresado; // Actualiza el saldo con el dinero ingresado.

    const mensaje = `Dinero disponible: ${dineroDisponible.toFixed(2)} ARS\nSeleccione la divisa que desea comprar (por número):\n` +
      Object.keys(tasasDeCambio).map((moneda, index) => `${index + 1}. ${moneda}`).join('\n');
      
    const eleccionDivisa = parseInt(prompt(mensaje));

    if (isNaN(eleccionDivisa) || eleccionDivisa < 1 || eleccionDivisa > Object.keys(tasasDeCambio).length) {
      alert('Opción no válida. Por favor, seleccione una opción válida.');
      mostrarMenu();
      return;
    }

    const simboloMoneda = Object.keys(tasasDeCambio)[eleccionDivisa - 1];
    const cantidadDivisas = parseFloat(prompt(`Ingrese la cantidad de ${simboloMoneda} que desea comprar:`));

    if (isNaN(cantidadDivisas) || cantidadDivisas <= 0) {
      alert('Cantidad no válida. La transacción no puede ser realizada.');
      mostrarMenu();
      return;
    }

    const tasaCambio = tasasDeCambio[simboloMoneda];
    const costoTransaccion = cantidadDivisas * tasaCambio;
    const impuestos = calcularImpuestos(costoTransaccion);
    const costoTotal = costoTransaccion + impuestos;

    if (dineroDisponible < costoTotal) {
      const divisasPuedesComprar = ((dineroDisponible * 0.7) / tasaCambio).toFixed(2); // Se multiplica por 0.7 para restar el 30% de impuestos.
      alert(`Dinero insuficiente. Puedes comprar hasta ${divisasPuedesComprar} ${simboloMoneda} (con impuestos incluidos).`);
      mostrarMenu();
    } else {
      dineroDisponible -= costoTotal; // Actualiza el saldo restando el costo total de la transacción.
      alert(`Transacción exitosa:\nDinero disponible: ${dineroDisponible.toFixed(2)} ARS\n${cantidadDivisas} ${simboloMoneda} => ${costoTransaccion.toFixed(2)} ARS\nImpuestos (30%): ${impuestos.toFixed(2)} ARS\nCosto total: ${costoTotal.toFixed(2)} ARS`);
      mostrarMenu();
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
    mostrarMenu();
    return;
  }

  const simboloMoneda = Object.keys(tasasDeCambio)[eleccionDivisa - 1];
  const cantidad = parseFloat(prompt(`Ingrese la cantidad de ${simboloMoneda} que desea vender:`));

  if (isNaN(cantidad) || cantidad <= 0) {
    alert('Cantidad no válida. La transacción no puede ser realizada.');
    mostrarMenu();
    return;
  }

  const tasaCambio = tasasDeCambio[simboloMoneda];
  const resultado = cantidad * tasaCambio;
  const mensajeVenta = `Simulación de venta:\nCantidad de ${simboloMoneda} a vender: ${cantidad}\nPrecio de ${simboloMoneda}: ${tasaCambio.toFixed(2)} ARS\nResultado en pesos argentinos (ARS): ${resultado.toFixed(2)} ARS\n\nNota: Los importes mostrados no incluyen el 30% de impuestos. \n\nSi Desea realizar esta operación, por favor dirigirse a la sucursal más cercana.`;
  alert(mensajeVenta);
  mostrarMenu();
}

// Iniciar la aplicación mostrando el menú principal.
mostrarMenu();



