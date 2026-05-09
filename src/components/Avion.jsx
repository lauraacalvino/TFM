import { useGLTF, Html } from '@react-three/drei'
import { useEffect, useState } from 'react'

const PUNTOS_INTERACTIVOS = [
    { id: 1, nombre: 'POI_Fuselaje' },
    { id: 2, nombre: 'POI_Alas' },
    { id: 3, nombre: 'POI_Motores' },
    { id: 4, nombre: 'POI_Alerones' },
    { id: 5, nombre: 'POI_Pitot' },
    { id: 6, nombre: 'POI_Cola' },
    { id: 7, nombre: 'POI_APU' },
    { id: 8, nombre: 'POI_Spoilers' },
    { id: 9, nombre: 'POI_Flaps' },
    { id: 10, nombre: 'POI_Cabina' },
    { id: 11, nombre: 'POI_Tren' },
]

export default function Avion() {

    const { scene } = useGLTF('/airplane3.glb')
    const [puntosOcultos, setPuntosOcultos] = useState({})

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setRGB(1,1,1);

                child.material.roughness = 0.5;

                child.material.polygonOffset = true;
                child.material.polygonOffsetFactor = -1;
                child.material.polygonOffsetUnits = -1;
                
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <group>
            <primitive object={scene} scale={1} position={[0, 0, 0]} />
            {PUNTOS_INTERACTIVOS.map(({ id, nombre }) => {
                const punto = scene.getObjectByName(nombre)
                const estaOculto = puntosOcultos[id]

                if (!punto) return null

                return (
                    <Html
                        key={id}
                        position={[punto.position.x, punto.position.y, punto.position.z]}
                        occlude
                        onOcclude={(oculto) => {
                            setPuntosOcultos((estadoActual) => {
                                if (estadoActual[id] === oculto) return estadoActual

                                return {
                                    ...estadoActual,
                                    [id]: oculto,
                                }
                            })
                        }}
                    >
                        <div
                            className={[
                                'punto-interactivo',
                                estaOculto ? 'punto-interactivo--oculto' : 'punto-interactivo--visible',
                                `punto-interactivo--${id}`,
                            ].join(' ')}
                        >
                            {id}
                        </div>
                    </Html>
                )
            })}
        </group>
    )
}
