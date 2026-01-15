// INTERFACCIA TIPI FILM - GENERI - DETTAGLI - CAST

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime: number;
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}

//Parametri per valutazione con chiamata POST 
export interface RatingRequest{
    value: number;
}

export interface RatingResponse{
    success: boolean;
    status_code: number;
    status_message: string;
}