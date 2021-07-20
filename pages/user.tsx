import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import List from "../components/List"
import { getUserCreatedPolls } from "../services/polls";
import LoadingSignal from "../components/LoadingSignal";

export default function UserHome() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        getUserCreatedPolls()
            .then(res => {
                if (mounted) {
                    setData(res.payload);
                    setLoading(false);
                }
                return () => mounted = false;
            }).catch(e => {
                console.log(e);
            });
        return () => {
            mounted = false;
        }
    }, []);



    return (
        <Layout>
            <h1>Your created Polls</h1>
            {isLoading ? <LoadingSignal /> : <List data={data} />}
        </Layout>
    )
}