import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../Services/api';
import styles from './MovieCastPage.module.css';

export default class MovieCastPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    cast: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.fecthMovieCast(match.params.moviesId);
  }

  fecthMovieCast = async id => {
    const data = await api.getMoviesCast(id);
    this.setState({ cast: data.cast });
  };

  render() {
    const { cast } = this.state;
    return (
      <ul className={styles.ul}>
        {cast &&
          cast.map(index => (
            <article key={index.id} className={styles.cards}>
              <h3 className={styles.title}>Hero: {index.character}</h3>
              <p className={styles.actor}>Actor: {index.name}</p>
              <img
                className={styles.image}
                src={`https://image.tmdb.org/t/p/w200${index.profile_path}`}
                alt="photoActor"
              />
            </article>
          ))}
      </ul>
    );
  }
}
