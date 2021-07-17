import { ReactNode, FunctionComponent } from "react";

interface Props {
    children: ReactNode;
}

const EmptyListNotice: FunctionComponent<Props> = ({ children }) => {

    return (
        <section className="notice">
            {children}
            <style jsx>{`
                
                .notice{
                    
                    border: 2px solid var(--GREY);
                    border-radius: .5rem;
                    color: var(--DARK-GREY);
                    font-size: 1.2rem;
                    font-weight: 600;                                
                    display: flex;
                    flex-grow: 1;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                    margin: 1rem 0;            
                }

            `}</style>
        </section>
    )
}

export default EmptyListNotice;