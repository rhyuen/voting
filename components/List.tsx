import { Data } from "../shared/types";
import Link from "next/link";
import { FunctionComponent } from "react";
import EmptyListNotice from "./EmptyListNotice";

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
                data && data.length === 0 ? <EmptyListNotice>It seems that the list is empty.  Kindly add something please.</EmptyListNotice> :

                    data.map(({ title: curr_title, question: curr_question, _id: id, creator, created_at }, index) => {
                        return (
                            <li key={index} className="item">
                                <div className='item__group'>
                                    <pre className="item__index">{index}</pre>
                                    <span className="item__meta">{creator} at {getRelativeDate(created_at)}</span>
                                </div>

                                <Link href={`/poll/${id}`}>
                                    <a className="item__question">{curr_question ?? "No Question"}</a>
                                </Link>
                                <div className="item__tag">
                                    {curr_title ?? "No Title"}
                                </div>
                            </li>
                        );
                    })
            }

            <style jsx>{`
                .item {
                    margin-bottom: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;                    
                }
                
                .item__group{
                    display: flex;                    
                    align-items: center;
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
                    margin-left: 2rem;
                }

                .item__question{
                    font-size: 1.2rem;
                    font-weight: 600;
                    background: white;
                    display: flex;
                    border: 1px solid var(--GREY);
                    border-radius: .5rem;
                    padding: 2rem;
                    margin: 2rem 0;
                    margin-top: .5rem;
                    transition: background .2s ease-in-out;
                }
                .item__question:hover{
                    background: var(--GREY);
                }

                .item__tag{
                    background: white;                    
                    padding: 0 1rem;
                    color: var(--PRIMARY);
                    font-size: 0.8rem;                    
                    font-weight: 600;
                    text-transform: uppercase;                                             
                    width: fit-content;    
                    user-select: none;     
                }
                `}
            </style>
        </ul>
    )
}

export default List;