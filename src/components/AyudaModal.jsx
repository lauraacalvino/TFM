import { motion, AnimatePresence } from 'framer-motion'
import '../App.css'

export default function AyudaModal({ mostrarAyuda, setMostrarAyuda }) {
    return (
        <AnimatePresence>
            {mostrarAyuda && (
                <motion.div 
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMostrarAyuda(false)}
                    style={{ zIndex: 10000 }}
                >
                    <motion.div 
                        className="modal-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Guía de Navegación</h2>
                        <p>Bienvenido a <strong>Anatomy of Flight</strong>.</p>
                        <ul>
                            <li><strong>Rotar:</strong> Clic izquierdo y arrastra.</li>
                            <li><strong>Zoom:</strong> Rueda del ratón.</li>
                            <li><strong>Puntos:</strong> Clic en los números para info.</li>
                        </ul>
                        <button className="btn-close" onClick={() => setMostrarAyuda(false)}>Entendido</button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}