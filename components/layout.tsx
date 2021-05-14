import Nav from "./Nav";

export default function Layout({ children }) {
    return (
        <div>
            <Nav></Nav>
            <main>
                {children}
            </main>
            <style jsx>{`
                main{
                    max-width: 1000px;
                    margin: 0 auto;                    
                }
            `}
            </style>
        </div>
    )
}