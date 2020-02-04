import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieCastPage from '../MovieCastPage/MovieCastPage';
import MovieReviewsPage from '../MovieReviewsPage/MovieReviewsPage';
import routes from '../../routes';
import api from '../Services/api';
import styles from './MovieDetailsPage.module.css';

export default class MovieDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    movie: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.getDetailMovie(match.params.moviesId);
  }

  getDetailMovie = async id => {
    const movie = await api.getDetailMovie(id);
    if (movie.status_message) {
      return;
    }
    this.setState({ movie });
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    if (!location.state) {
      history.push('/');
      return;
    }

    history.push({
      pathname: '/movies',
      search: location.state.from.search,
    });
  };

  render() {
    const { match, location } = this.props;
    const { movie } = this.state;
    return (
      <div className={styles.container}>
        {movie && (
          <div>
            <button
              type="button"
              onClick={this.handleGoBack}
              className={styles.button}
            >
              Go back
            </button>
            <div className={styles.description}>
              <div className={styles.poster}>
                <img
                  className={styles.img}
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt="poster"
                />
              </div>
              <div className={styles.about}>
                <p className={styles.title}>
                  {`${movie.original_title}  (${movie.release_date.slice(
                    0,
                    4,
                  )})`}
                </p>

                <p>User score: {movie.vote_average * 10}%</p>
                <p className={styles.title}>Overview</p>
                <p>{movie.overview}</p>
                <p className={styles.title}>Genres</p>
                <div>
                  {movie.genres.map(index => (
                    <span key={index.id}>{index.name} </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <ul className={styles.list}>
          <li className={styles.li}>
            <NavLink
              className={styles.link}
              to={{
                pathname: `${match.url}/Cast`,
                state: location.state,
              }}
            >
              Cast
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              className={styles.link}
              to={{
                pathname: `${match.url}/Reviews`,
                state: location.state,
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Switch>
          <Route exact path={routes.MOVIES_CAST} component={MovieCastPage} />
          <Route
            exact
            path={routes.MOVIES_REVIEWS}
            component={MovieReviewsPage}
          />
        </Switch>
      </div>
    );
  }
}
