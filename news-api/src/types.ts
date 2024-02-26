type NewsSource = {
    id: string;
    name: string;
};

export interface NewsData {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: NewsSource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsData[];
}

export type SourcesData = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

export type SourcesResponse = {
    status: string;
    sources: SourcesData[];
};

export interface LinkOptions {
    [key: string]: string;
}

export type GetNewsCallback<T> = (data: T) => void;
