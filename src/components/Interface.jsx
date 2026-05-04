import './Interface.css';

export default function Interface ({seccion, setSeccion}) {
    return (
        <div className="interface-container">

            {seccion === 'explorar' && (
                <h1 className='title-360'>360°</h1>
            )}
            
            {seccion === 'info' && (
                <h1 className='title-info'>CONOCE MÁS Y RESUELVE TUS DUDAS</h1>
            )}
            

            <div className='button-group'>

                <button 
                className={`btn ${seccion === 'explorar' ? 'active' : ''}`}
                onClick={() => setSeccion('explorar')}>
                    Explorar
                </button>

                <button 
                className={`btn ${seccion === 'info' ? 'active' : ''}`}
                onClick={() => setSeccion('info')}>
                    Info
                </button>

            </div>

        </div>
    );
}