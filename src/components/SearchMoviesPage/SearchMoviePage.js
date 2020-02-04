import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import api from '../Services/api';
import styles from './SearchMoviesPage.module.css';

export default class SearchMoviePage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    query: '',
    movies: null,
  };

  componentDidMount() {
    const { location } = this.props;
    if (!location.search) {
      return;
    }
    const queryObject = queryString.parse(location.search);
    this.fetchSearchMovies(queryObject.query);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      this.handleSubmit(query);
    }
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = () => {
    this.fetchSearchMovies(this.state.query);
    const { location, history } = this.props;

    history.replace({
      pathname: location.pathname,
      search: `?query=${this.state.query}`,
    });
  };

  fetchSearchMovies = async query => {
    const searchMovies = await api.searchMovies(query);
    this.setState({ movies: searchMovies });
  };

  render() {
    const { query, movies } = this.state;
    const { location } = this.props;
    return (
      <div className={styles.container}>
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          className={styles.input}
        />

        {movies && (
          <ul className={styles.ul}>
            {movies.map(move => (
              <li key={move.id} className={styles.li}>
                <NavLink
                  to={{
                    pathname: `/movies/${move.id}`,
                    state: { from: location },
                  }}
                  className={styles.link}
                >
                  {move.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
