import './Interface.css'
import Button from './Button'
import { useLanguage } from './LanguageContext'


export default function Interface({ seccion, setSeccion }) {
    const { t } = useLanguage()
    
    return (
        <div className="interface-container">

            {seccion === 'explorar' && (
                <i className="ri-box-3-fill title-360"></i>
            )}

            {seccion === 'info' && (
                <h1 className='title-info'>{t('tituloInfo')}</h1>
            )}

            <div className='button-group'>
                <Button
                    variant="nav"
                    active={seccion === 'explorar'}
                    onClick={() => setSeccion('explorar')}
                >
                    <span>{t('nav.explorar')}</span>
                    <div className="btn-dot" />
                </Button>

                <Button
                    variant="nav"
                    active={seccion === 'info'}
                    onClick={() => setSeccion('info')}
                >
                    <span>{t('nav.info')}</span>
                    <div className="btn-dot" />
                </Button>
            </div>

        </div>
    )
}