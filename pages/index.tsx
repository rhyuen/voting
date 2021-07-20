import { useUser } from "@auth0/nextjs-auth0";
import Home from "../components/Home";
import LandingPage from "../components/LandingPage";
import LoadingSignal from "../components/LoadingSignal";

export default function Index() {
    const { user, error, isLoading } = useUser();
    if (isLoading) {
        return <LoadingSignal />;
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
        <LandingPage />
    );
}