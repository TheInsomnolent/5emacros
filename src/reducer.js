import { omit } from "lodash"
import { ADD_ATTACK, DELETE_ATTACK } from "./actions"

let initialState = {
    attacks: {},
    combos: {},
    currentCombo: []
}

const storedData = JSON.parse(window.localStorage.getItem("storedState"))
if (storedData)
    initialState = {
        ...initialState,
        ...storedData
    }

const reducer = (state = initialState, action) => {
    let next_state
    switch (action.type) {
        case ADD_ATTACK:
            next_state = {
                ...state,
                attacks: {
                    ...state.attacks,
                    [action.payload.attack.name]: omit(action.payload.attack, [
                        "name"
                    ])
                }
            }
            break

        case DELETE_ATTACK:
            next_state = {
                ...state,
                attacks: omit(state.attacks, [action.payload.name])
            }
            break

        default:
            next_state = state
            break
    }
    window.localStorage.setItem("storedState", JSON.stringify(next_state))
    return next_state
}

export default reducer
