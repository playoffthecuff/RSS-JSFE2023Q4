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
    status: string;
    title: string;
    totalResults: number;
    url: string;
    urlToImage: string;
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
