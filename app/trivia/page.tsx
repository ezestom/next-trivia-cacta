"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const questions = [
   {
      id: "q1",
      question: "¿Cuál es la capital de Francia?",
      options: ["Londres", "París", "Berlín"],
      correctAnswer: 1, // Indice de la respuesta correcta (en este caso, "París")
   },
   {
      id: "q2",
      question: "¿En qué año se fundó Google?",
      options: ["1998", "2000", "2002"],
      correctAnswer: 0, // "1998"
   },
   {
      id: "q3",
      question: "¿Cuál es el río más largo del mundo?",
      options: ["Amazonas", "Nilo", "Misisipi"],
      correctAnswer: 0, // "Amazonas"
   },
   {
      id: "q4",
      question: "¿Cuál es el país más grande del mundo?",
      options: ["Rusia", "Canadá", "China"],
      correctAnswer: 0, // "Rusia"
   },
   {
      id: "q5",
      question: "¿Quién escribió 'El Principito'?",
      options: ["Antoine de Saint-Exupéry", "Julio Verne", "Gabriel García Márquez"],
      correctAnswer: 0, // "Antoine de Saint-Exupéry"
   },
   {
      id: "q6",
      question: "¿Cuál es el océano más grande del mundo?",
      options: ["Pacífico", "Atlántico", "Índico"],
      correctAnswer: 0, // "Pacífico"
   },
   {
      id: "q7",
      question: "¿Cuál es el país más poblado del mundo?",
      options: ["China", "India", "Estados Unidos"],
      correctAnswer: 0, // "China"
   },
];

export default function TriviaForm() {
   const [answers, setAnswers] = useState<{ [key: string]: number }>({});
   const [score, setScore] = useState(0);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [userId, setUserId] = useState<number | null>(null);

   const router = useRouter();

   useEffect(() => {
      const fetchUserId = async () => {
         const email = localStorage.getItem("email"); // Asume que el correo electrónico se guarda en localStorage después de enviar el formulario
         if (email) {
            const response = await fetch(`/api/getUserId?email=${email}`);
            const data = await response.json();

            if (data.userId) {
               setUserId(data.userId);
            } else {
               alert(data.error || "Error al obtener el ID del usuario");
            }
         }
      };

      fetchUserId();
   }, []);

   const handleClick = () => {
      if (Object.keys(answers).length < questions.length) {
         alert("Por favor, responde todas las preguntas antes de enviar.");
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

      router.push("/thanks");
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
            // Si la respuesta es correcta, muestra un mensaje de éxito
            alert("Gracias por participar! Tu puntaje ha sido " + formatScore(score) + " ya lo hemos registrado 🌵");
         } else {
            // Si hubo un error, muestra el mensaje de error
            alert(responseData.error || "Hubo un error al actualizar el puntaje.");
         }
      } catch (error) {
         // Manejo de errores en la solicitud
         console.error("Error de red:", error);
         alert("Hubo un error de red: " + error);
      }
   };





   const formatScore = (score: number) => score.toFixed(2).replace(".", ",") + "%";

   return (
      <section className="flex flex-col items-center justify-start min-h-screen font-[family-name:var(--font-geist-sans)] px-4 h-dvh">
         <h2 className="text-2xl font-semibold text-center py-6">Cacta Trivia</h2>

         <form onSubmit={handleSubmit} className="space-y-2 grid md:grid-cols-2 place-items-center gap-4 max-w-xl mx-auto px-4">
            {questions.map((q) => (
               <div key={q.id} className="space-y-2 w-full">
                  <p className="font-semibold text-start">
                     <span className="text-green-500 animate-pulse delay-700 duration-300 ease-in-out">⏺ </span>{q.question}
                  </p>
                  {q.options.map((option, index) => {
                     const isSelected = answers[q.id] === index;
                     const optionClass = isSelected ? "bg-blue-500 text-white" : "bg-transparent";

                     return (
                        <div key={index} className="flex items-start space-x-2 w-full">
                           <input
                              type="radio"
                              name={q.id}
                              id={`${q.id}-${index}`}
                              className="m-auto"
                              onChange={() => handleAnswerChange(q.id, index)}
                              checked={answers[q.id] === index}
                              disabled={isSubmitted}
                           />
                           <label htmlFor={`${q.id}-${index}`} className={`text-sm sm:text-base px-2 rounded border border-black/25 w-full ${optionClass}`}>
                              {option}
                           </label>
                        </div>
                     );
                  })}
               </div>
            ))}
            <div className="w-full flex items-center justify-center col-span-2">
               <button type="submit" className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 w-full md:w-auto">
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
