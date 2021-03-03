import Link from "next/link";
import {useUser} from "@auth0/nextjs-auth0";

export default function Nav(){
    const {user} = useUser();

    return (
        <nav>
            <div className="nav__container">
                <div className="left">
                    <span><Link href="/">home</Link></span>
                    <span><Link href="/about">about</Link></span>
                    <span><Link href="/contact">contact</Link></span>
                </div>
                <div className="right">
                    Welcome {  user ? user.name : "User"} <a href= "/api/auth/logout">Logout</a>
                </div>
            </div>
            <style jsx>{`                
                nav{                    
                    padding: 3vh;
                    background-color: #bdf2d8;
                    height: 8vh;                                        
                }     
                .nav__container{
                    max-width: 1000px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }   
                .left{

                }
                .right{

                }
            `}</style>
        </nav>
    )
}