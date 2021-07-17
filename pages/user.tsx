import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import List from "../components/List"
import { getUserCreatedPolls } from "../services/polls";

export default function UserHome() {
    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        getUserCreatedPolls()
            .then(res => {
                if (mounted) {
                    setData(res.payload);
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
            <List data={data} />
        </Layout>
    )
}