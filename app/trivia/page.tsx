"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";



const questions = [
   {
      id: "q1",
      question: "La segunda industria con mayor impacto ambiental en el mundo es la agrícola.",
      options: ["Verdadero", "Falso", "No está claro"],
      correctAnswer: 0, // "Verdadero"
   },
   {
      id: "q2",
      question: "Los sistemas alimentarios agrícolas causan el ____ de las emisiones de efecto invernadero (emisiones Co2) en el mundo.",
      options: ["18%", "25%", "34%"],
      correctAnswer: 2, // "34%"
   },
   {
      id: "q3",
      question: "La manera de medir el impacto medioambiental es a traves de la huella de carbono (Emisiones Co2).",
      options: ["Verdadero", "Falso", "No está claro"],
      correctAnswer: 1, // "Falso"
   },
   {
      id: "q4",
      question: "Los sistemas alimentarios causan el ____ de las extracciones de agua dulce.",
      options: ["55%", "63%", "70%"],
      correctAnswer: 2, // "70%"
   },
   {
      id: "q5",
      question: "La conversión de ecosistemas naturales en tierras agrícolas es la mayor amenaza para la extinción de especies.",
      options: ["Verdadero", "Falso", "No está claro"],
      correctAnswer: 0, // "Verdadero"
   },
   {
      id: "q6",
      question: "¿Cuál es uno de los principales objetivos de la gestión de la cadena de suministro?",
      options: ["Maximizar los costos en todas las etapas del proceso.", "Coordinar y fusionar elementos cruciales para la producción.", "Minimizar el valor en cada etapa del proceso."],
      correctAnswer: 1, // "Coordinar y fusionar elementos cruciales para la producción."
   },
   {
      id: "q7",
      question: "Definición de desarrollo sustentable según la Comisión Mundial sobre el Medio Ambiente y el Desarrollo.",
      options: ["La sostenibilidad significa no usar ningún recurso natural para evitar el daño al planeta. ", "Si un negocio es rentable, entonces es sostenible porque puede mantenerse en el tiempo. ", "Desarrollo que satisface las necesidades del presente sin comprometer la capacidad de las futuras generaciones para satisfacer sus propias necesidades."],
      correctAnswer: 2, // "Desarrollo que satisface las necesidades del presente sin comprometer la capacidad de las futuras generaciones para satisfacer sus propias necesidades."
   },
   {
      id: "q8",
      question: "¿Cuál es el propósito principal del informe de sostenibilidad?",
      options: ["Fomentar un enfoque más coherente y eficiente en el reporting corporativo.", "Influenciar la percepción pública y mejorar la reputación de la empresa. ", "Brindar información sobre el impacto de sus políticas en la sociedad y el medio ambiente. "],
      correctAnswer: 2, // "Brindar información sobre el impacto de sus políticas en la sociedad y el medio ambiente. "
   }
];

