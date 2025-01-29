// app/api/submitForm/route.ts
import { NextResponse } from "next/server";
import client from "../../lib/turso"; // Importar el cliente de Turso

const insertFormData = async (
	name: string,
	email: string,
	phone: string,
	company: string,
	sector: string,
	message: string
) => {
	const result = await client.execute(
		`
      INSERT INTO form_submissions (name, email, phone, company, sector, message)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING id;
    `,
		[name, email, phone, company, sector, message]
	);

	return result.rows[0]?.id; // Devuelve el ID generado
};

export async function POST(request: Request) {
	const { name, email, phone, company, sector, message } =
		await request.json();

	try {
		const participantId = await insertFormData(
			name,
			email,
			phone,
			company,
			sector,
			message
		);

		return NextResponse.json({
			message: "Formulario enviado exitosamente",
			participantId: participantId, // Enviar el ID de usuario generado
		});
	} catch (error) {
		console.error("Error al guardar los datos en la base de datos:", error);
		return NextResponse.json(
			{ error: "Hubo un error al guardar los datos en la base de datos" },
			{ status: 500 }
		);
	}
}
