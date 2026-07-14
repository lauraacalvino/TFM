import { motion, AnimatePresence } from 'framer-motion'
import { infoData } from '../data/infoData'
import { useLanguage } from './LanguageContext'
import './Puntopopup.css'

export default function PuntoPopup ({ puntoSeleccionado, onClose }) {
    const { t } = useLanguage()

    const infoActual = infoData.find(item => item.id === puntoSeleccionado);
    const textos = puntoSeleccionado ? t(`popups.${puntoSeleccionado}`) : null;

    return (
        <AnimatePresence>
            {puntoSeleccionado && infoActual && textos && (
                <motion.div
                    className="popup-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="popup-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    >

                        <div className="popup-header">
                            <h2 className="popup-title">{textos.titulo.toUpperCase()}</h2>
                            <button className="popup-close" onClick={onClose}>×</button>
                        </div>

                        <p className="popup-description">{textos.descripcion}</p>

                        {textos.detalles.map((det, i) => (
                            <div key={i} className="popup-detail">
                                <p className="popup-question">{det.pregunta}</p>
                                <p className="popup-answer">{det.respuesta}</p>
                            </div>
                        ))}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}