export default function TriviaForm() {
   const [answers, setAnswers] = useState<{ [key: string]: number }>({});
   const [score, setScore] = useState(0);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [userId, setUserId] = useState<number | null>(null);

   const router = useRouter();

   useEffect(() => {
      const fetchUserId = async () => {
         const email = localStorage.getItem("email");
         if (email) {
            const response = await fetch(`/api/getUserId?email=${email}`);
            const data = await response.json();

            if (data.userId) {
               setUserId(data.userId);
            } else {
               console.log(data.error || "Error al obtener el ID del usuario");
            }
         } else {
            console.log("No se encontró el email en el almacenamiento.");
         }
      };

      fetchUserId();
   }, []);

   const handleClick = () => {
      if (Object.keys(answers).length < questions.length) {
         Swal.fire({
            title: "¡Faltan respuestas!",
            text: "Por favor, responde todas las preguntas antes de enviar.",
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#FF0000", // Puedes elegir un color de botón
         });
         return false; // Indica que faltan respuestas
      }
      return true; // Todo está respondido
   };

   const handleAnswerChange = (questionId: string, selectedOption: number) => {
      if (!isSubmitted) {
         setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedOption }));
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!handleClick()) return; // Detiene la ejecución si faltan respuestas

      setIsSubmitted(true);

      let correctAnswers = 0;
      questions.forEach((q) => {
         if (answers[q.id] === q.correctAnswer) {
            correctAnswers += 1;
         }
      });

      const scorePercentage = (correctAnswers / questions.length) * 100;
      setScore(scorePercentage);

      if (userId !== null) {
         await handleSubmitScore(userId, scorePercentage);
      }

      // router.push("/thanks");
   };

   const handleSubmitScore = async (participantId: number, score: number) => {
      // Obtener el email desde el localStorage
      const email = localStorage.getItem("email");

      // Verificar si se encontró el email
      if (!email) {
         alert("No se encontró el email en el almacenamiento.");
         return;
      }

      // Preparar los datos para enviar al backend
      const data = { email, score };
      console.log('Datos a enviar:', data); // Verifica los datos antes de enviarlos

      try {
         // Realizar la solicitud POST a la API para guardar el puntaje
         const response = await fetch("/api/saveScore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data), // Enviar los datos como JSON
         });

         const responseData = await response.json(); // Leer la respuesta del servidor
         console.log('Respuesta del servidor:', responseData); // Verifica la respuesta

         if (response.ok) {
            // Si la respuesta es correcta, muestra el mensaje con el puntaje y espera a que el usuario confirme
            Swal.fire({
               title: "Gracias por participar!",
               html: `Tu puntaje es <b style="color: #2563eb;">${formatScore(score)}</b> 🎯<br><br>`,
               icon: "success",
               confirmButtonText: "Seguir",
               cancelButtonText: "Respuestas",
               showCancelButton: true, // Habilita el segundo botón
               confirmButtonColor: "#2563eb",
               cancelButtonColor: "#22c55e",
            }).then((result) => {
               if (result.isConfirmed) {
                  // Solo redirige cuando el usuario hace clic en "Aceptar"
                  router.push("/thanks");
               } else if (result.dismiss === Swal.DismissReason.cancel) {
                  router.push("/response");
               }
            });
         } else {
            // Si hubo un error, muestra el mensaje de error
            console.log(responseData.error || "Hubo un error al actualizar el puntaje.");
         }
      } catch (error) {
         // Manejo de errores en la solicitud
         console.error("Error de red:", error);
      }
   };


   const formatScore = (score: number) => score.toFixed(2).replace(".", ",") + "%";

   return (
      <section className="flex flex-col items-center justify-start min-h-screen font-[family-name:var(--font-poppins)]  bg-[#111826] h-full">
         <h2 className="text-3xl font-black bg-[#374151]/50 rounded text-center p-8 my-2 border border-black/15">
            <Image src="/logoTrivia2.png"
               width={85}
               height={85} alt="cacta-logo" />Trivia </h2>

         <form onSubmit={handleSubmit} className="grid grid-cols-2 grid-rows-2  place-items-start gap-2 max-w-xl mx-auto px-1">
            {questions.map((q) => (
               <div key={q.id} className="space-y-2 w-full bg-[#374151]/50 rounded py-8 px-4 h-full border border-black/15 relative">
                  <p className="font-normal pb-2 text-balance text-start justify-start text-sm">
                     {q.question}
                  </p>
                  {q.options.map((option, index) => {
                     const isSelected = answers[q.id] === index;
                     const optionClass = isSelected ? "bg-blue-500 text-white" : "bg-transparent";

                     return (
                        <div key={index} className="flex items-start w-full">
                           <input
                              type="radio"
                              name={q.id}
                              id={`${q.id}-${index}`}
                              className="m-auto hidden peer"
                              onChange={() => handleAnswerChange(q.id, index)}
                              checked={answers[q.id] === index}
                              disabled={isSubmitted}
                           />
                           <label htmlFor={`${q.id}-${index}`} className={`text-xs p-2 rounded border border-gray-500 w-full text-pretty ${optionClass}`}>
                              {option}
                           </label>
                        </div>
                     );
                  })}
               </div>
            ))}
            <div className="w-full col-span-2 py-4">
               <button type="submit" className="bg-blue-500  text-white p-3 rounded hover:bg-blue-600 w-full  border border-black/15">
                  Enviar Respuestas
               </button>
            </div>
         </form>

         {score >= 0 && isSubmitted && (
            <div className="mt-6 text-xl font-semibold">
               <p>Puntaje: {formatScore(score)}</p>
            </div>
         )}
      </section>
   );
}
