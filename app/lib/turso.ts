// app/lib/turso.ts
import { createClient } from "@libsql/client";

const client = createClient({
	url: process.env.TURSO_DATABASE_URL || "https://ezestom-ddbb-ezestom.turso.io",
	// syncUrl: "https://ezestom-ddbb-ezestom.turso.io", // URL de tu base de datos en Turso
	authToken: process.env.AUTH_TOKEN, // Token de autenticación de Turso
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
