import { Data } from "../shared/types";
import Link from "next/link";
import { FunctionComponent } from "react";

interface Props {
    data: Array<Data>;
}

const List: FunctionComponent<Props> = ({ data }) => {

    return (
        <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
            {
                data && data.length === 0 ? <h2>Add something please</h2> :

                    data.map(({ title: curr_title, question: curr_question, _id: id, creator, created_at }, index) => {
                        return (
                            <div key={index}>
                                <Link href={`/poll/${id}`}>
                                    <a>{index} : {curr_title ?? "No Title"}:{curr_question ?? "No Question"}</a>
                                </Link>
                                <br />
                                <div>
                                    <span>{creator}</span> at <span>{created_at}</span>
                                </div>
                            </div>
                        );
                    })
            }
        </ul>
    )
}

export default List;