import { combineReducers } from '@reduxjs/toolkit';
import { History } from 'history';
import FullPageLoaderReducer from '../Components/Basic/full_page_loader/redux/slice';
import ErrorBoundaryReducer from '../Components/Basic/ErrorBoundary/redux/slice';
import AuthenticationReducer from "Features/Auth/redux/slice";
import LayoutReducer from "Layout/redux/slice"
// Root Reducer
export default function RootReducer(history: History){
  const combinedReducer = combineReducers({
    FullPageLoaderReducer,
    ErrorBoundaryReducer,
    AuthenticationReducer,
    LayoutReducer
    });

  return (state: any, action: any) => {
    return combinedReducer(state, action);
  };
};
