interface NewsSource {
    id: string;
    name: string;
}

export interface NewsData {
    urlToImage: string;
    status: string;
    id: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
    title: string;
    content: string;
    source: NewsSource;
    author?: string;
    publishedAt?: string;
}
