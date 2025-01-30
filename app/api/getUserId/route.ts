// app/api/getUserId/route.ts
import { NextResponse } from "next/server";
import client from "../../lib/turso"; // Importar el cliente de Turso

const getUserId = async (email: string) => {
	const result = await client.execute(
		`
    SELECT id FROM user_form WHERE email = ?;
  `,
		[email]
	);

	return result.rows[0]?.id;
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email"); // Suponiendo que el email es un parámetro de consulta

	if (!email) {
		return NextResponse.json(
			{ error: "El correo electrónico es obligatorio." },
			{ status: 400 }
		);
	}

	try {
		const userId = await getUserId(email);

		if (!userId) {
			return NextResponse.json(
				{ error: "Usuario no encontrado." },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "Usuario encontrado.",
			userId,
		});
	} catch (error) {
		console.error("Error al obtener el ID del usuario:", error);
		return NextResponse.json(
			{ error: "Hubo un error al obtener el ID del usuario." },
			{ status: 500 }
		);
	}
}
