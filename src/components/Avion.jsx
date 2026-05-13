import { useGLTF, Html } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { infoData } from '../data/infoData'
import './PuntoPopup.css'

export const PUNTOS_INTERACTIVOS = [
    { id: 1,  nombre: 'POI_Fuselaje', camara: [-133.75, 167.72, -200.01] },
    { id: 2,  nombre: 'POI_Alas',     camara: [-184.52, 126.24,  203.21] },
    { id: 3,  nombre: 'POI_Motores',  camara: [-173.76,  55.30,  150.25] },
    { id: 4,  nombre: 'POI_Alerones', camara: [132.45,   36.91,  186.01] },
    { id: 5,  nombre: 'POI_Pitot',    camara: [-81.48,  131.27, -101.29] },
    { id: 6,  nombre: 'POI_Cola',     camara: [ 200.46, 156.01, -241.18] },
    { id: 7,  nombre: 'POI_APU',      camara: [ 268.87, 135.63, -204.86] },
    { id: 8,  nombre: 'POI_Spoilers', camara: [ 200.65,  94.49, -136.49] },
    { id: 9,  nombre: 'POI_Flaps',    camara: [ 160.39,  56.56, -128.67] },
    { id: 10, nombre: 'POI_Cabina',   camara: [-198.07,  46.16,   64.05] },
    { id: 11, nombre: 'POI_Tren',     camara: [-173.17,  16.00,  112.39] },
]

export default function Avion({ setPuntoSeleccionado, puntoSeleccionado }) {

    const { scene } = useGLTF('/airplane4.glb')
    const [puntosOcultos, setPuntosOcultos] = useState({})

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setRGB(1,1,1)
                child.material.roughness = 0.5
                child.material.polygonOffset = true
                child.material.polygonOffsetFactor = -1
                child.material.polygonOffsetUnits = -1
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [scene])

    return (
        <group>
            <primitive object={scene} scale={1} position={[0, 0, 0]} />
            {PUNTOS_INTERACTIVOS.map(({ id, nombre }) => {
                const punto = scene.getObjectByName(nombre)
                const estaOculto = puntosOcultos[id]
                const estaSeleccionado = Number(puntoSeleccionado) === id
                const infoActual = infoData.find(item => item.id === id)


                if (!punto) return null

                const pos = [punto.position.x, punto.position.y, punto.position.z]

                return (
                    <group key={id}>
                        {/* popup con z-index medio, por enriba doutros números pero debaixo do seleccionado */}
                        <Html
                            position={pos}
                            occlude={false}
                            zIndexRange={[500, 400]}
                            style={{ overflow: 'visible', pointerEvents: 'none' }}
                        >
                            <AnimatePresence>
                                {estaSeleccionado && infoActual && (
                                    <motion.div
                                        className="popup-card"
                                        initial={{ opacity: 0, scale: 0.9, y: -4 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                                        style={{ pointerEvents: 'all' }}
                                    >
                                        <div className="popup-header">
                                            <h2 className="popup-title">{infoActual.titulo.toUpperCase()}</h2>
                                            <button
                                                className="popup-close"
                                                onClick={() => setPuntoSeleccionado(null)}
                                            >×</button>
                                        </div>

                                        <p className="popup-description">{infoActual.descripcion}</p>

                                        {infoActual.detalles.map((det, i) => (
                                            <div key={i} className="popup-detail">
                                                <p className="popup-question">{det.pregunta}</p>
                                                <p className="popup-answer">{det.respuesta}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Html>

                        {/* aqui poñemos o numero seleccionado por riba de todo */}
                        <Html
                            position={pos}
                            occlude
                            zIndexRange={estaSeleccionado ? [9999, 9000] : [100, 0]}
                            onOcclude={(oculto) => {
                                setPuntosOcultos((prev) => {
                                    if (prev[id] === oculto) return prev
                                    return { ...prev, [id]: oculto }
                                })
                            }}
                        >
                            <div
                                className={[
                                    'punto-interactivo',
                                    estaOculto ? 'punto-interactivo--oculto' : 'punto-interactivo--visible',
                                    `punto-interactivo--${id}`,
                                    estaSeleccionado ? 'punto-interactivo--seleccionado' : '',
                                ].join(' ')}
                                onClick={() => setPuntoSeleccionado(estaSeleccionado ? null : id)}
                            >
                                {id}
                            </div>
                        </Html>
                    </group>
                )
            })}
        </group>
    )
}