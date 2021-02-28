import { useEffect, useState } from "react"
import NewVote from "../components/new-vote.js";
import Layout from "../components/layout.js";
import Link from "next/link";

export default function Index(){

    const [data, setData] = useState([]);

    useEffect(() => {
        const url = "/api/get-active-polls";
        fetch(url)
            .then(res => res.json())
            .then(res => {                
                setData(res.payload);
            }).catch(e => {
                console.error(e)
            });

    }, []);


    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [choiceValues, setChoiceValues] = useState({});    

    const handleSubmit = e => {
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
                update[cv]="";
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
                console.log(res)
                
                setData(data.concat(res.details));                
            }).catch(e => {
                console.error(e)
            });
    }

    const handleChoices = e => {
        const {value, name } = e.target; 
        
        const update = {};
        update[name] = value;
        setChoiceValues(prev => {
            return Object.assign(prev, update);
        });
    }

    return (
        <Layout>
            <h1>Active Votes</h1>
            <NewVote onSubmit = {handleSubmit} 
                onChoiceChange = {handleChoices}
                choiceValues = {choiceValues}
                title={title}
                setTitle = {setTitle}
                question = {question}
                setQuestion = {setQuestion}/>
            <div style={{display: "flex", flexDirection:"column-reverse"}}>            
                {
                    data === [] ? <h2>Loading</h2> :

                    data.map(({title: curr_title, question: curr_question, _id:id}, index) => {                        

                        return (
                            <div key={index}>                                                                                            
                                <Link href={`/polls/${id}`}>
                                    <a>{index} / {curr_title ?? "No Title"}:{curr_question ?? "No Question"}</a>
                                </Link><br/>                                
                            </div>
                        );
                    })
                }
                
            </div>
        </Layout>
    )
}