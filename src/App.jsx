import { useState, useEffect } from 'react';
import CircularBuffer from './components/CircularBuffer';
import 'bootstrap/dist/css/bootstrap.min.css';

const BUFFER_SIZE = 25; 

function App() {
    // Estado para el buffer circular
    const [buffer, setBuffer] = useState(Array(BUFFER_SIZE).fill(null));
    const [head, setHead] = useState(0);
    const [tail, setTail] = useState(0);
    const [contador, setContador] = useState(0);
    const [pausa, setPausa] = useState(false);

    const [productorActivo, setProductorActivo] = useState(false);
    const [consumidorActivo, setConsumidorActivo] = useState(false);
    const [mensaje, setMensaje] = useState("");

    // tiempo aleatorio para dormir
    const getTiempoRandom = () => Math.floor(Math.random() * 3000) + 1000; 

    // cantidad aleatoria para producir/consumir
    const getCantidadTacos = () => Math.floor(Math.random() * 5) + 1; 

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            setPausa(!pausa); 
            setMensaje(pausa ? "Producción reanudada" : "Producción pausada (Presiona ESC)");
          }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [pausa]);

    // productor
    useEffect(() => {
        if (pausa || productorActivo){
            return;
        } 

        // Verificar si el productor puede entrar
        if (contador < BUFFER_SIZE && !consumidorActivo) {
            const sleepTime = getTiempoRandom();
            const timer = setTimeout(() => {
                setProductorActivo(true);
                setMensaje("Productor entrando al buffer...");
                
                // Verificar si el productor puede producir
                if((BUFFER_SIZE-contador) < getCantidadTacos()){
                    setMensaje(`Productor no puede producir ${getCantidadTacos()} tacos`);

                    // Salir 
                    setTimeout(() => {
                        setProductorActivo(false);
                        setMensaje("");
                    }, 2000);
                } else{
                    // Producir tacos después de delay
                    setTimeout(() => {
                        const itemsToProduce = Math.min(getCantidadTacos(), BUFFER_SIZE - contador);
                        producirTacos(itemsToProduce);
                    }, 1000);
                }
                
            }, sleepTime);

            return () => clearTimeout(timer);
        } 
    }, [contador, consumidorActivo, productorActivo, pausa]);

    // consumidor
    useEffect(() => {
        if (pausa || consumidorActivo){
            return;
        }

        // Verificar si el consumidor puede entrar
        if (contador > 0 && !productorActivo) {
            const sleepTime = getTiempoRandom();
            const timer = setTimeout(() => {
                setConsumidorActivo(true);
                setMensaje("Consumidor entrando al buffer...");

                // Verificar si el consumidor puede consumir
                if(contador < getCantidadTacos()){
                    setMensaje(`Consumidor no puede consumir ${getCantidadTacos()} tacos`);

                    // Salir 
                    setTimeout(() => {
                        setConsumidorActivo(false);
                        setMensaje("");
                    }, 2000);
                } else{
                    // Consumir tacos después de delay
                    setTimeout(() => {
                        const itemsToConsume = Math.min(getCantidadTacos(), contador);
                        consumirTacos(itemsToConsume);
                    }, 1000);
                }
                
            }, sleepTime);

            return () => clearTimeout(timer);
        }
    }, [contador, productorActivo, consumidorActivo, pausa]);

    // Función para producir múltiples items
    const producirTacos = (cantidad) => {
        let currentContador = contador;
        let currentTail = tail;
        let newBuffer = [...buffer];
        
        for (let i = 0; i < cantidad && currentContador < BUFFER_SIZE; i++) {
            newBuffer[currentTail] = "🌮";
            currentTail = (currentTail + 1) % BUFFER_SIZE;
            currentContador++;
        }
        
        setBuffer(newBuffer);
        setTail(currentTail);
        setContador(currentContador);
        if(cantidad > 1){
            setMensaje(`Productor produjo ${cantidad} tacos`);
        }
        else{
            setMensaje(`Productor produjo ${cantidad} taco`);
        }
        
        // Salir después de producir
        setTimeout(() => {
            setProductorActivo(false);
            setMensaje("");
        }, 1000);
    };

    // Función para consumir múltiples items
    const consumirTacos = (cantidad) => {
        let currentContador = contador;
        let currentHead = head;
        let newBuffer = [...buffer];
        
        for (let i = 0; i < cantidad && currentContador > 0; i++) {
            newBuffer[currentHead] = null;
            currentHead = (currentHead + 1) % BUFFER_SIZE;
            currentContador--;
        }
        
        setBuffer(newBuffer);
        setHead(currentHead);
        setContador(currentContador);
        if(cantidad > 1){
            setMensaje(`Consumidor consumió ${cantidad} tacos`);
        }
        else{
            setMensaje(`Consumidor consumió ${cantidad} taco`);
        }
        
        // Salir después de consumir
        setTimeout(() => {
            setConsumidorActivo(false);
            setMensaje("");
        }, 1000);
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center">Productor-Consumidor</h1>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 text-center alert alert-info">
                    <h2>Productor</h2>
                    <p>{productorActivo ? "Trabajando" : "Durmiendo"}</p>
                </div>
                <div className="col-md-6 text-center mt-sm-5 mt-md-0 alert alert-warning">
                    <h2>Consumidor</h2>
                    <p>{consumidorActivo ? "Trabajando" : "Durmiendo"}</p>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12 d-flex flex-column align-items-center">
                    <h3 className="text-center mb-3">{mensaje}</h3>
                    <CircularBuffer 
                        buffer={buffer} 
                        actionProducer={productorActivo} 
                        actionConsumer={consumidorActivo}
                    />
                    <div className="mt-3">
                        <p>tacos en buffer: {contador}/{BUFFER_SIZE}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;