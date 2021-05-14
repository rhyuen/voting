import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Data } from "../../shared/types";
import { useUser } from "@auth0/nextjs-auth0";
import CreatorBar from "../../components/CreatorBar";



export default function Poll() {
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState<boolean>(true);
    const [choice, setChoice] = useState<string>("");
    const [resultsVisible, setResultsVisible] = useState<boolean>(false);
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (error) {
        return <div>{error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading User Details</div>;
    }

    useEffect(() => {
        let mounted = true;
        if (router.isReady) {
            const url = `/api/poll/${router.query.id}`;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    if (mounted) {
                        setData(res.data);
                        console.log(res.data);
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
                loading ?
                    <h1>Loading User details</h1> :
                    data.creator === user.email ? <CreatorBar pollID={data._id} /> : null
            }

            {
                loading ? <h1>loading</h1> :
                    resultsVisible ? <Results data={data} handleClick={setResultsVisible} /> : (
                        <>
                            <h1>{data.title}</h1>
                            <h2>{data.question}</h2>
                            <form onSubmit={handleSubmit}>
                                {
                                    data.choices && data.choices.map(({ name }, choice_index) => (
                                        <p key={choice_index}>
                                            <input type="radio"
                                                id={name}
                                                name={data._id}
                                                value={name}
                                                checked={choice === name}
                                                onChange={e => setChoice(e.target.value)} />
                                            <label htmlFor={name}>{name}</label>
                                        </p>
                                    ))
                                }
                                {
                                    data.canVote ? null : <h3>You can only vote once</h3>
                                }
                                <input type="submit" value="Vote" disabled={!data.canVote} />
                            </form>
                            <div>
                                <button type="button" onClick={e => setResultsVisible(true)}>Show Results</button>
                            </div>
                        </>
                    )
            }
        </Layout>
    )
}

const Results = ({ data, handleClick }) => {

    const { title, question, results, votedFor } = data;

    return (
        <>
            <h1>{title}</h1>
            <h2>{question}</h2>
            <ul>
                {
                    Object.keys(results).map((k, results_index) => (
                        <li key={results_index}>
                            {k}  {results[k]} {k === votedFor ? <strong>You voted for this one</strong> : "blah"}
                        </li>
                    ))
                }
            </ul>
            <div>
                <button type="button" onClick={e => handleClick(false)}>Hide Results</button>
            </div>
        </>
    );
}


