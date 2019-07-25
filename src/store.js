import { createStore, applyMiddleware } from "redux"

// Logger with default options
import { createLogger } from "redux-logger"
import reducer from "./reducer"
let middlewares = []
if (process.env.NODE_ENV === "production") middlewares.push(createLogger())
export default function configureStore(initialState) {
    return createStore(reducer, initialState, applyMiddleware(...middlewares))
}
