interface ErrorMessageProps {
    message: string;
}

//Messaggio di errore in caso di problemi con chiamta API
export const ErrorMessage = ({message}: ErrorMessageProps) => {
    return(
        <div className="error-container">
            <div className="error-icon">❌</div>
            <h2>Mi sa che non ci siamo</h2>
            <p className="error-message">{message}</p>
        </div>
    );
};