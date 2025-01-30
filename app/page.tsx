import Image from "next/image";
import Form from "./components/Form";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] h-dvh px-4">
      <main className="flex flex-col gap-8 row-start-2 items-center">

        <Image
          className="max-w-[100px] drop-shadow-md mx-auto"
          src="/logo-color.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-inside list-decimal text-sm text-left">
          <li className="mb-1" >Participa por 1 de las 10 bonificaciones del <strong>25% off</strong> en nuestra App.</li>
          <li className="mb-1" >
            Completa el formulario y haz clic en <strong>Ir a la trivia.</strong>
          </li>
          <li className="mb-1" >
            Si estas entre los ganadores, recibirás un correo con <strong>la bonificación.</strong>
          </li>
        </ol>
        <Form />
      </main>
    </div>
  );
}