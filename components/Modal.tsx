import { FunctionComponent } from "react";


interface Props {
    handleClose: () => void;
    visible: boolean
    handleConfirm: () => void
}

const Modal: FunctionComponent<Props> = ({ visible, handleConfirm, handleClose }) => {
    return (
        <div className="modal">
            <div className="card">
                <div>
                    <h1>Poll Deletion Confirmation</h1>
                    <div>
                        You're the creator of this Poll and this is a confirmation that you want to delete it.  Are you sure?<br />
                        <div className="form-group">
                            <button type="button"
                                className="button button--caution"
                                onClick={handleConfirm}>Yes</button>
                            <button type="button"
                                className="button button--secondary"
                                onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
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

export default Modal;