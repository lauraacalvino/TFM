import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Avion from './Avion'
import PuntoPopup from './Puntopopup'

export default function ExplorarScene({ backgroundColor, setMostrarAyuda }) {
    const [puntoSeleccionado, setPuntoSeleccionado] = useState(null);
    const controlsRef = useRef();

    const resetCamera = () => {
        if (controlsRef.current) controlsRef.current.reset();
    };

    return (
        <>
            <div className="side-buttons">
                <button className="btn-round help" onClick={() => setMostrarAyuda(true)}>?</button>
                <button className="btn-round reset" onClick={resetCamera}>↺</button>
            </div>

            <Canvas 
                camera={{ position: [-345.06, 44.00, 0.64], fov: 35 }} 
                gl={{ toneMappingExposure: 1.2, logarithmicDepthBuffer: true }}
            >
                <color attach="background" args={[backgroundColor]} />
                <ambientLight intensity={4.5} /> 
                <directionalLight position={[10, 20, 10]} intensity={3.5} />
                <Environment preset="night" /> 
                
                <Avion 
                    setPuntoSeleccionado={setPuntoSeleccionado}
                    puntoSeleccionado={puntoSeleccionado} 
                />

                <OrbitControls 
                    ref={controlsRef} 
                    makeDefault 
                    minDistance={250} 
                    maxDistance={350} 
                    enablePan={false} 
                />
            </Canvas>

            <PuntoPopup
                puntoSeleccionado={puntoSeleccionado}
                onClose={() => setPuntoSeleccionado(null)}
            />
        </>
    );
}