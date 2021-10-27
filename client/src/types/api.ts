export interface HTTPResponseReturn { 
    statusCode?: number ,
    data?: DataResponse ,
}

export interface DataResponse {
    repo?: Repo 
}

export interface Repo {
    name: string,
    id: string,
    bgColor: string,
    lists?: Lists[],
}
export interface Lists {
    title: string,
    id: string,
    cards: Cards,
}
export interface Cards {
    text: string,
    id: string,
}