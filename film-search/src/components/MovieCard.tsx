//MovieCard = componente per visualizzare la scheda di un film, con titolo, poster, anno di uscita e valutazione.
//e possibilità di aggiugere ai preferiti e alla watchlist

import {Link} from 'react-router-dom';
import type {Movie} from '../types/movie';
import type  {getImageUrl} from '../api/movies';
import {useFavorites} from '../hooks/useFavorites';
import {useWatchlist} from '../hooks/useWatchlist';

interface MovieCardProps{
    movie: Movie;
    showWatchlistActions?: boolean;
    currentList?: 'toWatch' | 'watched' | 'favorites';
}

//MovieCard
export const MovieCard = ({movie, showWatchlistActions = false, currentList}: MovieCardProps) => {
    const {favorites, addFavorite, removeFavorite} = useFavorites();
    const {
        toWatch,
        watched,
        addToWatch,
        addToWatched,
        removeFromToWatch,
        removeFromWatched
    } = useWatchlist();

    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    const isInToWatch = toWatch.some((m) => m.id === movie.id);
    const isInWatched = watched.some((m) => m.id === movie.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if(isFavorite){
            removeFavorite(movie.id);
        }else{
            addFavorite(movie);
        }
    };

    const handleWatchlistAction = (e: React.MouseEvent, action: string) => {
        e.preventDefault();
        e.stopPropagation();

        switch(action){
            case 'addToWatch':
                addToWatch(movie);
                break;
            case 'addToWatched':
                addToWatched(movie);
                break;
            case 'removeToWatch':
                removeFromToWatch(movie.id);
                break;
            case 'removeWatched':
                removeFromWatched(movie.id);
                break;
        };
    };

    //Render grafico della MovieCard
    return(
        <Link to={`/movies/${movie.id}`} className="movie-card">
            <div className="movie-card-image">
                <img 
                src = {getImageUrl(movie.poster_path, 'w500')}
                alt = {movie.title}
                />
                <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                >
                {isFavorite ? '❤️' : '🤍'}
                </button>

                {showWatchlistActions && currentList && ( 
                    <div className="watchlist-actions">
                        {currentList === 'toWatch' ? (
                            <>
                                <button
                                className="watchlist-action-btn watched-btn"
                                onClick={(e) => handleWatchlistAction(e, 'addToWatched')}
                                aria-label="Segna come visto"
                                title="Segna come visto"
                                >
                                ✅
                                </button>
                                <button
                                className="watchlist-action-btn remove-btn"
                                onClick={(e) => handleWatchlistAction(e, 'removeToWatch')}
                                aria-label="Rimuovi dalla lista"
                                title="Rimuovi dalla lista"
                                >
                                🗑️
                                </button>
                            </>
                        ): currentList === 'watched' ? (
                            <>
                                <button
                                className="watchlist-action-btn towatch-btn"
                                onClick={(e) => handleWatchlistAction(e, 'addToWatch')}
                                aria-label="Sposta in da vedere"
                                title="Sposta in da vedere"
                                >
                                📝
                                </button>
                                <button
                                className="watchlist-action-btn remove-btn"
                                onClick={(e) => handleWatchlistAction(e, 'removeWatched')}
                                aria-label="Rimuovi dalla lista"
                                title="Rimuovi dalla lista"
                                >
                                🗑️
                                </button>
                            </>
                        ) : currentList === 'favorites' ? (
                            <>
                                <button
                                className="watchlist-action-btn towatch-btn"
                                onClick={(e) => handleWatchlistAction(e, 'addToWatch')}
                                aria-label="Aggiungi a da vedere"
                                title="Aggiungi a da vedere"
                                >
                                📝
                                </button>
                                <button
                                className="watchlist-action-btn watched-btn"
                                onClick={(e) => handleWatchlistAction(e, 'addToWatched?')}
                                aria-label="Segna come visto"
                                title="Segna come visto"
                                >   
                                ✅
                                </button>
                            </>
                        ) : null};
                    </div>
                )};
            
            <div className="movie-card-content">
                <h3 className="movite-title">{movie.title}</h3>
                <div className="movie-info">
                    <span className="movie-year">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </span>
                    <span className="movie-rating">⭐️ {movie.vote_average.toFixed(1)}</span>
                </div>
            </div>

            {!showWatchlistActions && (
                <div className="quick-watchlist-btns">
                    {!isInToWatch && !isInWatched && (
                        <button
                        className="quick-btn add-towatch"
                        onClick={(e) => handleWatchlistAction(e, 'addToWatch')}
                        title="Aggiungi a da vedere"
                        >
                        📝 Da vedere
                        </button>
                    )};
                    {!isInWatched && !isInToWatch && (
                        <button
                        className="quick-btn add-watched"
                        onClick={(e) => handleWatchlistAction(e, 'addToWatched')}
                        title="Segna come visto"
                        >
                        ✅ Visto
                        </button>
                    )};
                    {isInToWatch && (
                        <button
                        className="quick-btn remove-towatch"
                        onClick={(e) => handleWatchlistAction(e, 'removeToWatch')}
                        title="Rimuovi da 'da vedere'"
                        >
                        📝 In lista
                        </button>
                    )};
                    {isInWatched && (
                        <button
                        className="quick-btn in-list-watched"
                        onClick={(e) => handleWatchlistAction(e, 'removeWatched')}
                        title="Rimuovi da 'visti'"
                        >
                        ✅ Già visto
                        </button>
                    )};
                </div>
            )};
        </div>
        </Link>
    );
};