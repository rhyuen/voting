export interface Choice {
    count: number;
    name: string;
    voters: Array<string>;
    _id: string;
}

export interface Data {
    title: string;
    question: string;
    results: Object;
    votedFor: string;
    canVote: boolean;
    choices: Array<Choice>;
    created_at: string;
    creator: string;
    startDate: string;
    endDate: string;
    updated_at: string;
    _v: number;
    _id: string;
}

