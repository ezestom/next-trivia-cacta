// app/api/saveScore/route.ts
import { NextResponse } from "next/server";
import client from "../../lib/turso"; // Importar el cliente de Turso

const insertScoreData = async (email: string, score: number) => {
	const result = await client.execute(
		`
    INSERT INTO user_score (email, score)
    VALUES (?, ?);
  `,
		[email, score]
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
		// Insertamos el puntaje del usuario directamente usando el email
		const insertResult = await insertScoreData(email, score);

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
