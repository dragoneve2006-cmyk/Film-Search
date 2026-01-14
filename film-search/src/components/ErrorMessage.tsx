interface ErrorMessageProps {
    message: string;
}

//Messaggio di errore in caso di problemi
export const ErrorMessage = ({message}: ErrorMessageProps) => {
    return(
        <div className="error-container">
            <div className="error-icon">❌</div>
            <h2>Forse è il caso di passare alla Fibra</h2>
            <p className="error-message">{message}</p>
        </div>
    );
};