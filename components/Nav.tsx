import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function Nav() {
    const { user } = useUser();

    return (
        <nav>
            <div className="nav__container">
                <div className="left">
                    <span className="nav__container__item">
                        <Link href="/">
                            <a>choose</a>
                        </Link>
                    </span>
                    <span className="nav__container__item">
                        <Link href="/user">
                            <a>Your Polls</a>
                        </Link>
                    </span>
                </div>
                <div className="right">
                    {user ? user.name : "User"} <a href="/api/auth/logout">Logout</a>
                </div>
            </div>
            <style jsx>{`                
                nav{                    
                    margin: 0 1rem;                    
                    height: 5rem;                           
                }     
                .nav__container{
                    max-width: 1000px;
                    height: 100%;
                    margin: 0 auto;                    
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }   

                .nav__container__item{
                    margin-right: 2rem;
                }

                a{
                    font-size: 1rem;
                    font-weight: 600;                    
                }                    
                a:hover{
                    text-decoration: underline;
                }                     
            
            `}</style>
        </nav>
    )
}