'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Gracias() {
	const router = useRouter();

	// Usamos useEffect para llamar a changeScene cuando el componente se monta
	useEffect(() => {
		setTimeout(() => {
			router.push("https://cacta.eco/"); // Redirige a la nueva URL después de 3 segundos
		}, 3000);
	}, [router]);

	return (
		<main className="container mx-auto p-4 text-center flex items-center justify-center flex-col h-screen bg-[#111826] w-full font-[family-name:var(--font-poppins)]">
			<div className="bg-[#374151]/50 rounded-lg text-center p-8 border border-black/15 text-white max-w-xl">
				<Image
					className="max-w-[125px] mx-auto pb-4"
					src="/logoTrivia2.png"
					alt="cacta logo"
					width={180}
					height={38}
					priority
				/>
				<h1 className="text-base font-base mb-4">
					¡Gracias por participar!
				</h1>
				<p className="mb-4 text-sm text-balance">
					Tus respuestas han sido registradas correctamente.
				</p>
			</div>
		</main>
	);
}
