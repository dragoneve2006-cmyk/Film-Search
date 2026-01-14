//Creazione GESTIONE API MOVIE
import axios from 'axios';
import type { MovieResponse, MovieDetails, Cast } from  '../types/movie';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63'
const BASE_URL = 'https://api.themoviedb.org/3';


const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'i-IT',
    },
});


export const moviesApi = {
    //CERCA FILM PER TITOLO
    searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
        const response = await api.get<MovieResponse>('/search/movie', {
            params: {
                query,
                page,
            },
        });
        return response.data;
    },

    //FILM POPOLARI
    getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
        const response = await api.get<MovieResponse>('/movie/popular', {
            params: {
                page,
            },
        });
        return response.data;
    },

    //FILM IN TENDENZA
    getTrendigMovies: async (page = 1) : Promise<MovieResponse> => {
        const response = await api.get('/trending/movie/week', {
            params: {
                page,
            },
        });
        return response.data;
    },

    //DETTAGLI FILM
    getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
        const response = await api.get<MovieDetails>(`/movie/${movieId}`);
        return response.data;
    },

    //CAST FILM
    getMovieCredits: async (movieId: number): Promise<Cast[]> => {
        const response = await api.get<{ cast: Cast[] }>(`/movie/${movieId}/credits`);
        return response.data.cast;
    },

    //GENERI
    getMovieGenres: async (): Promise<{ id: number; name: string }[]> => {
        const response = await api.get<{ genres: { id: number; name: string }[] }>('/genre/movie/list');
        return response.data.genres;
    },

    //FILM PER GENERE
    getMoviesByGenre: async (genreId: number, page: number = 1): Promise<MovieResponse> => {
        const response = await api.get<MovieResponse>('/discover/movie', {
            params: {
                with_genres: genreId,
                page,
            },
        });
        return response.data;
    },

    //URL IMMAGINE
    getImageUrl: (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string => {
        if (!path) {
            return 'https://via.placeholder.com/500x750?text=No+Image';
        }
        return `https://image.tmdb.org/t/p/${size}${path}`;
    },

};