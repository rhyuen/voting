import Nav from "./Nav";
import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";


interface Props {
    children: ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }) => {
    return (
        <div>
            <Head>
                <title>choose</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main>
                <section>{children}</section>

                <aside>
                    <h2>Recent updates</h2>
                    <h3>July 20, 21</h3>
                    <p>
                        More styling and bug fixes.
                    </p>
                    <h3>July 16, 21</h3>
                    <p>
                        It's more responsive.  More consistent styling.
                    </p>
                    <h3>July 15, 21</h3>
                    <p>
                        Some responsiveness added. More styling.
                    </p>
                </aside>
            </main>
            <style jsx>{`
                main{
                    max-width: 1000px;
                    margin: 0 auto;                    
                    display: grid;
                    grid-template-columns: 1fr;
                }

                section{
                    grid-column: 1/span 1;
                    display: flex;
                    flex-direction: column;
                    margin: 0 1rem;
                }

                aside{
                    grid-column: 2/span 1;
                    margin-left: 1rem;
                    display: none;
                    flex-direction: column;
                }
                aside * {
                    font-size: 90%;                    
                }

                @media screen and (min-width: 750px) and (max-width: 999px){
                    main{                        
                        grid-template-columns: 1.5fr .6fr;
                    }

                    aside{                        
                        display: flex;                        
                    }
                }

                @media screen and (min-width: 1000px){
                    main{                        
                        grid-template-columns: 2fr 1fr;
                    }

                    aside{                        
                        display: flex;                        
                    }
                }

            `}
            </style>
        </div>
    )
}

export default Layout;