function Queue({ queue }){
    return (
        <div>
            <h2>Cola de tortillas</h2>
            <div style={{display : "flex", gap : "10px", flexWrap : "wrap"}}>
                {queue.map((item, index) => (
                    <div
                    key={index}
                    style={{
                        fontSize: "2rem",
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "10px",
                        backgroundColor: "#fff8dc",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                        }}
                    >
                    {item} 
                    
                  </div>
                ))}
            </div>
        </div>
    );
}

export default Queue;