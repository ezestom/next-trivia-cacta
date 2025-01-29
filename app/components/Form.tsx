'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

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

   const handleRedirect = (userId: number) => {
      router.push(`/trivia?id=${userId}`); // Redirigir a trivia con el id del usuario
      // subir al local storage el email
      localStorage.setItem("email", email);
   };

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
         alert("Formulario enviado exitosamente.");
         handleRedirect(participantId); // Redirigir a trivia con el ID del usuario
      } else {
         alert("Hubo un error al enviar el formulario.");
      }
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
         <input
            className="w-full p-2 border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
         />
         <input
            className="w-full p-2 border rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            required
         />
         <input
            className="w-full p-2 border rounded"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="^\d{1,3}\s?\d{0,2}\s?\d{2,4}\s?\d{2,4}\s?\d{0,4}$"
            placeholder="Teléfono Ej: 54 9 11 1234 5678"
            required
         />
         <input
            className="w-full p-2 border rounded"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Compañía"
            required
         />
         <input
            className="w-full p-2 border rounded"
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="Sector"
            required
         />
         <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensaje (opcional) max. 150 caracteres"
            maxLength={150}
            rows={4}
            className="w-full p-2 border rounded resize-none"
         />
         {
            loading ? (
               <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit" disabled>
                  Enviando...
               </button>
            ) : (
               <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">
                  Ir a la trivia
               </button>
            )
         }
      </form>
   );
}
export default Form;
