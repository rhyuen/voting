import React, { MouseEvent, FunctionComponent, ChangeEvent, FormEvent } from "react";

interface Props {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChoiceChange: (e: ChangeEvent<HTMLInputElement>) => void;
    choiceValues: object;
    title: string;
    setTitle: (title: string) => void;
    question: string;
    setQuestion: (question: string) => void;
    isQuestionEmpty: boolean;
    isTitleEmpty: boolean;
}



const NewPoll: FunctionComponent<Props> = ({
    onSubmit,
    onChoiceChange,
    choiceValues,
    title,
    setTitle,
    question,
    setQuestion,
    isQuestionEmpty,
    isTitleEmpty
}) => {

    const [inputCount, setInputCount] = React.useState<number>(2);

    const handleChoiceCountChange = (e: MouseEvent<HTMLButtonElement>) => {
        const { name } = e.target as HTMLButtonElement;
        if (name === "increment") {
            const incrementValue: number = inputCount + 1;
            setInputCount(incrementValue);
        }

        if (name === "decrement") {
            const decrementValue: number = inputCount - 1 >= 2 ? inputCount - 1 : inputCount;
            setInputCount(decrementValue)
        }

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label>Title</label><br />
                <input type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)} /><br />

                {
                    isTitleEmpty ? <div>Title field cannot be empty.</div> : null
                }

                <label>Question</label><br />
                <input type="text"
                    name="question"
                    value={question}
                    onChange={e => setQuestion(e.target.value)} /><br />
                {
                    isQuestionEmpty ? <div>Question field cannot be empty.</div> : null
                }

                {
                    Array.from(Array(inputCount)).map((_, i) => (
                        <div key={i}>
                            <label>Choice {i + 1}</label>
                            <br />
                            <input type="text"
                                name={`choice${i + 1}`}
                                value={choiceValues[`choice${i + 1}`]}
                                onChange={e => onChoiceChange(e)} />
                            <br />
                        </div>
                    ))
                }

                <div>
                    <button type="button" onClick={handleChoiceCountChange} name="increment">Add Choice</button>
                    <button type="button" onClick={handleChoiceCountChange} name="decrement">Remove Choice</button>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}


export default NewPoll;