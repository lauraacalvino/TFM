import { useState } from 'react'
import Interface from './components/Interface'
import InfoCards from './components/InfoCards'
import ExplorarScene from './components/ExplorarScene'
import AyudaModal from './components/AyudaModal'
import './App.css'
import FlashScreen from './components/FlashScreen'

function App() {
  const backgroundColor = "#F2F6FF";
  const [seccion, setSeccion] = useState('explorar');
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [flashListo, setFlashListo] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", position: 'relative', overflow: 'hidden', backgroundColor: backgroundColor }}>

      <FlashScreen onFinish={() => setFlashListo(true)} />

      {flashListo && (
        <>
          <Interface seccion={seccion} setSeccion={setSeccion} />
          {seccion === 'explorar' ? (
            <ExplorarScene backgroundColor={backgroundColor} setMostrarAyuda={setMostrarAyuda} />
          ) : (
            <InfoCards />
          )}
          <AyudaModal mostrarAyuda={mostrarAyuda} setMostrarAyuda={setMostrarAyuda} />
        </>
      )}

      <Interface seccion={seccion} setSeccion={setSeccion} />

      {seccion === 'explorar' ? (
        <ExplorarScene
          backgroundColor={backgroundColor}
          setMostrarAyuda={setMostrarAyuda}
        />
      ) : (
        <InfoCards />
      )}

      <AyudaModal mostrarAyuda={mostrarAyuda} setMostrarAyuda={setMostrarAyuda} />
    </div>
  )
}

export default App