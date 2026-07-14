import './PanelLateral.css'
import { PUNTOS_INTERACTIVOS } from './Avion'
import { useLanguage } from './LanguageContext'

export default function PanelLateral({puntoSeleccionado, setPuntoSeleccionado}) {
    const { t } = useLanguage()

    return (
        <div className="panel-lateral">
            {PUNTOS_INTERACTIVOS.map(({ id }) => (
                <button
                key={id}
                className={`panel-slot ${puntoSeleccionado === id ? 'active' : ''}`}
                onClick={() => setPuntoSeleccionado(puntoSeleccionado === id ? null : id)}
                title={t(`panelLateral.${id}`)}
                >

                    {id}

                </button>
            ))}
        </div>
    )
}