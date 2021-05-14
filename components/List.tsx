import { Data } from "../shared/types";
import Link from "next/link";
import { FunctionComponent } from "react";

interface Props {
    data: Array<Data>;
}

function getRelativeDate(date: string): string {
    const differenceInMS: number = new Date().valueOf() - new Date(date).valueOf();
    const differenceInSeconds: number = differenceInMS / 1000;
    if (differenceInSeconds < 60) {
        return `${Math.ceil(differenceInSeconds)} seconds ago`;
    }

    const differenceInMinutes: number = differenceInSeconds / 60;
    if (differenceInMinutes < 60) {
        return `${Math.ceil(differenceInMinutes)} minutes ago.`;
    }

    const differenceInHours: number = differenceInMinutes / 60;
    if (differenceInHours < 24) {
        return `${Math.ceil(differenceInHours)} hours ago.`
    }

    const differenceInDays: number = differenceInHours / 24;
    return `${Math.ceil(differenceInDays)} day(s) ago.`
}

const List: FunctionComponent<Props> = ({ data }) => {

    return (
        <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
            {
                data && data.length === 0 ? <h2>Add something please</h2> :

                    data.map(({ title: curr_title, question: curr_question, _id: id, creator, created_at }, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <pre className="item__index">{index}</pre>
                                    <Link href={`/poll/${id}`}>
                                        <a className="item__question">{curr_question ?? "No Question"}</a>
                                    </Link>
                                    <br />
                                    <div className="item__tag">
                                        {curr_title ?? "No Title"}
                                    </div>
                                </div>
                                <span className="item__meta">{creator} at {getRelativeDate(created_at)}</span>
                            </li>
                        );
                    })
            }

            <style jsx>{`
                li {
                    margin-bottom: 1rem;
                }

                .item__index{
                    background: black;
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-weight: 800;         
                    border-radius: 50%;       
                }

                .item__meta{
                    font-size: 0.8rem;
                }

                .item__question{
                    font-size: 1.2rem;
                    background: rgba(0,0,0,0.1);
                    padding: 2rem;
                    margin: 2rem 0;
                }

                .item__tag{
                    background: black;
                    border-radius: 20px;
                    padding: 0.25rem 1rem;
                    color: white;
                    font-size: 0.8rem;                    
                    font-weight: 600;
                    text-transform: uppercase;     
                    margin: 1rem 0;      
                    width: fit-content;         
                }
                `}
            </style>
        </ul>
    )
}

export default List;