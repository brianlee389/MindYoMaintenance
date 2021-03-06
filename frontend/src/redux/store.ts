import { createStore, combineReducers } from 'redux';
// import AppNavigationStateReducer from './AppNavigationStateReducer.ts';
// import ProductsStateReducer from './ProductsStateReducer.ts';
export const PULL_PRODUCTS = 'PULL_PRODUCTS';
export const SELECT_PART_NAME = 'SELECT_PART_NAME';

const initialProductsState = {
  partName: '',
  partsSources: []
};
const ProductsStateReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case SELECT_PART_NAME:
      return {
        ...state,
        partName: action.payload
      }
    case PULL_PRODUCTS:
      return {
        ...state,
        partsSources: action.payload
      }
    case 'RESET':
      return initialProductsState;
  }
  return state;
};

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
// export const SELECT_PART_NAME = 'SELECT_PART_NAME';

const initialAppState = {
  page: 'Profile',
  product: '',
  partName: ''
};

const AppNavigationStateReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {...state, page: action.payload}
    case SELECT_PRODUCT:
      return {...state, product: action.payload}
    case 'SELECT_APP_PART_NAME':
      return {...state, partName: action.payload}
    case 'RESET':
      return initialAppState;
  }
  return state;
};

const intialVehicleState = {
  make: 'Ford',
  year: '',
  model: '',
  modelType: '',
  engineType: '',
  zipcode: '',
  nickname: '',
  selectedModelTypeIndex: -1,
  selectedEngineTypeIndex: -1,
  odometer: 0,
  dynamicOdometer: 0
};
const VehicleDataReducer = (state = intialVehicleState, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_DATA':
      return {
        ...state,
        year: action.payload.year,
        make: action.payload.make,
        model: action.payload.model
      };
    case 'SET_VEHICLE_ZIPCODE':
      return {
        ...state,
        zipcode: action.payload
      };
    case 'SET_VEHICLE_ENGINE':
      return {
        ...state,
        engineType: action.payload
      };
    case 'SET_VEHICLE_MODEL_TYPE':
      return {
        ...state,
        modelType: action.payload
      };
    case 'SET_VEHICLE_ODOMETER':
      return {
        ...state,
        odometer: action.payload
      }
    case 'SET_VEHICLE_DYNAMIC_ODOMETER':
      return {
        ...state,
        dynamicOdometer: action.payload
      }
    case 'SET_VEHICLE_IMAGE_URL':
      return {
        ...state,
        vehicleImageUrl: action.payload
      }
    case 'SET_MODEL_TYPE_RADIOBUTTON_INDEX':
      return {
        ...state,
        selectedModelTypeIndex: action.payload
      }
    case 'SET_ENGINE_TYPE_RADIOBUTTON_INDEX':
      return {
        ...state,
        selectedEngineTypeIndex: action.payload
      }
    case 'SET_VEHICLE_NICKNAME':
      return {
        ...state,
        nickname: action.payload
      };
    case 'RESET':
      return state;
  }
  return state;
};

const initialNotificationState = [];

const NotificationsReducer = (state = initialNotificationState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION_TYPE':
      if (state.filter((notification) => notification.toLowerCase() === action.payload.toLowerCase()).length === 0) {
        return state.concat([action.payload]);
      }
      return state;
    case 'REMOVE_NOTIFICATION_TYPE':
      return state.filter((notification) => notification.toLowerCase() !== action.payload.toLowerCase());
    case 'REMOVE_ALL_NOTIFICATIONS':
      return []
  }
  return state;
};

