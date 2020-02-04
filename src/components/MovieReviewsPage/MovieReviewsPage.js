import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../Services/api';
import styles from './MovieReviewsPage.module.css';

export default class MovieReviewsPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    reviews: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.fecthMovieReviews(match.params.moviesId);
  }

  fecthMovieReviews = async id => {
    const reviews = await api.getMoviesReviews(id);
    this.setState({ reviews });
  };

  render() {
    const { reviews } = this.state;
    const message = 'We don`t have any reviews for this movie';
    return (
      <div className={styles.container}>
        {reviews &&
          (reviews.length === 0 ? (
            <p className={styles.message}>{message}</p>
          ) : (
            reviews.map(index => (
              <div key={index.id} className={styles.description}>
                <h2 className={styles.author}>{index.author}</h2>
                <p className={styles.content}>{index.content}</p>
              </div>
            ))
          ))}
      </div>
    );
  }
}
