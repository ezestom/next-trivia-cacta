// import Image from "next/image";
import Form from "./components/Form";
import LogoAnimation from "./components/LogoAnimation";

export default function Home() {
  return (
    <div className="flex items-start bg-[#111826] justify-center min-h-screen font-[family-name:var(--font-poppins)] h-full p-4 text-white max-w-xl mx-auto">
      <main className="flex flex-col  row-start-2 items-center">

        {/* <Image
          className="max-w-[125px] mx-auto"
          src="/logoTrivia.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <LogoAnimation />


        <ol className="list-inside list-decimal text-sm text-left">
          <li className="mb-1 text-pretty" >Mide, mejora y lidera el camino hacia una agricultura más sostenible.
          </li>
          <li className="mb-1 text-pretty" >
            ¡Participa en nuestra Trivia y obtén 1 medición gratuita!
          </li>
          <li className="mb-1 text-pretty" >
            No te pierdas el gran anuncio del ganador este 31 de marzo de 2025 en nuestras redes sociales.
          </li>
        </ol>
        <Form />
      </main>
    </div>
  );
}