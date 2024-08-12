export interface Book {
    key: string | '';
    title: string | '';
    authors: string | '';
    categories: string | '';
    page_count: number | 0;
    first_published_year: number | 0;
    description: string | '';
}