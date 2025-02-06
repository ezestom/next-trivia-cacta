//app/components/email-template.tsx
import * as React from "react";
interface EmailTemplateProps {
   name: string;
}

export const EmailTemplate = ({ name }: EmailTemplateProps) => (
   <div style={{ fontFamily: "'Poppins', sans-serif", padding: "50px", backgroundColor: "#111826", borderRadius: "8px", color: "#fff", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", maxWidth: "600px", margin: "0 auto" }}>¡Gracias por tu registro, {name}!</h2>

      <div>
         <p style={{ fontSize: "16px", marginBottom: "10px" }}>🔒 Tu código</p>

         <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#fff", backgroundColor: "#374151", padding: "10px", borderRadius: "8px", margin: "10px 0" }}>CACTA-EA-001-20</h1>
      </div>

      <p style={{ fontSize: "16px", marginBottom: "10px" }}>📅 Recuerda que tu código es válido hasta el 14 de abril de 2025.</p>
      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
         Hay que crear este template, necesito la Información!
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

      <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
         <p style={{ fontSize: "18px" }}>Prevé el cambio, moldealo a tu favor.</p>
         <p style={{ fontSize: "16px" }}>¿Preparado para comenzar?</p>
      </div>
   </div>
);

export default EmailTemplate;
