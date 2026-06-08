import './Interface.css'
import Button from './Button'

export default function Interface({ seccion, setSeccion }) {
    return (
        <div className="interface-container">

            {seccion === 'explorar' && (
                <h1 className='title-360'>360°</h1>
            )}

            {seccion === 'info' && (
                <h1 className='title-info'>CONOCE MÁS Y RESUELVE TUS DUDAS</h1>
            )}

            <div className='button-group'>
                <Button
                    variant="nav"
                    active={seccion === 'explorar'}
                    onClick={() => setSeccion('explorar')}
                >
                    <span>Explorar</span>
                    <div className="btn-dot" />
                </Button>

                <Button
                    variant="nav"
                    active={seccion === 'info'}
                    onClick={() => setSeccion('info')}
                >
                    <span>Info</span>
                    <div className="btn-dot" />
                </Button>
            </div>

        </div>
    )
}