import { motion, AnimatePresence } from 'framer-motion'
import './AyudaModal.css'
import { useLanguage } from './LanguageContext'


export default function AyudaModal({ mostrarAyuda, setMostrarAyuda }) {
    const { t } = useLanguage()
    return (
        <AnimatePresence>
            {mostrarAyuda && (
                <motion.div
                    className="ayuda-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="ayuda-modal"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                    >
                        <h2 className="ayuda-titulo">{t('ayuda.titulo')}</h2>

                        <div className="ayuda-instrucciones">

                            <div className="ayuda-item">
                                <video
                                    className="ayuda-video"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source src="/videos/swipe.webm" type="video/webm" />
                                </video>
                                <p className="ayuda-texto">{t('ayuda.rotar')}</p>
                            </div>

                            <div className="ayuda-item">
                                <video
                                    className="ayuda-video"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source src="/videos/tapping.webm" type="video/webm" />
                                </video>
                                <p className="ayuda-texto">{t('ayuda.puntos')}</p>
                            </div>

                        </div>

                        <button
                            className="ayuda-boton"
                            onClick={() => setMostrarAyuda(false)}
                        >
                            {t('ayuda.boton')}
                        </button>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}