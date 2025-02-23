'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";



export const Form = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [company, setCompany] = useState("");
   const [sector, setSector] = useState("");
   const [message, setMessage] = useState("");
   const [loading, setLoading] = useState(false);
   const [userId, setUserId] = useState<number | null>(null); // Para guardar el id del usuario

   console.log(userId);

   const router = useRouter();


   // const checkUserExists = async (email: string) => {
   //    try {
   //       const response = await fetch(`/api/getUserId?email=${email}`);
   //       const data = await response.json();

   //       if (response.ok) {
   //          // Usuario ya registrado, redirigir directamente
   //          const participantId = data.participantId;
   //          setUserId(participantId);
   //          Swal.fire({
   //             title: "¡Ya has participado! 🌵",
   //             text: "Te redirigiremos a nuestra web, ¡gracias por participar!",
   //             icon: "info",
   //             confirmButtonText: "Ir a la web",
   //             confirmButtonColor: "#4CAF50", 
   //          }).then(() => {
   //             router.push("https://cacta.eco/"); 
   //          });

   //          return true;

   //       }
   //    } catch (error) {
   //       console.error("Error verificando usuario:", error);
   //    }
   //    return false;
   // };


   const handleRedirect = (userId: number) => {
      if (userId) {
         window.localStorage.setItem("email", email);

         router.push(`/trivia?id=${userId}`);
      } else {
         router.push(`https://cacta.eco/`);
      }
   }


   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Verificar si el usuario ya está registrado

      // const userExists = await checkUserExists(email);

      const userExists = false; // Se asume que no existe
      if (userExists) return;
      // Si ya existe, no enviamos el formulario

      setLoading(true);
      const response = await fetch("/api/submitForm", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ name, email, phone, company, sector, message }),
      });

      // Llamada a la API de Resend para enviar el email
      await fetch('/api/send', {  // Aquí llamamos a tu API de Resend
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            name,
            email, //ezequielstom@gmail.com || Cambiar cuando tenga las credenciales
         }),
      });

      setLoading(false);

      if (response.ok) {
         const data = await response.json();
         const participantId = data.participantId;
         setUserId(participantId);
         Swal.fire({
            title: `Gracias por participar ${name}!`,
            html: "El ganador será anunciado el 31 de marzo en nuestras redes sociales 🎁",
            icon: "success",
            confirmButtonText: "Seguir",
            confirmButtonColor: "#2563eb", // Color del botón
         }).then(() => {
            handleRedirect(participantId);
         });
      } else {
         console.error("Error al enviar el formulario");
      }
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full pt-4 text-sm">
         <label >
            Nombre y Apellido:
            <input
               className="w-full p-2 border rounded text-black"
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="ej: Juan Pérez"
               required
            />
         </label>
         <label >
            Email:
            <input
               className="w-full p-2 border rounded text-black"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="ej: juan_perez@cacta.eco"
               required
            />
         </label>
         <label >
            Teléfono:
            <input
               className="w-full p-2 border rounded text-black"
               type="text"
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               pattern="^\+?[0-9\s\-()]{7,20}$"
               placeholder="ej: 54 9 11 1234 5678"
               required
            />
         </label>
         <label >
            Compañía:
            <input
               className="w-full p-2 border rounded text-black"
               type="text"
               value={company}
               onChange={(e) => setCompany(e.target.value)}
               placeholder="ej: Cacta SAS"
               required
            />
         </label>
         <label >
            Sector:
            <input
               className="w-full p-2 border rounded text-black"
               type="text"
               value={sector}
               onChange={(e) => setSector(e.target.value)}
               placeholder="ej: Agroindustria"
               required
            />
         </label>
         <label >Mensaje (opcional)
            <textarea
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Mensaje (opcional) max. 150 caracteres"
               maxLength={150}
               rows={4}
               className="w-full p-2 border rounded bg-[#f9f9f9] resize-none text-black"
            />
         </label>
         <div className="py-4 w-full flex">
            <button
               id="send"
               className="bg-blue-500  p-4 rounded hover:bg-blue-600 w-full border border-black/15 disabled:bg-gray-400 disabled:cursor-not-allowed"
               type="submit"
               disabled={loading}
            >
               {loading ? "Enviando..." : "Ir a la trivia"}
            </button>

         </div>
      </form>
   );
}

export default Form;
