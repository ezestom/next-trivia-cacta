
import Link from "next/link"
import LogoAnimation from "../components/LogoAnimation"

export default function Response() {
   return (
      <div className="flex items-start bg-[#111826] justify-center min-h-screen font-[family-name:var(--font-poppins)] h-full p-4 text-white max-w-xl mx-auto">
         <main className="flex flex-col  row-start-2 items-center">       <LogoAnimation />

            <h3 className="text-2xl text-center font-bold text-white pb-4">
               Respuestas correctas ✅
            </h3>
            <ol className="list-inside list-decimal text-sm text-left">
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>La segunda industria con mayor impacto ambiental en el mundo es la agrícola. <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>Verdadero
               </li>
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>Los sistemas alimentarios agrícolas causan el ____ de las emisiones de efecto invernadero (emisiones Co2) en el mundo. <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>34%
               </li>
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>La manera de medir el impacto medioambiental es a traves de la huella de carbono (Emisiones Co2). <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>Falso
               </li>
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>Los sistemas alimentarios causan el ____ de las extracciones de agua dulce. <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>70%
               </li>
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>La conversión de ecosistemas naturales en tierras agrícolas es la mayor amenaza para la extinción de especies. <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>Verdadero
               </li>
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>¿Cuál es uno de los principales objetivos de la gestión de la cadena de suministro? <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>Coordinar y fusionar elementos cruciales para la producción.
               </li>
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>Definición de desarrollo sustentable según la Comisión Mundial sobre el Medio Ambiente y el Desarrollo. <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>Desarrollo que satisface las necesidades del presente sin comprometer la capacidad de las futuras generaciones para satisfacer sus propias necesidades.
               </li>
               <li className="mb-4 text-pretty" ><span className="text-blue-400 font-semibold">Pregunta: </span>¿Cuál es el propósito principal del informe de sostenibilidad? <br />
                  <span className="text-green-500 font-semibold">- Respuesta: </span>Brindar información sobre el impacto de sus políticas en la sociedad y el medio ambiente.
               </li>

            </ol>
            <div className="w-full col-span-2 py-4">
               <Link href="/thanks"
                  className="bg-blue-500 flex items-center justify-center text-white p-3 rounded hover:bg-blue-600 w-full border border-black/15">
                  Seguir
               </Link>
            </div>
         </main>
      </div>
   )
}