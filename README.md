# ⭐ Feliz Cumpleaños Mi Ñori 💜

Una página web romántica, moderna e interactiva creada especialmente para celebrar el cumpleaños de **"Mi Ñori"**.

---

## ✨ Características Principales

- 🌌 **Cielo Estrellado Dinámico:** Fondo negro `#000000` con estrellas titilantes y estrellas fugaces en Canvas.
- 🎨 **Paleta Romántica:** Negro, Lila `#A855F7`, Moradito `#C084FC` y Blanco `#FFFFFF`, con efectos de resplandor (*glow*).
- 💐 **Ramo de Estrellas y Flores:** Ilustración artística en SVG de flores y estrellas en lila, moradito y blanco, con lacito lila y animación flotante suave.
- 💌 **Tarjeta de Amor:** Tarjeta blanca con borde lila de 4px, sombra brillante, espacio para foto y dedicatoria romántica.
- ⭐ **21 Motivos Interactivos:**
  - 21 estrellitas en degradado lila con borde blanco.
  - Al hacer clic: explosión de confeti lila, morado y blanco con `canvas-confetti`.
  - Modal animado con *"Motivo X de 21"*, título y hermosa prosa romántica.
  - Cambio a color blanco una vez descubierta para llevar el registro visual.
  - Barra de progreso interactiva *"X/21 motivos descubiertos"*.
- 👑 **Celebración Final:** Modal especial y lluvia de fuegos artificiales de confeti al completar los 21 motivos con la frase:
  > *"¡Descubriste los 21 motivos! Ahora ya sabes por qué eres mi Ñori, mi todo."*
- 🎶 **Música Romántica de Fondo:** Reproductor flotante con melodía de cajita de música mágica integrada (Web Audio API) y soporte para tu propio archivo de audio MP3.
- 📱 **100% Responsive:** Adaptado para teléfonos celulares, tablets y computadoras.

---

## 🚀 Vista Previa Inmediata (Sin instalar nada)

Puedes abrir y probar la página inmediatamente:
1. Dirígete a la carpeta del proyecto:
   `C:\Users\eriks\.gemini\antigravity\scratch\cumple-mi-nori\`
2. Haz doble clic en el archivo **`preview.html`** para abrirlo en tu navegador favorito (Chrome, Edge, etc.).

---

## 📸 Cómo Cambiar la Foto de "Mi Ñori"

1. Elige tu foto favorita con ella en formato JPG.
2. Cámbiale el nombre a `mi-nori.jpg`.
3. Cópiala y pégala dentro de la carpeta:
   `cumple-mi-nori/public/mi-nori.jpg` (reemplazando la imagen de muestra).

---

## 🎵 Cómo Cambiar la Música de Fondo (Opcional)

1. Elige una canción romántica en formato MP3.
2. Nómbrala `romantic-music.mp3`.
3. Pégala en la carpeta:
   `cumple-mi-nori/public/romantic-music.mp3`.
*(Si no colocas ninguna, la página incluye una melodía mágica relajante de notas sintetizadas automáticamente).*

---

## 🌐 Cómo Publicarlo en Vercel para Enviarle el Link

Para que ella pueda abrirlo desde su celular desde cualquier parte del mundo con su propio link:

### Opción A (La más recomendada - Con GitHub):
1. Crea una cuenta gratuita en [GitHub.com](https://github.com) si aún no tienes una.
2. Crea un nuevo repositorio (por ejemplo: `cumple-mi-nori`).
3. Sube los archivos de esta carpeta a ese repositorio.
4. Entra a [Vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
5. Haz clic en **"Add New Project"** y selecciona tu repositorio `cumple-mi-nori`.
6. Haz clic en **"Deploy"**. En 1 minuto tendrás un enlace público como:
   `https://cumple-mi-nori.vercel.app` para compartírselo por WhatsApp con un mensaje bonito.

### Opción B (Con Vercel CLI desde la terminal):
1. Abre una terminal dentro de la carpeta `cumple-mi-nori`.
2. Ejecuta:
   ```bash
   npx vercel
   ```
3. Sigue las instrucciones en pantalla y ¡listo!

---

## 💻 Desarrollo Local (Next.js)

Si tienes Node.js instalado y quieres ejecutar el entorno de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
