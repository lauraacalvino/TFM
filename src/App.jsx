import { useState } from 'react'
import Interface from './components/Interface'
import InfoCards from './components/InfoCards'
import ExplorarScene from './components/ExplorarScene'
import AyudaModal from './components/AyudaModal'
import './App.css'
import FlashScreen from './components/FlashScreen'
import { LanguageProvider } from './components/LanguageContext'
import { useLanguage } from './components/LanguageContext'


function AppContent() {
    const { t } = useLanguage()
    const backgroundColor = "#F2F6FF"
    const [seccion, setSeccion] = useState('explorar')
    const [mostrarAyuda, setMostrarAyuda] = useState(false)
    const [splashListo, setSplashListo] = useState(false)

    return (
        <>
            <div className="orientation-message">
                <img src="/logo.svg" alt="Anatomy of Flight" />
                <p>{t('orientacion')}</p>
            </div>
            <div className="app-container" style={{ width: "100vw", height: "100vh", position: 'relative', overflow: 'hidden', backgroundColor }}>
                <FlashScreen onFinish={() => setSplashListo(true)} />
                {splashListo && (
                    <>
                        <Interface seccion={seccion} setSeccion={setSeccion} />
                        {seccion === 'explorar'
                            ? <ExplorarScene backgroundColor={backgroundColor} setMostrarAyuda={setMostrarAyuda} />
                            : <InfoCards />
                        }
                        <AyudaModal mostrarAyuda={mostrarAyuda} setMostrarAyuda={setMostrarAyuda} />
                    </>
                )}
            </div>
        </>
    )
}

export default function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    )
}