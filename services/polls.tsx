import { Data } from "../shared/types";

interface Props {
    path: string;
    payload: Array<Data>;
}

export function getUserCreatedPolls(): Promise<Props> {
    const url = "/api/get-created-polls";
    return fetch(url).then(res => res.json());
}

export function deleteUserCreatedPoll(pollID: string): Promise<object> {
    const url = "/api/delete-poll";
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pollID: pollID })
    };

    return fetch(url, options)
        .then(res => res.json())
}

export async function createPoll(payload): Promise<Props> {
    const url = "/api/create-poll";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Issue with making a new poll.");
        }
    });
}

export function getActivePolls(): Promise<Props> {
    const url = "/api/get-active-polls";
    return fetch(url).then(res => res.json());
}