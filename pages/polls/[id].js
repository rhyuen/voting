import Layout from "../../components/layout.js";
import React from "react";


export async function getServerSideProps(context){
    const {id} = context.params;

    const BASEURL = "http://localhost:3000";

    const url = `${BASEURL}/api/poll/${id}`;
        
    const res = await fetch(url);
    const payload = await res.json();                
    
    const data = payload.data[0];    
    return {
        props: {
            data
        }
    }
}



export default function Poll({data}){    
    const [choice, setChoice] = React.useState("");   
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [updatedResults, setUpdatedResults] = React.useState({});
    

    const handleSubmit = e => {        
        e.preventDefault();
        setChoice("");
        console.log(choice);
        const payload = {
            poll: data._id,
            value: choice
        };
        
        const url = `/api/post-id-poll`;
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
                setUpdatedResults(res.data);
                setIsSubmitted(true);
                console.log(res);
            }).catch(e => {
                
                console.log(e);
            });
    }

    return (
        <Layout>          
        {      
            Object.keys(data).length === 0 ? 
            <h1>Loading</h1> : isSubmitted ? <Results data = {updatedResults}/> :(
            <>                    
                <h1>{data.title}</h1>    
                <h2>{data.question}</h2>
                <form onSubmit = {handleSubmit}>
                    {                        
                        data.choices.map(({name}, choice_index) => (                                    
                            <p key={choice_index}>
                                <input type="radio" 
                                    id={name} 
                                    name={data._id} 
                                    value={name}  
                                    checked={choice===name}                                   
                                    onChange={e => setChoice(e.target.value)}/>
                                <label htmlFor={name}>{name}</label>                                    
                            </p>
                        ))
                    }     
                    <input type = "submit" value="Vote" onClick = {handleSubmit}/>
                </form>                            
            </>
            )
        }
        </Layout>
    )
}

const Results = ({data}) => {
    
    return( 
        <>                    
            <h1>{data.title}</h1>    
            <h2>{data.question}</h2>
            <ul>
                {                        
                    data.choices.map(({count, name}, results_index) => (                                    
                        <li key={results_index}>
                            {name}: {count}                    
                        </li>
                    ))
                }     
            </ul>
        </>    
    );
}