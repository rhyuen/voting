import Layout from "../../components/Layout";
import React, { useState, useEffect, FunctionComponent } from "react";
import { useRouter } from "next/router";
import { Data } from "../../shared/types";
import { useUser } from "@auth0/nextjs-auth0";
import CreatorBar from "../../components/CreatorBar";
import LoadingSignal from "../../components/LoadingSignal";
import { getPoll, updatePoll } from "../../services/polls";



const Poll: FunctionComponent<{}> = () => {
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState<boolean>(true);
    const [choice, setChoice] = useState<string>("");
    const [resultsVisible, setResultsVisible] = useState<boolean>(false);
    const { user } = useUser();
    const router = useRouter();


    useEffect(() => {
        let mounted = true;
        if (router.isReady) {

            // Need to cast it as a string below because TS/SonarLint has an issue with string and string[] for whatever reason.
            const queryID = router.query.id as string;
            getPoll(queryID)
                .then(res => {
                    if (mounted) {
                        const payload: Data = res.payload[0];
                        console.log(payload);
                        setData(payload);
                        setLoading(false);
                    }
                }).catch(e => {
                    console.log(e)
                });
        }
        return () => {
            mounted = false;
        }
    }, [router.isReady]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setChoice("");

        updatePoll(data._id, choice)
            .then(res => {
                //update the endpoint to return an array
                setData(res.payload[0]);
                setResultsVisible(true);
            }).catch(e => {

                console.log(e);
            });
    }


    return (
        <Layout>
            {
                loading ?
                    <LoadingSignal>Loading User details</LoadingSignal> :
                    data.creator === user.sub ? <CreatorBar pollID={data._id} /> : null
            }

            {
                loading ? <LoadingSignal>Loading Poll</LoadingSignal> :
                    resultsVisible ? <Results data={data} handleClick={setResultsVisible} /> : (
                        <>
                            <h1>{data.title}</h1>
                            <div className='card'>
                                {data.question}
                            </div>
                            <form onSubmit={handleSubmit}>
                                {
                                    data.choices && data.choices.map(({ name }, choice_index) => (
                                        <div key={choice_index} className="form-group">
                                            <input type="radio"
                                                id={name}
                                                name={data._id}
                                                value={name}
                                                disabled={!data.canVote}
                                                checked={choice === name}
                                                onChange={e => setChoice(e.target.value)} />
                                            <label htmlFor={name}>{name}</label>
                                        </div>
                                    ))
                                }
                                <div className="form-group form-group--left">
                                    <input type="submit"
                                        value="Vote"
                                        className="button button--primary"
                                        disabled={!data.canVote} />
                                    <button className="button button--secondary"
                                        type="button"
                                        onClick={() => setResultsVisible(true)}>
                                        Show Results
                                    </button>
                                </div>
                            </form>
                            <style jsx>
                                {`                              

                                input[type="radio"]{
                                    appearance: none;
                                }
                                label{
                                    display: flex;
                                    font-weight: 600;
                                    font-size: 1.2rem;
                                    padding: 1rem;                                    
                                    border-radius: 1rem;
                                    width: 100%;                                    
                                    justify-content: center;
                                    border: .2rem solid var(--GREY);
                                    background: white;
                                    margin-bottom: 1rem;
                                    cursor:pointer;
                                    transition: background .2s ease-in-out, color .2s ease-in-out;
                                }
                                label:hover:enabled{
                                    background: var(--PRIMARY);
                                    color: white;
                                }

                                input:disabled ~ label{
                                    border-color: transparent;
                                    background: var(--GREY);
                                    color: var(--DARK-GREY);
                                    cursor: not-allowed;
                                }                                        

                                input:checked ~ label{
                                    border: .2rem solid forestgreen;
                                    background: forestgreen;
                                    color: white;
                                }

                            `}
                            </style>
                        </>
                    )
            }
        </Layout>
    )
}

export default Poll;

interface ResultsProps {
    data: Data;
    handleClick(isVisible: boolean): void;
}

const Results: FunctionComponent<ResultsProps> = ({ data, handleClick }) => {

    const { title, question, results, votedFor } = data;

    return (
        <>
            <h1>{title}</h1>
            <div className="card">{question}</div>
            <ul className="form-group form-group--vertical">
                {
                    Object.keys(results).map((k, results_index) => {
                        return k === votedFor ?
                            (
                                <li key={results_index} className="result result--selected">
                                    {k}  {results[k]} Your Choice
                                </li>
                            ) : (
                                <li key={results_index} className="result">
                                    {k}  {results[k]}
                                </li>
                            );
                    })
                }
            </ul>
            <div>
                <button type="button"
                    className="button button--secondary"
                    onClick={() => handleClick(false)}>
                    Hide Results
                </button>
            </div>
            <style jsx>{
                `
                    .result{
                        display: flex;
                        font-weight: 600;
                        font-size: 1.2rem;
                        padding: 1rem;                                    
                        border-radius: 1rem;
                        width: 100%;                                    
                        justify-content: center;
                        border: .2rem solid var(--GREY);
                        background: white;
                        margin-bottom: 1rem;                        
                        transition: background .2s ease-in-out, color .2s ease-in-out;
                        user-select: none;
                    }                   
                    .result--selected{
                        border: .2rem solid forestgreen;
                        background: forestgreen;
                        color: white;                        
                    } 
                `
            }</style>
        </>
    );
}


