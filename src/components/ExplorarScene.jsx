import { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import Avion, { PUNTOS_INTERACTIVOS } from './Avion'
import PuntoPopup from './Puntopopup'

const tmpTarget = new THREE.Vector3()

function CameraFly({ puntoSeleccionado, onFlyEnd }) {
    const { camera } = useThree()
    const flyingTo = useRef(null)

    useFrame(() => {
        const punto = PUNTOS_INTERACTIVOS.find(p => p.id === puntoSeleccionado)
        if (!punto) {
            flyingTo.current = null
            return
        }

        const [tx, ty, tz] = punto.camara
        tmpTarget.set(tx, ty, tz)

        // Si acaba de cambiar el destino, marcamos que estamos volando
        if (flyingTo.current !== puntoSeleccionado) {
            flyingTo.current = puntoSeleccionado
        }

        const dist = camera.position.distanceTo(tmpTarget)
        if (dist < 1) {
            camera.position.copy(tmpTarget)
            onFlyEnd()   // avisa a ExplorarScene: ya llegamos, reactiva OrbitControls
            flyingTo.current = null
            return
        }

        camera.position.lerp(tmpTarget, 0.05)
    })

    return null
}

export default function ExplorarScene({ backgroundColor, setMostrarAyuda }) {
    const [puntoSeleccionado, setPuntoSeleccionado] = useState(null);
    const [volando, setVolando] = useState(false);
    const controlsRef = useRef();

    const handleSeleccionar = (id) => {
        setPuntoSeleccionado(id)
        if (id !== null) setVolando(true)
    }

    const resetCamera = () => {
        if (controlsRef.current) controlsRef.current.reset();
        setPuntoSeleccionado(null);
        setVolando(false);
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
                    setPuntoSeleccionado={handleSeleccionar}
                    puntoSeleccionado={puntoSeleccionado} 
                />

                {volando && (
                    <CameraFly
                        puntoSeleccionado={puntoSeleccionado}
                        onFlyEnd={() => setVolando(false)}
                    />
                )}

                <OrbitControls 
                    ref={controlsRef}
                    makeDefault
                    enabled={!volando}
                    minDistance={100} 
                    maxDistance={350} 
                    enablePan={true} 
                />
            </Canvas>

            <PuntoPopup
                puntoSeleccionado={puntoSeleccionado}
                onClose={() => setPuntoSeleccionado(null)}
            />
        </>
    );
}