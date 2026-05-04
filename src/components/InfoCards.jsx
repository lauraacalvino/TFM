import './InfoCards.css';
import {infoData} from '../data/infoCards';
import { motion } from "motion/react"

export default function InfoCards() {
    return (
        <div className = 'cards-grid'>
            {infoData.map((item, index)=>(

                <motion.div 
                key={item.id} 
                className = "info-card"
                initial={{opacity: 0, y:30}}
                animate={{opacity: 1, y:0}}
                transition={{
                    duration: 0.1,
                    ease: 'easeOut',
                    delay: index * 0.1
                }}
                >
                    <h2 className = "card-title">{item.titulo}</h2>

                    {item.descripcion && <p className = "card-desc">{item.descripcion}</p>}

                    <div className='card-content'>
                        <p className='card-question'>{item.pregunta}</p>
                        <p className='card-answer'>{item.respuesta}</p>
                        {/* {item.pregunta2 &&} */}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}