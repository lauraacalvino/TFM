import './InfoCards.css';
import { infoData, categorias } from '../data/infoCards';
import { motion, AnimatePresence } from "motion/react"
import { useRef, useEffect, useState } from 'react';
import Button from './Button'
import { useLanguage } from './LanguageContext'


export default function InfoCards() {
    const { t } = useLanguage()

    const [categoriaActiva, setCategoriaActiva] = useState(categorias[0].id)
    const containerRef = useRef(null)
    const timeoutRef = useRef(null)

    const cardsActivas = infoData.filter(item =>
        categorias.find(c => c.id === categoriaActiva)?.ids.includes(item.id)
    )

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const handleScroll = () => {
            el.classList.add('is-scrolling')
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                el.classList.remove('is-scrolling')
            }, 800)
        }
        el.addEventListener('scroll', handleScroll)
        return () => {
            el.removeEventListener('scroll', handleScroll)
            clearTimeout(timeoutRef.current)
        }
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0
        }
    }, [categoriaActiva])

    return (
        <div className="info-layout">

            {/* o panel esquerdo de categorías */}
            <div className="categorias-panel">
                {categorias.map(cat => (
                    <Button
                        key={cat.id}
                        variant="categoria"
                        active={categoriaActiva === cat.id}
                        onClick={() => setCategoriaActiva(cat.id)}
                        title={t(`categorias.${cat.id}`)}
                    >
                        <i className={cat.icono}></i>
                        <span>{t(`categorias.${cat.id}`)}</span>
                    </Button>
                ))}
            </div>

            {/* parte dereita coas cards */}
            <div className="info-section-container" ref={containerRef}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={categoriaActiva}
                        className="cards-grid"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {cardsActivas.map((item, index) => {
                            const textos = t(`cards.${item.id}`)
                            return (
                                <motion.div
                                    key={item.id}
                                    className="info-card"
                                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.34, 1.56, 0.64, 1],
                                        delay: index * 0.08
                                    }}
                                >
                                    {item.icono && <img src={item.icono} className="card-icon" alt="" />}
                                    <h2 className="card-title">{textos.titulo}</h2>
                                    {textos.descripcion && <p className="card-desc">{textos.descripcion}</p>}

                                    {textos.detalles
                                        ? textos.detalles.map((det, i) => (
                                            <div key={i} className='card-content'>
                                                <p className='card-question'>{det.pregunta}</p>
                                                <p className='card-answer'>{det.respuesta}</p>
                                            </div>
                                        ))
                                        : (
                                            <div className='card-content'>
                                                <p className='card-question'>{textos.pregunta}</p>
                                                <p className='card-answer'>{textos.respuesta}</p>
                                            </div>
                                        )}
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}