// app/api/saveScore/route.ts
import { NextResponse } from "next/server";
import client from "../../lib/turso"; // Importar el cliente de Turso

const insertScoreData = async (userId: number, score: number) => {
	const result = await client.execute(
		`
    INSERT INTO user_score (user_id, score)
    VALUES (?, ?);
  `,
		[userId, score]
	);

	return result;
};

export async function POST(request: Request) {
	const { email, score } = await request.json(); // Recibir el email y puntaje

	// Validar que los datos sean correctos
	if (!email || typeof score !== "number") {
		return NextResponse.json(
			{
				error: "Email y puntaje son necesarios y el puntaje debe ser un número válido.",
			},
			{ status: 400 }
		);
	}

	try {
		// Primero, obtenemos el ID del usuario usando el email
		const result = await client.execute(
			`
      SELECT id FROM user_form WHERE email = ?;
    `,
			[email]
		);

		const userId = result.rows[0]?.id;

		if (!userId) {
			return NextResponse.json(
				{ error: "Usuario no encontrado." },
				{ status: 404 }
			);
		}

		// Luego, insertamos el puntaje del usuario con el ID recuperado
		const insertResult = await insertScoreData(userId, score);

		return NextResponse.json({
			message: "Puntaje guardado exitosamente.",
			data: insertResult,
		});
	} catch (error) {
		console.error("Error al guardar el puntaje:", error);
		return NextResponse.json(
			{ error: "Hubo un error al guardar el puntaje." },
			{ status: 500 }
		);
	}
}
