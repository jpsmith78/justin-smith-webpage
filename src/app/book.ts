export interface Book {
    book_id: string | '';
    cover_id: string | ''
    title: string | '';
    authors: string | '';
    categories: string | '';
    page_count: number | 0;
    publish_year: number | 0;
    description:  string | '';
    completed: boolean | false;
    in_progress: boolean | false;
    owned: boolean | false;
}