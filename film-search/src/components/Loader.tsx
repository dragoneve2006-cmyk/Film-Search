//Componente Loader per caricamnento in caso di connesione lenta

export const Loader = () => {
    return(
        <div className="loader-container">
            <div className="loader"></div>
            <p>Cambia connessione che forse è meglio</p>
        </div>
    );
};