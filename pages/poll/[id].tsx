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
                console.log(res);
            }).catch(e => {

                console.log(e);
            });
    }


    return (
        <Layout>
            {
                loading ?
                    <LoadingSignal>Loading User details</LoadingSignal> :
                    data.creator === user.email ? <CreatorBar pollID={data._id} /> : null
            }

            {
                loading ? <LoadingSignal>Loading Poll</LoadingSignal> :
                    resultsVisible ? <Results data={data} handleClick={setResultsVisible} /> : (
                        <>
                            <h1>{data.title}</h1>
                            <h2>{data.question}</h2>
                            <form onSubmit={handleSubmit}>
                                {
                                    data.choices && data.choices.map(({ name }, choice_index) => (
                                        <div key={choice_index}>
                                            <input type="radio"
                                                id={name}
                                                name={data._id}
                                                value={name}
                                                checked={choice === name}
                                                onChange={e => setChoice(e.target.value)} />
                                            <label htmlFor={name}>{name}</label>
                                        </div>
                                    ))
                                }
                                <div className="form-group">
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
                                .form-group{
                                    display: flex;
                                    justify-content: flex-start;
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
            <h2>{question}</h2>
            <ul>
                {
                    Object.keys(results).map((k, results_index) => (
                        <li key={results_index}>
                            {k}  {results[k]} {k === votedFor ? <strong>You voted for this one</strong> : null}
                        </li>
                    ))
                }
            </ul>
            <div>
                <button type="button"
                    className="button button--secondary"
                    onClick={() => handleClick(false)}>
                    Hide Results
                </button>
            </div>
        </>
    );
}


