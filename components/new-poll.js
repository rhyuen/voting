import React from "react";

export default function NewPoll({
    onSubmit, 
    onChoiceChange, 
    choiceValues, 
    title, 
    setTitle, 
    question, 
    setQuestion
}){   

    const [inputCount, setInputCount] = React.useState(1);

    return (
        <>
        
        <form onSubmit = {onSubmit}>
            <label>Title</label><br/>
            <input type = "text" 
                name="title" 
                value = {title} 
                onChange={e => setTitle(e.target.value)}/><br/>
            <label>Question</label><br/>
            <input type = "text" 
                name="question" 
                value = {question} 
                onChange={e => setQuestion(e.target.value)}/><br/>
                    
            {
                 Array.from(Array(inputCount)).map((_, i) => (
                    <div key={i}>
                        <label>Choice {i+1}</label>
                        <br/>
                        <input type = "text" 
                            name={`choice${i+1}`} 
                            value = {choiceValues[`choice${i+1}`]} 
                            onChange={e => onChoiceChange(e)} />                            
                        <br/>
                    </div>
                ))
            }
            
            <br/>
            <button type="button" onClick={()=>setInputCount(inputCount+1)}>Add</button>
            <button type="button" onClick={()=>setInputCount(inputCount-1)}>Remove Last Input</button>
            <br/>
            <input type = "submit" value="Submit"/>
        </form>
        </>
    )
}