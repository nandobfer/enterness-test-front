import { WithoutFunctions } from "src/helpers";
export declare class Message {
    id: string;
    body: string;
    author_id: string;
    constructor(data: WithoutFunctions<Message>);
}
