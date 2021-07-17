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
    const [emptyQuestionWarning, setEmptyQuestionWarning] = useState<boolean>(false);
    const [emptyTitleWarning, setEmptyTitleWarning] = useState<boolean>(false);
    const [emptyChoiceWarning, setEmptyChoiceWarning] = useState<boolean>(false);


    const [choiceValues, setChoiceValues] = useState<Array<string>>(["", ""]);

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

        const hasBlankChoices = choiceValues.filter(choice => choice === '').length !== 0;
        if (hasBlankChoices) {
            return setEmptyChoiceWarning(true);
        }
        setEmptyChoiceWarning(false);
        setTitle("");
        setQuestion("");

        setEmptyQuestionWarning(false);
        setEmptyTitleWarning(false);


        setChoiceValues(["", ""]);

        createPoll(payload)
            .then(res => {
                setData(data.concat(res.payload));
            }).catch(e => {
                console.error(e)
            });
    }

    const handleChoices = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        const castedName = Number(name);
        console.log("handlechoices");
        console.log(`${value} (value) is of type ${typeof value} `);
        console.log(`${castedName} (name) is of type ${typeof castedName}`);

        if (!choiceValues[castedName]) {
            choiceValues[castedName] = "";
        }

        const beforeChangedValue = choiceValues.slice(0, castedName);
        const afterChangedValue = choiceValues.slice(castedName + 1);
        const updatedChoices = beforeChangedValue.concat(value).concat(afterChangedValue);
        setChoiceValues(updatedChoices);
    }

    const handleChoiceCountChange = (e) => {
        const { name } = e.target as HTMLButtonElement;

        console.log(name);

        if (name === "increment") {
            setChoiceValues(choiceValues.concat(""));
        }

        if (name === "decrement") {
            if (choiceValues.length === 2) {
                //prevent removal of choices below 2.
                //denote a prompt pointing that out.
                return;
            }
            setChoiceValues(choiceValues.slice(0, choiceValues.length - 1));
        }

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
            <h1>Make a Poll</h1>
            <NewPoll onSubmit={handleSubmit}
                onChoiceChange={handleChoices}
                onNumberOfChoicesChange={handleChoiceCountChange}
                choiceValues={choiceValues}
                title={title}
                setTitle={setTitle}
                question={question}
                isQuestionEmpty={emptyQuestionWarning}
                isTitleEmpty={emptyTitleWarning}
                isChoiceEmpty={emptyChoiceWarning}
                setQuestion={setQuestion} />
            <List data={data} />
        </Layout>
    )
}