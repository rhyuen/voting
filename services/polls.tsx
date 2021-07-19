import { Data } from "../shared/types";

interface Props {
    path: string;
    payload: Array<Data>;
}

export function getUserCreatedPolls(): Promise<Props> {
    const url = "/api/get-created-polls";
    return fetch(url).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("error with retriving polls");
        }
    });
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
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Issue with deleting the poll.");
            }
        });
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
    return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Issue with getting active polls.");
            }
        });
}

export function updatePoll(pollID: string, value: string): Promise<Props> {
    const payload = {
        poll: pollID,
        value: value
    };
    const url = `/api/post-id-poll`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }

    return fetch(url, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Issue with making an update to the Poll.");
            }
        });
}

export function getPoll(pollID: string): Promise<Props> {

    const url = `/api/poll/${pollID}`;

    return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`issue with getting the poll with ID: ${pollID}.`);
            }
        })
}