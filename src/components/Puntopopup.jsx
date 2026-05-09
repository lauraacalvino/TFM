import { motion, AnimatePresence } from 'framer-motion'
import { infoData } from '../data/infoData'
import './PuntoPopup.css'

export default function PuntoPopup ({ puntoSeleccionado, onClose }) {
    const infoActual = infoData.find(item => item.id === puntoSeleccionado);

    return (
        <AnimatePresence>
            {puntoSeleccionado && infoActual && (
                <motion.div
                    className="popup-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="popup-card"
                        initial={{ scale: 0.85, y: 24, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.85, y: 24, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="popup-header">
                            <h2 className="popup-title">{infoActual.titulo.toUpperCase()}</h2>
                            <button className="popup-close" onClick={onClose}>×</button>
                        </div>

                        <p className="popup-description">{infoActual.descripcion}</p>

                        {infoActual.detalles.map((det, i) => (
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