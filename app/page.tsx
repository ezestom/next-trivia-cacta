import Image from "next/image";
import Form from "./components/Form";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] h-dvh">
      <main className="flex flex-col gap-8 row-start-2 items-center">

        <Image
          className="max-w-[100px] drop-shadow-md mx-auto"
          src="/logo-color.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Completa el formulario y haz clic en
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              Enviar
            </code>
            .
          </li>
          <li>Participa por una bonificación en nuestra App.
          </li>
        </ol>
        <Form />
      </main>
    </div>
  );
}