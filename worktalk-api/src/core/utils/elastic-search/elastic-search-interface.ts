// Define the type of the body for the Search request
export interface ISearchMessage {
    query: {
        match_phrase_prefix: { message: string }
    }
}

// Complete definition of the Search response
export interface ShardsResponse {
    total: number;
    successful: number;
    failed: number;
    skipped: number;
}

export interface Explanation {
    value: number;
    description: string;
    details: Explanation[];
}

export interface ISearchResponse<T> {
    took: number;
    timed_out: boolean;
    _scroll_id?: string;
    _shards: ShardsResponse;
    hits: {
        total: number;
        max_score: number;
        hits: Array<{
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: T;
            _version?: number;
            _explanation?: Explanation;
            fields?: any;
            highlight?: any;
            inner_hits?: any;
            matched_queries?: string[];
            sort?: string[];
        }>;
    };
    aggregations?: any;
}

// Define the interface of the source object
export interface IMessageSearch {
    id: string;
    message: string;
    userId: string;
    chatRoomId: string;
    avatar: string;
    title: string;
    userName: string;
    status?: '0' | '1';
}
