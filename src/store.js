import { createStore, applyMiddleware } from "redux";

// Logger with default options
import { createLogger } from "redux-logger";
import reducer from "./reducer";

export default function configureStore(initialState) {
    return createStore(reducer, initialState, applyMiddleware(createLogger()));
}