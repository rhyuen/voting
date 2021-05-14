import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function Nav() {
    const { user } = useUser();

    return (
        <nav>
            <div className="nav__container">
                <div className="left">
                    <span className="nav__container__item"><Link href="/">Home</Link></span>
                    <span className="nav__container__item"><Link href="/about">About</Link></span>
                    <span className="nav__container__item"><Link href="/contact">Contact</Link></span>
                    <span className="nav__container__item"><Link href="/user">Polls</Link></span>
                </div>
                <div className="right">
                    {user ? user.name : "User"} <a href="/api/auth/logout">Logout</a>
                </div>
            </div>
            <style jsx>{`                
                nav{                    
                    padding: 3vh;                    
                    height: 8vh; 
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                }     
                .nav__container{
                    max-width: 1000px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }   

                .nav__container__item{
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-right: 2rem;
                }
                .left{

                }
                .right{

                }
            `}</style>
        </nav>
    )
}