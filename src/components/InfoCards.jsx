import './InfoCards.css';
import { infoData } from '../data/infoCards';
import { motion } from "motion/react"
import { useRef, useEffect } from 'react';

export default function InfoCards() {

    const containerRef = useRef(null)
    const timeoutRef = useRef(null)

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

    return (
        <div className="info-section-container" ref={containerRef}>
            <div className='cards-grid'>
                {infoData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="info-card"
                        initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                            duration: 0.5,
                            ease: [0.34, 1.56, 0.64, 1],
                            delay: index * 0.07
                        }}
                    >
                        <h2 className="card-title">{item.titulo}</h2>
                        {item.descripcion && <p className="card-desc">{item.descripcion}</p>}
                        <div className='card-content'>
                            <p className='card-question'>{item.pregunta}</p>
                            <p className='card-answer'>{item.respuesta}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}