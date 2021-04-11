
interface Props {
    handleClose: () => void;
    visible: boolean
    handleConfirm: () => void
}

const Modal: React.FunctionComponent<Props> = ({ visible, handleConfirm, handleClose }) => {
    return (
        <div className="modal">
            <div className="card">
                <div>
                    <h1>Modal</h1>
                    <p>
                        Are you sure?<br />
                        <button type="button" onClick={handleConfirm}>Yes</button>
                        <button type="button" onClick={handleClose}>Cancel</button>
                    </p>
                </div>
            </div>
            <style jsx>{`
                .modal{
                    background: rgba(0,0,0,0.4);
                    position: fixed;
                    display: ${visible ? "flex" : "none"};
                    justify-content: center;
                    align-items: center;                  
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 2;
                }

                .card{                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: white;
                    width: 10rem;
                    height: 20rem;
                    padding: 2rem;
                }
            `}</style>
        </div>
    )
}

export default Modal;