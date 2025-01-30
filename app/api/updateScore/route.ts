//app/api/updateScore/route.ts
import { NextResponse } from "next/server";
import client from "../../lib/turso"; // Importar el cliente de Turso

const updateScore = async (id: string, score: number) => {
	console.log(
		"Actualizando puntaje para el usuario con id:",
		id,
		"nuevo puntaje:",
		score
	); // Log para depuración

	const result = await client.execute(
		`UPDATE user_score SET score = ? WHERE id = ?;`,
		[score, id]
	);
	console.log("Resultado de la actualización:", result); // Log para depuración
	return result;
};

export async function POST(request: Request) {
	const { id, score } = await request.json();

	try {
		console.log("Recibido ID:", id, "Puntaje:", score); // Log para ver lo que se recibe en la solicitud
		const result = await updateScore(id, score);
		return NextResponse.json({
			message: "Puntaje actualizado exitosamente",
			data: result,
		});
	} catch (error) {
		console.error("Error al actualizar el puntaje:", error);
		return NextResponse.json(
			{ error: "Hubo un error al actualizar el puntaje" },
			{ status: 500 }
		);
	}
}


// original