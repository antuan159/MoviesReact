import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SearchMoviePage from '../SearchMoviesPage/SearchMoviePage';
import Navigation from '../Navigation';
import routes from '../../routes';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';

const App = () => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.MOVIES} component={SearchMoviePage} />
      <Route path={routes.MOVIES_ID} component={MovieDetailsPage} />
      <Redirect to={routes.HOME} />
    </Switch>
  </BrowserRouter>
);

export default App;
