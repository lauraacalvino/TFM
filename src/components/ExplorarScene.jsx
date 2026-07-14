import { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import Avion, { PUNTOS_INTERACTIVOS } from './Avion'
import PanelLateral from './PanelLateral'
import Button from './Button'
import SelectorIdioma from './Selectoridioma'

const HOME_POSITION = [-345.06, 44.00, 0.64]

const tmpCamPos = new THREE.Vector3() //contenedor de tres dimensions
const tmpTarget = new THREE.Vector3()

function CameraLogger() {
    useFrame((state) => {
        console.log(
            `[${state.camera.position.x.toFixed(2)}, ${state.camera.position.y.toFixed(2)}, ${state.camera.position.z.toFixed(2)}]`
        );
    });
    return null;
}

function CameraFly({ puntoSeleccionado, volando, reseteando, controlsRef, onFlyEnd, onResetEnd }) {
    const { camera } = useThree()

    useFrame(() => {
        // aqui vai voar cara un punto
        if (volando && puntoSeleccionado) {
            // buscamos no array de datos par que o obxecto coincida
            const punto = PUNTOS_INTERACTIVOS.find(p => p.id === Number(puntoSeleccionado))
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
        }

        // aqui vai voar cara home, o reset
        if (reseteando) {
            const [tx, ty, tz] = HOME_POSITION
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
                onResetEnd()
            }
        }
    })

    return null
}

export default function ExplorarScene({ backgroundColor, setMostrarAyuda }) {
    const [puntoSeleccionado, setPuntoSeleccionado] = useState(null)
    const [volando, setVolando] = useState(false)
    const [reseteando, setReseteando] = useState(false)
    const controlsRef = useRef()

    const handleSeleccionar = (id) => {
        const idNum = id === null ? null : Number(id)
        setPuntoSeleccionado(idNum)
        setReseteando(false)
        if (idNum !== null) {
            setVolando(true)
        } else {
            setVolando(false)
        }
    }

    const resetCamera = () => {
        setPuntoSeleccionado(null)
        setVolando(false)
        setReseteando(true)
    }

    return (
        <>
            <div className="side-buttons">
                <Button variant="round" onClick={() => setMostrarAyuda(true)}>
                    <i className="ri-info-i"></i>
                </Button>
                <Button variant="round" onClick={resetCamera}>
                    <i className="ri-arrow-go-back-line"></i>
                </Button>
                <SelectorIdioma />
            </div>

            <Canvas
                camera={{ position: [-345.06, 44.00, 0.64], fov: 35 }}
                gl={{ toneMappingExposure: 1.2 }}
            >
                <color attach="background" args={[backgroundColor]} />
                <ambientLight intensity={4.5} />
                <directionalLight position={[10, 20, 10]} intensity={3.5} />
                <Environment preset="night" />

                <Avion
                    setPuntoSeleccionado={handleSeleccionar}
                    puntoSeleccionado={puntoSeleccionado}
                />

                {/*<CameraLogger />*/}

                <CameraFly
                    puntoSeleccionado={puntoSeleccionado}
                    volando={volando}
                    reseteando={reseteando}
                    controlsRef={controlsRef}
                    onFlyEnd={() => setVolando(false)}
                    onResetEnd={() => setReseteando(false)}
                />

                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    enabled={!volando && !puntoSeleccionado && !reseteando}
                    minDistance={100}
                    maxDistance={350}
                    enablePan={true}
                />
            </Canvas>

            <PanelLateral
                puntoSeleccionado={puntoSeleccionado}
                setPuntoSeleccionado={handleSeleccionar}
            />
        </>
    )
}