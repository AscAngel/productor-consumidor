function CircularBuffer({ buffer, actionProducer, actionConsumer }) {
  let mensaje = "";
  if (actionProducer) {
      mensaje = "Productor produciendo...";
  }
  if (actionConsumer) {
      mensaje = "Consumidor consumiendo...";
  }
  return (
  
    <div className="container ">
      <h3 className="text-center">{mensaje}</h3>
      <div className="row justify-content-center"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 60px)",
        gap: "10px",
        marginTop: "20px",
      }}>
          {buffer.map((item, index) => (
          <div
              key={index}
              style={{
              width: "60px",
              height: "60px",
              border: "2px solid #555",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: item ? "#ffebcd" : "#f0f0f0",
              fontSize: "1.8rem",
              }}
          >
              {item || index + 1}
          </div>
          ))}
      </div>
    </div>
  );
}

export default CircularBuffer;