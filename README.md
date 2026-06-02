# Alejandra XV 🩵

Invitación digital de XV años — **Kate Alejandra Reyes Tutillo**
Tema: Cenicienta · Color: Celeste · 6 de febrero de 2027

Construida con Next.js 14 (App Router) + TypeScript. Secciones: portada con
carruaje, invitación, detalles del evento, cuenta regresiva en vivo,
confirmación de asistencia por WhatsApp y pie de página, con efecto de
destellos animados.

## ⚙️ Configurar antes de publicar

Edita `src/components/RSVP.tsx` y cambia el número de WhatsApp por el tuyo
(formato internacional, sin `+` ni espacios):

```ts
const WHATSAPP_NUMBER = "573001234567"; // ← cambia por tu número real
```

## 🚀 Deploy en Vercel

1. Sube este proyecto a un repositorio de GitHub (ver más abajo).
2. Entra a [vercel.com](https://vercel.com) → **Add New… → Project**.
3. Importa el repositorio → Vercel detecta Next.js automáticamente.
4. Haz clic en **Deploy** ✨

## 💻 Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📦 Subir a GitHub (primera vez)

```bash
git remote add origin https://github.com/TU_USUARIO/alejandra-15.git
git branch -M main
git push -u origin main
```
