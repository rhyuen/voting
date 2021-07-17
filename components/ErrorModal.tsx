import { FunctionComponent, ReactNode } from "react";


interface Props {
    handleClose: () => void;
    visible: boolean;
    handleConfirm: () => void;
    children: ReactNode;
}

const ErrorModal: FunctionComponent<Props> = ({ visible, handleConfirm, handleClose, children }) => {
    return (
        <div className="modal">
            <div className="card">
                <div>
                    <h1>Something's Gone Wrong.</h1>
                    <p>
                        Something's gone wrong.<br />
                        {children} <br />
                        <div className="form-group">
                            <button type="button"
                                className="button button--secondary"
                                onClick={handleClose}>OK</button>
                        </div>
                    </p>
                </div>
            </div>
            <style jsx>{`
                .modal{
                    background: rgba(0,0,0,0.6);
                    position: fixed;
                    display: ${visible ? "flex" : "none"};
                    justify-content: center;
                    align-items: center;                  
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 2;
                }

                .card{                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: white;
                    border-radius: .5rem;
                    width: 40rem;
                    height: 30rem;
                    padding: 2rem;
                }
            `}</style>
        </div>
    )
}

export default ErrorModal;