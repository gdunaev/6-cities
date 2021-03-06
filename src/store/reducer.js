import {ActionType} from './action';
import {DEFAULT_CITY} from "../const";
import {getOffersSorting} from "../utils";
import {SortingType, AuthorizationStatus} from "../const";

const initialState = {
  city: DEFAULT_CITY,
  offers: [],
  offersAll: [],
  activeOfferId: 0,
  offersSortingId: SortingType.POPULAR,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

// offers.filter((currentOffer) => currentOffer.city.name === DEFAULT_CITY)

const reducer = (state = initialState, action) => {
  // console.log(`00`, state.offers);
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      // console.log(`33`, state.offersAll.filter((currentOffer) => currentOffer.city.name === action.payload));
      return {
        ...state,
        offers: state.offersAll.filter((currentOffer) => currentOffer.city.name === action.payload),
        city: action.payload,
      };

    case ActionType.SELECT_OFFER:
      // console.log(`11`, action)
      return {
        ...state,
        activeOfferId: action.payload
      };
    case ActionType.OFFERS_SORTING:
      // console.log(`11`, getOffersSorting(action.payload, state.offers))
      return {
        ...state,
        offersSortingId: action.payload,
        offers: getOffersSorting(action.payload, state.offers)
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offersAll: action.payload,
        isDataLoaded: true
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    // case ActionType.RESET:
    //   return {
    //     ...initialState
    //   };

  }

  return state;
};


export {reducer};
