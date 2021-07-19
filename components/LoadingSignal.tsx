import { ReactNode, FunctionComponent } from "react";

interface Props {
    children?: ReactNode;
}

const WarningText: FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <div className="loading">
            {children}
            <div className='spinner'></div>
            <style jsx>{`
                @keyframes rotate{
                    0%{
                        transform: rotate(0deg);
                    }
                    25%{
                        transform: rotate(90deg);
                    }
    
                    50%{
                        transform: rotate(180deg);
                    }
    
                    75%{
                        transform: rotate(270deg);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }

                .loading{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    border: 1px solid var(--GREY);
                    font-size: 1.2rem;
                    font-weight: 600;
                    border-radius: 1rem;
                    padding: 5rem;
                    background: white;
                    margin: 5rem 0;
                }
                .spinner{
                    margin-top: 2rem;
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                    border: 1rem solid var(--GREY);
                    border-top-color: var(--PRIMARY);
                    animation: rotate 1s infinite linear;
                }
            `}</style>
        </div>
    )
}

export default WarningText;