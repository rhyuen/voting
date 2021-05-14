import { useUser } from "@auth0/nextjs-auth0";
import Home from "../components/Home";

export default function Index() {
    const { user, error, isLoading } = useUser();
    if (isLoading) {
        return <div>loading.</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }


    if (user) {
        return (
            <Home />
        )
    }

    return (
        <div>
            <h1>vote in a poll</h1>
            <a href="/api/auth/login">Login / Signup</a>
        </div>
    );
}