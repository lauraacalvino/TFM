import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Avion from './components/Avion'
import Interface from './components/Interface'
import InfoCards from './components/InfoCards'

function CameraLogger() {
  useFrame((state) => {
    console.log(
      `Posición: [${state.camera.position.x.toFixed(2)}, ${state.camera.position.y.toFixed(2)}, ${state.camera.position.z.toFixed(2)}]`
    );
  });
  return null;
}

function App() {

  const backgroundColor = "#F2F6FF";
  
  const [seccion, setSeccion] = useState('explorar');

  return (
    <div style={{ width: "100vw", height: "100vh", position: 'relative', overflow: 'hidden', backgroundColor: backgroundColor}}>
    <Interface seccion={seccion} setSeccion = {setSeccion} />

    {seccion === 'explorar' ? (

      <Canvas 
        camera={{ position: [-345.06, 44.00, 0.64], fov: 35 }} 
        gl={{ 
          toneMappingExposure: 1.2, 
          logarithmicDepthBuffer: true
        }}
      >
        <color attach="background" args={[backgroundColor]} />
        
        <ambientLight intensity={4.5} /> 
        <directionalLight position={[10, 20, 10]} intensity={3.5} />

        <Environment preset="night" /> 

        <Avion/>

        <CameraLogger />

        <OrbitControls makeDefault minDistance={250} maxDistance={350} enablePan = {false} />
      </Canvas>

    ):(
      <div className = "info-section-container"> 
        <InfoCards/>
      </div>
    )}
    </div>
  )
}

export default App