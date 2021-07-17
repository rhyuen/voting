import { MouseEvent, FunctionComponent, ChangeEvent, FormEvent, useState, useEffect } from "react";
import ErrorModal from "./ErrorModal";
import WarningText from "./WarningText";

interface Props {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChoiceChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onNumberOfChoicesChange: (e: MouseEvent) => void;
    choiceValues: Array<string>;
    title: string;
    setTitle: (title: string) => void;
    question: string;
    setQuestion: (question: string) => void;
    isChoiceEmpty: boolean;
    isQuestionEmpty: boolean;
    isTitleEmpty: boolean;
}



const NewPoll: FunctionComponent<Props> = ({
    onNumberOfChoicesChange,
    onSubmit,
    onChoiceChange,
    choiceValues,
    title,
    setTitle,
    question,
    setQuestion,
    isQuestionEmpty,
    isTitleEmpty,
    isChoiceEmpty
}) => {


    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='form-group form-group--vertical'>
                    <label>Title<br />
                        <input type="text"
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                    </label><br />
                    <WarningText isVisible={isTitleEmpty}>Title field cannot be empty.</WarningText>
                </div>

                <div className='form-group form-group--vertical'>
                    <label>Question<br />
                        <input type="text"
                            name="question"
                            value={question}
                            onChange={e => setQuestion(e.target.value)} />
                    </label><br />
                    <WarningText isVisible={isQuestionEmpty}>Question field cannot be empty.</WarningText>
                </div>

                <div className="form-group">
                    <WarningText isVisible={isChoiceEmpty}>Choices are not allowed to be empty.</WarningText>
                </div>
                <ul>
                    {
                        choiceValues.map((choice, i) => {
                            return (
                                <li key={i}>
                                    <label htmlFor={`choice${i}`}>
                                        Choice {i}
                                        <br />
                                        <input type="text"
                                            id={`choice${i}`}
                                            name={`${i}`}
                                            value={choice}
                                            onChange={onChoiceChange} />
                                    </label>
                                </li>
                            )
                        })
                    }
                </ul>

                <div className='form-group'>
                    <button type="button"
                        className='button button--primary'
                        onClick={onNumberOfChoicesChange}
                        name="increment">
                        Add Choice
                    </button>
                    <button type="button"
                        className='button button--secondary'
                        onClick={onNumberOfChoicesChange}
                        disabled={choiceValues.length <= 2}
                        name="decrement">
                        Remove Choice
                    </button>
                </div>
                <div className='form-group'>
                    <input type="submit" className='button button--submit' value="Submit" />
                </div>


                <style jsx>
                    {`

                    .form-group{
                        display: flex;
                    }

                    .form-group--vertical{
                        flex-direction: column;
                    }

                    label{                            
                        margin-bottom: .5rem;
                        display: flex;
                        flex-direction: column;
                    }

                    input[type='text']{                                             
                        padding: 1rem;
                        border-radius: .5rem;
                        display: flex;
                        margin: .5rem 0;
                        border: 1px solid var(--GREY);                        
                        transition: background-color .2s ease-in-out;
                        position: relative;
                    }
                    input[type='text']:focus{
                        background-color: lavender;
                        outline: 1px solid var(--PRIMARY);
                        
                    }               

                    input[type='submit']{
                        display: flex;
                        justify-content: center;
                    }
                

                    `}
                </style>
            </form>
        </>
    )
}


export default NewPoll;