import { FunctionComponent } from "react";

const LandingPage: FunctionComponent<{}> = () => {
    return (
        <main>
            <h1>choose</h1>
            <p>Make and vote in polls</p>
            <div>
                <a className="link link--primary" href="/api/auth/login">Login</a>
                <a className="link link--secondary" href="/api/auth/login">Signup</a>
            </div>
            <style jsx>{
                `
                    main{
                        width: 100vw;
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    h1{
                        font-size: 4rem;                        
                        margin-bottom: 1rem;
                        user-select:none;
                    }
                    p{
                        font-size: 2rem;
                        padding-bottom: 2rem;
                        user-select: none;
                        
                    }

                    .link{
                        padding: 1rem 4rem;
                        border: .2rem solid var(--PRIMARY);
                        border-radius 1rem;
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin-right: .75rem;
                        transition: color .2s ease-in-out, background .2s ease-in-out;
                    }
                    .link:last-child{
                        margin-right: 0;
                    }
                    .link--primary{
                        background: var(--PRIMARY);
                        color: white;
                    }
                    .link--primary:hover{
                        background: white;
                        color: var(--PRIMARY);
                    }
                    .link--secondary{
                        
                    }
                    .link--secondary:hover{
                        background: lavender;
                    }

                    
                  
                
                `
            }</style>
        </main>
    )
}

export default LandingPage;