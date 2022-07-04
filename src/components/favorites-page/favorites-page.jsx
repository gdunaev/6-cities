import React from "react";
import { Link } from "react-router-dom";
import { AppRoute, Cities } from "../../const";
import { offersPropTypes } from "../../prop-types-site";
import FavoritesList from "../favorites-list/favorites-list";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const getFavorites = (offers) => {
  const offersFavorite = offers.filter((offer) => offer.isFavorite);
  
  const favorites = [];

  if (offersFavorite.length !== 0) {
    for (const city of Cities) {
      favorites.push({
        city: city.name,
        offers: offersFavorite.filter((offer) => offer.city.name === city.name),
      });
    }
  }
  
  return favorites;
};

const getFavoritesSection = (offersFavorite) => {
  if (offersFavorite.length !== 0) {
    return (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {offersFavorite.map((favorite, id) => (
            <FavoritesList
              key={`${favorite.city}-${id}`}
              currentOffers={favorite.offers}
              currentCity={favorite.city}
            />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">
          Save properties to narrow down search or plan your future trips.
        </p>
      </div>
    </section>
  );
};

const FavoritesPage = (props) => {
  const { offersAll, emailUser } = props;

  const offersFavorite = getFavorites(offersAll);
  // console.log("11", offersFavorite);
  

  return (
    <>
      <div style={{ display: `none` }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            ></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            ></path>
          </symbol>
        </svg>
      </div>

      <div className={offersFavorite.length === 0 ? `page page--favorites-empty` : `page`}>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRoute.MAIN}>
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {emailUser}
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className={offersFavorite.length === 0 ? `page__main page__main--favorites page__main--favorites-empty` : `page__main page__main--favorites`}>
          <div className="page__favorites-container container">

          {getFavoritesSection(offersFavorite)}

          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to="#">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  offersAll: state.offersAll,
  emailUser: state.emailUser,
});

FavoritesPage.propTypes = {
  offersAll: offersPropTypes,
  emailUser: PropTypes.string,
};

export { FavoritesPage };
export default connect(mapStateToProps, null)(FavoritesPage);
