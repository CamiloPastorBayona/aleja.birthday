# Contexto del proyecto — Invitación XV Años

## Objetivo
Página web de invitación digital para los XV años de **Kate Alejandra Reyes
Tutillo** (sobrina del dueño del repo). Debe verse bonita, elegante y estar
optimizada para abrirse desde el celular, ya que se compartirá por WhatsApp a
los invitados. La estética sigue el estilo de invitaciones tipo Canva, pero en
paleta **celeste** (azul claro) con detalles dorados y tema **Cenicienta**
(carruaje, zapatilla de cristal, destellos).

## Referencia de diseño
Página de ejemplo en la que se inspira (es de otra quinceañera, en otros
colores): https://ideaspublicidad.my.canva.site/valentina2
Nuestra versión replica esa idea pero en celeste/dorado.

## Datos del evento (confirmados, definitivos)
- **Festejada:** Kate Alejandra Reyes Tutillo
- **Padres:** José Luis Reyes y Raiza Tutillo
- **Fecha:** 6 de febrero de 2027, recepción 19:30 (7:30 p. m.)
- **Lugar:** Salón Trattoria Piccolo Mondo, Piso 2, Guayaquil – Ecuador
  (mapa: https://maps.app.goo.gl/aQFghqWAoDMtEgsX7)
- **Vestimenta:** Etiqueta / formal de gala. Colores reservados: Lila · Celeste · Plateado
- **WhatsApp confirmación:** 593967358137 (en `RSVP.tsx`)
- **Paleta:** celeste + **plateado** (antes dorado); noche un poco más celeste

## Stack técnico
- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Estética high-tech elegante**: fondo azul medianoche + celeste, acentos
  dorados, **glassmorphism**, brillos y profundidad. Tema Cenicienta con
  **ilustraciones SVG originales** (sin imágenes con copyright).
- Estilos con **CSS Modules** (un `.module.css` por componente, en `src/styles/`)
  + utilidades globales en `globals.css`: `.glass`, `.gold-text`, `.eyebrow`,
  `.divider-gold`.
- Fuentes Google vía `next/font/google`: Great Vibes (script), Cormorant
  Garamond (serif) y **Montserrat** (sans, etiquetas high-tech).
- **three.js** + **@react-three/fiber** + **@react-three/drei**: fondo 3D, con
  **carga diferida** y **fallback CSS** en móviles de gama baja.
- **framer-motion**: animaciones de aparición al hacer scroll + parallax del Hero.
- **Audio**: música de fondo `/public/audio/music.mp3` (en bucle, con fundido)
  + efecto de botones `/public/audio/shine.mp3` (vía Web Audio para baja latencia).
- Nieve global en **Canvas 2D**.
- Deploy en **Vercel**, repo en GitHub: https://github.com/CamiloPastorBayona/aleja.birthday

## Estructura
```
src/
  app/
    layout.tsx      → metadata, viewport, fuentes; envuelve en AudioProvider + SnowField
    page.tsx        → ensambla las secciones + MusicToggle
    globals.css     → sistema de diseño (paleta, .glass, utilidades) y reset
  components/
    intro/
      EnvelopeIntro.tsx     → portada de apertura: sobre sellado que se abre con
                              un toque, revela la web e inicia la música (client)
    Legend.tsx              → storytelling cinematográfico por scroll: frases que
                              aparecen/desvanecen (framer-motion useScroll, client)
    Hero.tsx                → portada: fondo 3D, parallax, ilustraciones (client)
    Invitation.tsx          → texto de invitación en tarjeta glass + castillo
    story/
      Story.tsx             → storytelling por capítulos: escenas nocturnas
                              ilustradas con parallax 3D, estrellas y estallido
                              de brillos + sonido al tocar (client)
    EventDetails.tsx        → tarjetas glass fecha/hora/lugar + zapatilla
    Countdown.tsx           → cuenta regresiva en vivo al 2027-02-06 (client)
    RSVP.tsx                → confirmar por WhatsApp, con sfx en botones (client)
    Footer.tsx              → cierre con varita mágica
    Reveal.tsx              → wrapper de animación de scroll (framer-motion, client)
    SectionHeading.tsx      → encabezado reutilizable (eyebrow + título dorado)
    SnowField.tsx           → nieve global Canvas 2D (client)
    illustrations/
      CinderellaArt.tsx     → ilustraciones SVG (carruaje, zapatilla, castillo,
                              vestido, reloj, varita, tiara, estrella)
    three/
      Scene3D.tsx           → escena 3D (polvo redondo + cristal/gema) (client)
      Scene3DLazy.tsx       → decide cargar el fondo 3D o fallback según equipo
      Crown3D.tsx           → corona 3D detallada que gira (Hero, client)
      Crown3DLazy.tsx       → carga la corona 3D o muestra el SVG Tiara de fallback
    audio/
      AudioProvider.tsx     → motor Web Audio: música + sfx (context, client)
      MusicToggle.tsx       → botón flotante play/pausa de música (client)
  styles/           → un CSS Module por componente
```

## Paleta de color (en `globals.css`)
- `--celeste: #a8d8ea` · `--celeste-light: #d6eef8` · `--celeste-dark: #5bafd6` · `--celeste-deep: #2e86c1`
- `--gold: #d4af37` · `--gold-light: #f0d97a`
- Textos: `--text-dark: #1a2a3a` · `--text-mid: #3a5068`

## ⚠️ Pendientes importantes
1. **Número de WhatsApp:** en `src/components/RSVP.tsx`, la constante
   `WHATSAPP_NUMBER` tiene un valor de EJEMPLO (`573001234567`). Cambiar por el
   número real (formato internacional sin `+` ni espacios: `57` + número).
2. **Audio:** los archivos viven en `/public/audio/` (`music.mp3`, `shine.mp3`).
   Para cambiarlos, reemplaza esos archivos (mismos nombres) o ajusta las
   constantes `MUSIC_SRC` / `SHINE_SRC` en `AudioProvider.tsx`.
3. Mejoras solicitadas aún no hechas: itinerario del evento, ubicación con mapa,
   vista previa al compartir (OG image), código de vestimenta visual, galería
   con fotos reales.

## Flujo de desarrollo
```bash
npm install      # solo la primera vez (crea node_modules, no se sube a git)
npm run dev      # servidor local en http://localhost:3000, recarga en vivo
```
Para publicar: `git add -A && git commit -m "..." && git push` → Vercel
redeploya automáticamente con cada push a `main`.

## Convenciones / guía para editar
- Mantener todo en **español** (textos visibles para los invitados).
- Respetar la paleta celeste/dorado; usar las variables CSS, no colores sueltos.
- Componentes que usan estado/efectos/hooks o audio deben llevar `"use client"`.
- Prioridad: que se vea bien en **móvil** primero (el 3D tiene fallback ligero).
- Cada componente tiene su propio CSS Module; reusar las utilidades de
  `globals.css` (`.glass`, `.gold-text`, `.eyebrow`, `.divider-gold`).
- Reusar `<Reveal>` para animar secciones al hacer scroll y `<SectionHeading>`
  para los títulos. Para sonido en botones: `useAudio().playSfx(...)`.
- Respetar `prefers-reduced-motion` (ya lo hacen nieve, 3D y animaciones).
