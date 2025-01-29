// app/lib/turso.ts
import { createClient } from "@libsql/client";

const client = createClient({
	url: "file:local.db", // Puedes usar esta URL para pruebas locales
	syncUrl: "https://ezestom-ddbb-ezestom.turso.io", // URL de tu base de datos en Turso
	authToken:
		"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDMyNzQ4NjUsImlhdCI6MTczODA5MDg2NSwiaWQiOiJkNGFhY2RiNC1iZTlhLTQ2NTItOWZlNi02OGZhMmRlMDVhMWYifQ.ixKhtY2jaX4uri_2o5AWiACVHPmxmYdcVx7vLHiMyKM5WxrykQQtFC_nLRKSSIUn5J6-UHzvhOHdS2Cap_74AA", // Token de autorización
});

// Función para crear la tabla `form_submissions`
const createFormSubmissionsTable = async () => {
	try {
		const result = await client.execute(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        company TEXT NOT NULL,
        sector TEXT NOT NULL,
        message TEXT,
        created_at INTEGER DEFAULT (unixepoch())
      );
    `);
		console.log("Tabla 'form_submissions' creada:", result);
	} catch (error) {
		console.error("Error al crear la tabla 'form_submissions':", error);
	}
};

// Función para crear la tabla `users`
const createUserTable = async () => {
	try {
		const result = await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        score REAL DEFAULT 0,
        created_at INTEGER DEFAULT (unixepoch())
      );
    `);
		console.log("Tabla 'users' creada:", result);
	} catch (error) {
		console.error("Error al crear la tabla 'users':", error);
	}
};

// Llamar a las funciones de creación de tablas
createFormSubmissionsTable();
createUserTable();

// Exportar el cliente para usarlo en otros archivos
export default client;
