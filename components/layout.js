import Nav from "./Nav.js";

export default function Layout({children}){
    return (
        <div>
            <Nav></Nav>
            <main>
            {children}
            </main>
        </div>
    )
}