import Nav from "./Nav";

export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            <main>
                <section>{children}</section>

                <aside>
                    <h2>Recent updates</h2>
                </aside>
            </main>
            <style jsx>{`
                main{
                    max-width: 1000px;
                    margin: 0 auto;                    
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                }

                section{
                    grid-column: 1/span 1;
                    display: flex;
                    flex-direction: column;
                }

                aside{
                    grid-column: 2/span 1;
                    display: flex;
                    flex-direction: column;
                }

                @media screen and (min-width: 750px) and (max-width: 999px){

                }

                @media screen and (min-width: 1000px){

                }

            `}
            </style>
        </div>
    )
}