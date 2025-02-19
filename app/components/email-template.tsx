//app/components/email-template.tsx
import * as React from "react";
interface EmailTemplateProps {
   name: string;
}

export const EmailTemplate = ({ name }: EmailTemplateProps) => (
   <div style={{ fontFamily: "'Poppins', sans-serif", padding: "50px", backgroundColor: "#111826", borderRadius: "8px", color: "#fff", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", maxWidth: "600px", margin: "0 auto" }}>🎉 ¡Gracias por participar, {name}!</h2>

      <p style={{ fontSize: "16px", marginBottom: "10px" }}>Si respondiste todas las preguntas correctamente, ¡tus chances de ganar se han duplicado! 🔥 </p>
      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
         No te pierdas el gran anuncio del ganador este 31 de marzo de 2025 en nuestras redes sociales. 📲✨
      </p>
      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
         ¡Mantente atento, la suerte podría estar de tu lado! 🍀🥳
      </p>

      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>📧 Correo:</h3>
      <ul style={{ paddingLeft: "20px" }}>
         <li><a href="mailto:vicky.engelberger@cacta.eco" style={{ color: "#3b82f6" }}>vicky.engelberger@cacta.eco</a></li>
         <li><a href="mailto:jl.cebe@cacta.eco" style={{ color: "#3b82f6" }}>jl.cebe@cacta.eco</a></li>
      </ul>

      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>🌍 Página web:</h3>
      <li><a href="https://cacta.eco/" target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6" }}>https://cacta.eco/</a></li>

      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>📱 Redes sociales:</h3>
      <ul style={{ paddingLeft: "20px" }}>
         <li><a href="https://www.facebook.com/CactaSustainabilitySolutions" target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6" }}>Facebook: Cacta Sustainability Solutions</a></li>
         <li><a href="https://www.instagram.com/cacta_eco" target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6" }}>Instagram: @cacta_eco</a></li>
         <li><a href="https://www.linkedin.com/company/cacta-sustainability-solutions" target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6" }}>LinkedIn: Cacta Sustainability Solutions</a></li>
      </ul>
   </div>
);

export default EmailTemplate;
