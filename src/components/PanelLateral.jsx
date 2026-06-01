import './PanelLateral.css'
import { PUNTOS_INTERACTIVOS } from './Avion'

const NOMBRES = {
    1: 'Fuselaje',
    2: 'Alas',
    3: 'Motores',
    4: 'Alerones',
    5: 'Pitot',
    6: 'Cola',
    7: 'APU',
    8: 'Spoilers',
    9: 'Flaps',
    10: 'Cabina',
    11: 'Tren',
}

export default function PanelLateral({puntoSeleccionado, setPuntoSeleccionado}) {
    return (
        <div className="panel-lateral">
            {PUNTOS_INTERACTIVOS.map(({ id }) => (
                <button
                key={id}
                className={`panel-slot ${puntoSeleccionado === id ? 'active' : ''}`}
                onClick={() => setPuntoSeleccionado(puntoSeleccionado === id ? null : id)}
                title={NOMBRES[id]}
                >

                    {id}

                </button>
            ))}
        </div>
    )
}