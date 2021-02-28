import Link from "next/link";

export default function Nav(){
    return (
        <nav>
            <span><Link href="/">home</Link></span>
            <span><Link href="/about">about</Link></span>
            <span><Link href="/contact">contact</Link></span>
           
        </nav>
    )
}