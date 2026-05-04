import { useGLTF, Html } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function Avion() {

    const { scene } = useGLTF('/airplane3.glb')

    const punto1 = scene.getObjectByName('POI_Fuselaje');
    const punto2 = scene.getObjectByName('POI_Alas');
    const punto3 = scene.getObjectByName('POI_Motores');
    const punto4 = scene.getObjectByName('POI_Alerones');
    const punto5 = scene.getObjectByName('POI_Pitot');
    const punto6 = scene.getObjectByName('POI_Cola');
    const punto7 = scene.getObjectByName('POI_APU');
    const punto8 = scene.getObjectByName('POI_Spoilers');
    const punto9 = scene.getObjectByName('POI_Flaps');
    const punto10 = scene.getObjectByName('POI_Cabina');
    const punto11 = scene.getObjectByName('POI_Tren');

    const distancia_puntos = 8;


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
            {punto1 && (
                <Html position={[punto1.position.x, punto1.position.y, punto1.position.z]}
                    occlude
                >
                    <div className= "punto-interactivo">1</div>
                </Html>
            )}
            {punto2 && (
                <Html position={[punto2.position.x, punto2.position.y, punto2.position.z]}
                occlude
                >
                    <div className="punto-interactivo">2</div>
                </Html>
            )}
            {punto3 && (
                <Html position={[punto3.position.x, punto3.position.y, punto3.position.z]}
                occlude
                >
                    <div className="punto-interactivo">3</div>
                </Html>
            )}
            {punto4 && (
                <Html position={[punto4.position.x, punto4.position.y, punto4.position.z]}
                occlude
                >
                    <div className="punto-interactivo">4</div>
                </Html>
            )}
            {punto5 && (
                <Html position={[punto5.position.x, punto5.position.y, punto5.position.z]}
                occlude
                >
                    <div className="punto-interactivo">5</div>
                </Html>
            )}
            {punto6 && (
                <Html position={[punto6.position.x, punto6.position.y, punto6.position.z]}
                occlude
                >
                    <div className="punto-interactivo">6</div>
                </Html>
            )}
            {punto7 && (
                <Html position={[punto7.position.x, punto7.position.y, punto7.position.z]}
                occlude
                >
                    <div className="punto-interactivo">7</div>
                </Html>
            )}
            {punto8 && (
                <Html position={[punto8.position.x, punto8.position.y, punto8.position.z]}
                occlude
                >
                    <div className="punto-interactivo">8</div>
                </Html>
            )}
            {punto9 && (
                <Html position={[punto9.position.x, punto9.position.y, punto9.position.z]}
                occlude
                >
                    <div className="punto-interactivo">9</div>
                </Html>
            )}
            {punto10 && (
                <Html position={[punto10.position.x, punto10.position.y, punto10.position.z]}
                occlude
                >
                    <div className="punto-interactivo">10</div>
                </Html>
            )}
            {punto11 && (
                <Html position={[punto11.position.x, punto11.position.y, punto11.position.z]}
                occlude
                >
                    <div className="punto-interactivo">11</div>
                </Html>
            )}

        </group>
    )
}