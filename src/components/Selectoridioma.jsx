import { useState } from 'react'
import { useLanguage } from './LanguageContext'
import './Selectoridioma.css'

const IDIOMAS = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
]

export default function SelectorIdioma() {
    const { idioma, setIdioma } = useLanguage()
    const [abierto, setAbierto] = useState(false)

    const cambiarIdioma = (code) => {
        setIdioma(code)
        setAbierto(false)
    }

    return (
        <div className="selector-idioma">
            <button
                className="btn-base btn--round"
                onClick={() => setAbierto(!abierto)}
                title="Idioma / Language"
            >
                {idioma.toUpperCase()}
            </button>

            {abierto && (
                <div className="selector-idioma__dropdown">
                    {IDIOMAS.map(({ code, label }) => (
                        <button
                            key={code}
                            className={`selector-idioma__opcion ${idioma === code ? 'active' : ''}`}
                            onClick={() => cambiarIdioma(code)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}