// import Image from "next/image";
import Form from "./components/Form";
import LogoAnimation from "./components/LogoAnimation";

export default function Home() {
  return (
    <div className="flex items-start justify-center min-h-screen font-[family-name:var(--font-geist-sans)] h-dvh p-4">
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
          <li className="mb-1 text-pretty" >Participa por 1 de las 10 bonificaciones del <strong>25% off.</strong> </li>
          <li className="mb-1 text-pretty" >
            Completa el formulario y haz clic en <strong>Ir a la trivia.</strong>
          </li>
          <li className="mb-1 text-pretty" >
            Los ganadores, recibirán un email con <strong>la bonificación.</strong>
          </li>
        </ol>
        <Form />
      </main>
    </div>
  );
}