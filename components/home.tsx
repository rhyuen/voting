import { useState, useEffect } from "react"
import NewPoll from "./new-poll";
import Layout from "./layout";
import Link from "next/link";
import List from "./List";
import { Data } from "../shared/types";


export default function HomePage() {

    const [data, setData] = useState<Array<Data>>([]);
    const [title, setTitle] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [choiceValues, setChoiceValues] = useState<object>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            title,
            question,
            choices: choiceValues
        }
        setTitle("");
        setQuestion("");
        setChoiceValues(() => {
            const update = {};
            Object.keys(choiceValues).forEach(cv => {
                update[cv] = "";
            });
            return update;
        });

        const url = "/api/create-poll";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                setData(data.concat(res.details));
            }).catch(e => {
                console.error(e)
            });
    }

    const handleChoices = (e) => {
        const { value, name } = e.target;

        const update = {};
        update[name] = value;
        setChoiceValues(prev => {
            return Object.assign(prev, update);
        });
    }


    useEffect(() => {
        const url = "/api/get-active-polls";
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(data);
                setData(res.payload);
            }).catch(e => {
                console.log(e);
            });
    }, [])

    return (
        <Layout>
            <h1>Active Votes</h1>
            <NewPoll onSubmit={handleSubmit}
                onChoiceChange={handleChoices}
                choiceValues={choiceValues}
                title={title}
                setTitle={setTitle}
                question={question}
                setQuestion={setQuestion} />
            <List data={data} />
        </Layout>
    )
}