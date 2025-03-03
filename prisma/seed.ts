
/*import sqliteDB from "../src/database/db";

// ----------------------------------------------------------------------

// Datos de ejemplo
const servicios = {
  makeup: [
    { nombre: "Maquillaje de día", precio: 50000 },
    { nombre: "Maquillaje de noche", precio: 100000 },
    { nombre: "Maquillaje de novia", precio: 150000 },
  ],
  hairstyle: [
    { nombre: "Peinado casual", precio: 70000 },
    { nombre: "Peinado para fiesta", precio: 85000 },
    { nombre: "Peinado de novia", precio: 100000 },
  ],
  haircut: [
    { nombre: "Corte de cabello dama", precio: 40000 },
    { nombre: "Corte de cabello caballero", precio: 30000 },
    { nombre: "Corte infantil", precio: 20000 },
  ],
  hands_feet: [
    { nombre: "Manicure básico", precio: 50000 },
    { nombre: "Pedicure básico", precio: 65000 },
    { nombre: "Uñas acrílicas", precio: 120000 },
  ],
  extensions_eyelashes: [
    { nombre: "Extensiones de cabello", precio: 200000 },
    { nombre: "Pestañas postizas", precio: 35000 },
    { nombre: "Lifting de pestañas", precio: 40000 },
  ],
};

// Insertar categorías
const categorias = [
  { nombre: "Maquillaje", servicios: servicios.makeup },
  { nombre: "Peinado", servicios: servicios.hairstyle },
  { nombre: "Corte", servicios: servicios.haircut },
  { nombre: "Manos y Pies", servicios: servicios.hands_feet },
  {
    nombre: "Extensiones y Pestañas",
    servicios: servicios.extensions_eyelashes,
  },
];

const insertCategoria = sqliteDB.prepare(`INSERT INTO Categories (name) VALUES (?)`);
const insertServicio = sqliteDB.prepare(
  `INSERT INTO Services (id_category, name, price) VALUES (?, ?, ?)`
);

// Insertar categorías y servicios
for (const categoria of categorias) {
  const { lastInsertRowid } = insertCategoria.run(categoria.nombre);
  const idCategoria = lastInsertRowid;

  for (const servicio of categoria.servicios) {
    insertServicio.run(idCategoria, servicio.nombre, servicio.precio);
  }
}

// Insertar disponibilidad
const insertDisponibilidad = sqliteDB.prepare(
  `INSERT INTO Availability (day_week, start_time, end_time) VALUES (?, ?, ?)`
);
insertDisponibilidad.run("Lunes", "15:00", "19:00");
insertDisponibilidad.run("Martes", "07:00", "22:00");

console.log("Datos de ejemplo insertados correctamente.");
*/