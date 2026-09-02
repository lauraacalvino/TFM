# ✈️ Anatomy of Flight

Una experiencia web 3D interactiva que permite explorar la anatomía de un avión comercial, descubriendo cómo funciona cada una de sus partes mediante un modelo 3D navegable y contenido educativo.

## 📖 Sobre el proyecto

**Anatomy of Flight** convierte un modelo 3D de avión en un recorrido guiado: el usuario puede rotar la nave, hacer clic sobre puntos interactivos repartidos por el fuselaje, las alas, los motores o la cola, y recibir una explicación clara (con preguntas frecuentes incluidas) de para qué sirve cada elemento y por qué está diseñado así.

Además del modo de exploración 3D, el proyecto incluye una vista de tarjetas informativas a modo de resumen visual rápido de todas las partes del avión.

### Características principales

- 🛩️ **Modelo 3D interactivo** del avión renderizado con Three.js / React Three Fiber, con cámara animada que vuela automáticamente hacia cada punto seleccionado.
- 📍 **Puntos interactivos** (fuselaje, alas, motores, alerones, sensores Pitot, cola, APU, spoilers, flaps) con popups informativos y detalle en formato pregunta/respuesta.
- 🗂️ **Vista de tarjetas** con toda la información organizada por categorías.
- 🌍 **Soporte multilenguaje**: español, inglés, francés y alemán.
- 🖼️ **Splash screen** de bienvenida y **modal de ayuda** para guiar al usuario.
- 📱 Diseño responsive, con aviso de orientación para dispositivos móviles.

## 🛠️ Stack tecnológico

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Three.js](https://threejs.org/) vía [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) y [@react-three/drei](https://github.com/pmndrs/drei)
- [Motion](https://motion.dev/) (Framer Motion) para animaciones de interfaz

## 🚀 Puesta en marcha

Instala las dependencias:

```bash
npm install
```

Levanta el entorno de desarrollo:

```bash
npm run dev
```

Genera la build de producción:

```bash
npm run build
```

Previsualiza la build de producción localmente:

```bash
npm run preview
```

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Avion.jsx           # Modelo 3D del avión y puntos interactivos
│   ├── ExplorarScene.jsx   # Escena 3D (canvas, cámara, controles)
│   ├── InfoCards.jsx       # Vista de tarjetas informativas
│   ├── Puntopopup.jsx      # Popup informativo de cada punto
│   ├── PanelLateral.jsx    # Panel lateral de navegación
│   ├── Selectoridioma.jsx  # Selector de idioma
│   ├── Interface.jsx       # Interfaz general / navegación entre secciones
│   ├── AyudaModal.jsx      # Modal de ayuda
│   ├── FlashScreen.jsx     # Pantalla de bienvenida
│   └── LanguageContext.jsx # Contexto de internacionalización
└── data/
    ├── Translations.js     # Textos en es/en/fr/de
    ├── infoCards.js        # Datos de la vista de tarjetas
    └── infoData.js         # Identificadores de los puntos interactivos del avión
```

## 🌐 Idiomas disponibles

- Español (es)
- English (en)
- Français (fr)
- Deutsch (de)

Los textos se gestionan de forma centralizada en `src/data/Translations.js` a través del contexto `LanguageContext`.
