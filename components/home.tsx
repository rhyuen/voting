import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import NewPoll from "./NewPoll";
import Layout from "./Layout";
import List from "./List";
import { Data } from "../shared/types";
import { getActivePolls, createPoll } from "../services/polls";


export default function HomePage() {

    const [data, setData] = useState<Array<Data>>([]);
    const [title, setTitle] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [choiceValues, setChoiceValues] = useState<object>({});
    const [emptyQuestionWarning, setEmptyQuestionWarning] = useState<boolean>(false);
    const [emptyTitleWarning, setEmptyTitleWarning] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title === "") {
            setEmptyTitleWarning(true);
            return;
        }

        if (title === "" || question === "") {
            setEmptyQuestionWarning(true);
            return;
        }

        const payload = {
            title,
            question,
            choices: choiceValues
        }
        setTitle("");
        setQuestion("");
        setEmptyQuestionWarning(false);
        setEmptyTitleWarning(false);
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

    const handleChoices = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        const update = {};
        update[name] = value;
        setChoiceValues(prev => {
            return Object.assign(prev, update);
        });
    }


    useEffect(() => {
        let mounted: boolean = true;
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
                isQuestionEmpty={emptyQuestionWarning}
                isTitleEmpty={emptyTitleWarning}
                setQuestion={setQuestion} />
            <List data={data} />
        </Layout>
    )
}