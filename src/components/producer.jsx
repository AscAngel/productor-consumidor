
export function Producer({ onProduce, isFull, isActivado }) {
    if (!isActivado) {
      return null; // No renderizar el botón si no está activado
    } 
    return (
      <div>
        <div>
            <button onClick={onProduce} disabled={isFull} className="btn btn-info mt-3">
            {isFull ? "Límite de tacos alcanzado" : "Producir taco"}
            </button>
        </div>
      </div>
      

      
    );
  }
  

export function ActivarProducer({producerActivado, isActivado, isOtroActivado, isFull}) {
    if(isFull && !isActivado) {
        return (
            <div className="mt-3">
              <button onClick={producerActivado} className="btn btn-warning" disabled="true">
                ¡Contenedor lleno!
              </button>
            </div>
          );
    }
    return (
        <div className="mt-3">
          <button onClick={producerActivado} className="btn btn-success" disabled={isOtroActivado}>
            {isActivado ? "Salir de contenedor" : "Entrar a contenedor"}
          </button>
        </div>
      );
}

export function MensajeProductor({isActivado}) {
    if(!isActivado) {
        return (
            <div className='d-flex'>
                <p className='mt-4'>Productor durmiendo zZzZ</p>
            </div>
        )
    }
}