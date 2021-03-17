import Layout from "../../components/layout.js";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";

export default function Poll(){    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [choice, setChoice] = useState("");       
    const [resultsVisible, setResultsVisible] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        if (router.isReady) {
            const url = `/api/poll/${router.query.id}`;            
            fetch(url)
                .then(res => res.json())
                .then(res => {                                    
                    setData(res.data);
                    console.log(res.data);
                    setLoading(false);                              
                }).catch(e => {
                    console.log(e)
                });   
          }                         
    }, [router.isReady]);

    const handleSubmit = e => {        
        e.preventDefault();
        setChoice("");        
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
                setData(res.data);
                setResultsVisible(true);
                console.log(res);
            }).catch(e => {
                
                console.log(e);
            });
    }
 

    return (
        <Layout>          
        {                  

          loading ? <h1>loading</h1> :  
          resultsVisible ? <Results data = {data} handleClick = {setResultsVisible}/> :  (
            <>                    
                <h1>{data.title}</h1>    
                <h2>{data.question}</h2>
                <form onSubmit = {handleSubmit}>
                    {                        
                        data.choices && data.choices.map(({name}, choice_index) => (                                    
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
                    {
                        data.canVoted ? null : <h3>You can only vote once</h3>
                    }
                    <input type = "submit" value="Vote" onClick = {handleSubmit} disabled={!data.canVote}/>
                    
                </form>                 
                <div>
                    <button type="button" onClick = {e => setResultsVisible(true)}>Show Results</button>
                </div>           
            </>
            )
        }
        </Layout>
    )
}

const Results = ({data, handleClick}) => {    

    const {title, question, results, votedFor} = data;

    return( 
        <>                    
            <h1>{title}</h1>    
            <h2>{question}</h2>
            <ul>
                {                        
                    Object.keys(results).map((k, results_index) => (                                    
                        <li key={results_index}>
                            {k}  {results[k]} {k===votedFor ? <strong>You voted for this one</strong> : "blah"}
                        </li>
                    ))
                }     
            </ul>
            <div>
                <button type="button" onClick = {e => handleClick(false)}>Hide Results</button>
            </div>
        </>    
    );
}