'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from 'sonner'

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


   // Función para verificar si el email ya está en el local storage
   const checkLocalStorageEmail = () => {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
         setTimeout(() => {
            document.querySelectorAll('input').forEach(input => input.disabled = true);
            alert(`Ya has participado con el email ${storedEmail}. Te redirigiremos a la web, ¡suerte! 🌵`);
            router.push(`https://cacta.eco/`);
         }, 2000);
      }
   }
   checkLocalStorageEmail();

   const handleRedirect = (userId: number) => {
      router.push(`/trivia?id=${userId}`); // Redirigir a trivia con el id del usuario
      // subir al local storage el email
      if (email) {
         localStorage.setItem("email", email);
      }
   }



   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      setLoading(true);
      const response = await fetch("/api/submitForm", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ name, email, phone, company, sector, message }),
      });
      setLoading(false);

      if (response.ok) {
         const data = await response.json();
         const participantId = data.participantId; // Suponiendo que `participantId` está en la respuesta
         setUserId(participantId); // Guardar el ID del usuario
         // add sonner toast
         document.querySelectorAll('input').forEach(input => input.disabled = true);
         alert(`Gracias por participar ${name}, nos pondremos en contacto contigo a ${email}, si resultas entre los ganadores. ¡Mucha suerte! 🍀`);
         handleRedirect(participantId);// Redirigir a trivia con el ID del usuario
      } else {
         toast.error('Hubo un error al enviar el formulario.')
      }
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full bg-">
         <Toaster richColors />
         <label className="text-sm">
            Nombre y Apellido:
            <input
               className="w-full p-2 border rounded-xl"
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="ej: Juan Pérez"
               required
            />
         </label>
         <label className="text-sm">
            Email:
            <input
               className="w-full p-2 border rounded-xl"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="ej: juan_perez@cacta.eco"
               required
            />
         </label>
         <label className="text-sm">
            Teléfono:
            <input
               className="w-full p-2 border rounded-xl"
               type="text"
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               pattern="^\d{1,3}\s?\d{0,2}\s?\d{2,4}\s?\d{2,4}\s?\d{0,4}$"
               placeholder="ej: 54 9 11 1234 5678"
               required
            />
         </label>
         <label className="text-sm">
            Compañía:
            <input
               className="w-full p-2 border rounded-xl"
               type="text"
               value={company}
               onChange={(e) => setCompany(e.target.value)}
               placeholder="ej: Cacta SAS"
               required
            />
         </label>
         <label className="text-sm">
            Sector:
            <input
               className="w-full p-2 border rounded-xl"
               type="text"
               value={sector}
               onChange={(e) => setSector(e.target.value)}
               placeholder="ej: Agroindustria"
               required
            />
         </label>
         <label className="text-sm">Mensaje (opcional)
            <textarea
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Mensaje (opcional) max. 150 caracteres"
               maxLength={150}
               rows={4}
               className="w-full p-2 border rounded-xl resize-none"
            />
         </label>
         {
            loading ? (
               <button className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 border border-black/15" type="submit" disabled>
                  Enviando...
               </button>
            ) : (
               <button id="send" className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 border border-black/15" type="submit">
                  Ir a la trivia
               </button>
            )
         }
      </form>
   );
}

export default Form;
