export function Consumer({ onConsume, isEmpty, isActivado }) {
    if (!isActivado) {
        return null; // No renderizar el botón si no está activado
    }
    return (
        <div>
            <button onClick={onConsume} disabled={isEmpty} className="btn btn-warning mt-3">
                {isEmpty ? "No hay tacos para consumir" : "Consumir taco"}  
            </button>
        </div>
    );
}


export function ActivarConsumer({ consumerActivado, isActivado, isOtroActivado , isEmpty}) {
    if(isEmpty && !isActivado) {
        return (
            <div className="mt-3">
              <button onClick={consumerActivado} className="btn btn-warning" disabled="true">
                ¡Contenedor vacio!
              </button>
            </div>
          );
    }
    return (
      <div className="mt-3">
        <button onClick={consumerActivado} className="btn btn-success" disabled={isOtroActivado}>
          {isActivado ? "Salir de contenedor" : "Entrar a contenedor"}
        </button>
      </div>
    );
  }

export function MensajeConsumidor({isActivado}) {
    if(!isActivado) {
        return (
            <div className='d-flex'>
                <p className='mt-4'>Consumidor durmiendo zZzZ</p>
            </div>
        )
    }
}