const code = '';
const initialAuthState = {
  access_token: '',
  refresh_token: '',
  // refresh_token: 'eyJraWQiOiI2cjIzQ2FTeTF4cFdUUFBxYVRtX01Vc2RKZGo1RWlDTnRtME4yVTAxNTdFIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.bcc51Nq5tzmeLoLGmQ-0wri3E6lDPcNlIHuzLYRJ1X7M6dKmIqH8DUeapxRYhMHBhUlyxZ0dCDic_ysQBgoQR2mvMMAf7ysBmu9rGtgMiVDvsWUVZXqfFlTXyMPtgPCjcksdzEdRsWLzbqEpzOv9T4WFkzt0vXvcd7dy1mw0pClHOUs1DO-3vrzQrDhtitFS1AptI_0yJ9xQnzWRINcbFwTe4BnbiSvfOW6rf5dQuCCL4jUWgL7oP4Y9yYvCNkehY9D3i6WOivbUfS4lJ4dzs_A2Jc0ZwVdH11Ra9WXLlbWKS4BdUb38kTdAobacSb-wpbf7OFs7VxSDhJWD8lqoJA.CYafe61vK2s9GqeO.pntkQYlH34R4kTVwmRbO6_rsa7oxzV6fhHwqvFZRUr5R6rn2iJKat9agWAJCCsbApmRk3NsyNfjL9fbEDBD-uftqSZ1fdnaMeM3iArplf-t_aw6nocvSnp_RbP8GsWgUJAy3r85i8ldIGmCZlAsh5TiQnMNyIYuGn-YkIQfVu-xTv_b82AiVIGjludi9GtvJ-_5fGWlTnUdRlInc5wj-XU_nhiaJ72aEwwYrByuc0dUg0PV1KawVp2Fj6BxYq-C2Zf6fs5xXsFVW7MUvSkvq9SjpIhrfofoh4sX5mJgxt274BqzHHPNn0VCEl-jzvCKxdwNB6gLUMlh5EGamQPL4tESKYt0MfIZXDreW4IXfAZ4SJbOSUnkAGDzmjBC9WOImMrsjhMNCRqAH9klsoC7OcWx1LXqEkt7kVKjImTxNdqptjJZ2GmtEYY0z-681qZQ9wJIZbeUQrkn5gjuB4OMzpU9McTUeRUvcqfrue3yXmG6y8Hwt0WG8A6a3yo88dNc2xF-u_5BnGV75OyCU4wgk9_3crvXFyr1x21PgpmRUo9XDNMDnFuk0iy2gel53fyCQqRMqrOOFQLwIfTQMlsrN1xaKfJ-RdKs55VxOpkFINolBMBNE_qvzTsMM8IAdv-v0NNPjJWiqNLej6Pi2AjY2KUAHs-jhqz0_Gq05PuC853I4ilX_7bztvTufdh3CoDP_OUr7wJI65To-u2kDnzRGGFxk0ukrTFn7qMyf0XgvKPaakcMKLiTZqb8o3Xoa3khoyoDAMjyZH6jShQcX2KfRTJYvUVEKpB6ZgKPRU1Djo1EFPGrY0lGYsXBHWfyQxgQ_CJANTQotAKVmKraOyLmhnnpf2Q.yS_s13ZDJSnITzQdoLVPOA',
  code: code,
  vehicleId: ''
};
const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        access_token: action.payload
      };
    case 'SET_REFRESH_TOKEN':
      return {
        ...state,
        refresh_token: action.payload
      };
    case 'SET_CODE':
      return {
        ...state,
        code: action.payload
      };
    case 'SET_VEHICLE_ID':
      return {
        ...state,
        vehicleId: action.payload
      };
  }
  return state;
}

const intialVehicleListState = {vehicleList: [], index: -1};
const VehicleListReducer = (state = intialVehicleListState, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_LIST':
      return {
        ...state,
        vehicleList: action.payload
      };
    case 'SET_SELECTED_VEHICLE_ID_INDEX':
      return {
        ...state,
        index: action.payload
      };
  }
  return state;
};

const rootReducer = combineReducers({
  appState: AppNavigationStateReducer,
  productsState: ProductsStateReducer,
  vehicleState: VehicleDataReducer,
  notificationsState: NotificationsReducer,
  authState: AuthReducer,
  vehicleList: VehicleListReducer
});

const store = createStore(rootReducer);

export default store;
