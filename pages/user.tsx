import { useState, useEffect } from "react";
import Layout from "../components/layout";
import List from "../components/List"

export default function UserHome() {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = "/api/get-created-polls";
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res.count);
                setData(res.payload);
                setIsDataLoading(false);
            }).catch(e => {
                console.log(e);
            });
    }, []);



    return (
        <Layout>
            <section>
                <List data={data} />

            </section>
        </Layout>
    )
}