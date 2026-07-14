import { createContext, useContext, useState } from 'react'
import { translations } from '../data/Translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [idioma, setIdioma] = useState('es')

    const t = (clave) => {
        const keys = clave.split('.')
        let valor = translations[idioma]
        for (const key of keys) {
            valor = valor?.[key]
        }
        return valor ?? clave
    }
    return (
        <LanguageContext.Provider value={{ idioma, setIdioma, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    return useContext(LanguageContext)
}