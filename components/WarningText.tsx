import { ReactNode, FunctionComponent } from "react";

interface Props {
    children: ReactNode;
    isVisible: boolean;
}

const WarningText: FunctionComponent<Props> = ({ isVisible, children }) => {
    if (isVisible) {

        return (
            <div className="warning">
                {children}
                <style jsx>{`
                    
                    .warning{
                        
                        border: 2px solid palevioletred;
                        border-radius: .5rem;
                        color: palevioletred;
                        font-size: 1.2rem;
                        font-weight: 600;                                
                        display: flex;
                        flex-grow: 1;
                        justify-content: center;
                        align-items: center;
                        padding: 0.5rem 1rem;
                        margin: 1rem 0;            
                    }

                `}</style>
            </div>
        )
    } else {
        return null
    }
}

export default WarningText;