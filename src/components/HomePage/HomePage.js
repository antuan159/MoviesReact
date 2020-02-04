import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../Services/api';
import styles from './HomePage.module.css';

export default class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    this.fecthPopularMovies();
  }

  fecthPopularMovies = async () => {
    const movies = await api.getPopularMovies();
    this.setState({ movies });
  };

  handleSort = () => {
    const tmp = this.state.movies;
    tmp.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    this.setState(tmp);
  };

  render() {
    const { movies } = this.state;
    return (
      <div className={styles.container}>
        <button
          type="button"
          onClick={this.handleSort}
          className={styles.button}
        >
          Sort by name
        </button>
        <h1 className={styles.trending}>Trending today</h1>
        <ul className={styles.ul}>
          {movies.map(move => (
            <li key={move.id} className={styles.li}>
              <NavLink to={`/movies/${move.id}`}>
                <div className={styles.films}>
                  <h2 className={styles.filmsTitle}>
                    {move.title || move.original_name}
                  </h2>
                  <div className={styles.filmsImage}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${move.backdrop_path}`}
                      alt="poster"
                      className={styles.img}
                    />
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
