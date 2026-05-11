import { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import Avion, { PUNTOS_INTERACTIVOS } from './Avion'

const tmpCamPos = new THREE.Vector3()
const tmpTarget = new THREE.Vector3()

function CameraFly({ puntoSeleccionado, controlsRef, onFlyEnd, volando }) {
    const { camera } = useThree()

    useFrame(() => {
        if (!volando || !puntoSeleccionado) return

        const punto = PUNTOS_INTERACTIVOS.find(p => p.id === puntoSeleccionado)
        if (!punto) return

        const [tx, ty, tz] = punto.camara
        tmpCamPos.set(tx, ty, tz)
        tmpTarget.set(0, 0, 0)

        camera.position.lerp(tmpCamPos, 0.05)

        if (controlsRef.current) {
            controlsRef.current.target.lerp(tmpTarget, 0.05)
            controlsRef.current.update()
        }

        if (camera.position.distanceTo(tmpCamPos) < 1) {
            camera.position.copy(tmpCamPos)
            if (controlsRef.current) {
                controlsRef.current.target.copy(tmpTarget)
                controlsRef.current.update()
            }
            onFlyEnd()
        }
    })

    return null
}

export default function ExplorarScene({ backgroundColor, setMostrarAyuda }) {
    const [puntoSeleccionado, setPuntoSeleccionado] = useState(null)
    const [volando, setVolando] = useState(false)
    const controlsRef = useRef()

    const handleSeleccionar = (id) => {
        setPuntoSeleccionado(id)
        if (id !== null) setVolando(true)
    }

    const resetCamera = () => {
        if (controlsRef.current) controlsRef.current.reset()
        setPuntoSeleccionado(null)
        setVolando(false)
    }

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

                <CameraFly
                    puntoSeleccionado={puntoSeleccionado}
                    controlsRef={controlsRef}
                    volando={volando}
                    onFlyEnd={() => setVolando(false)}
                />

                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    enabled={!volando}
                    minDistance={100}
                    maxDistance={350}
                    enablePan={true}
                />
            </Canvas>
        </>
    )
}