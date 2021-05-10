import { useState, useEffect } from "react"
import NewPoll from "./new-poll";
import Layout from "./layout";
import List from "./List";
import { Data } from "../shared/types";
import { getActivePolls, createPoll } from "../services/polls";


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


        createPoll(payload)
            .then(res => {
                setData(data.concat(res.payload));
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
        let mounted = true;
        getActivePolls()
            .then(res => {
                if (mounted) {
                    setData(res.payload);
                }
            }).catch(e => {
                console.log(e);
            });

        return () => {
            mounted = false;
        }
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