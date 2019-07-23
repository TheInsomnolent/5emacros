import { omit } from "lodash"
import {
    ADD_ATTACK,
    DELETE_ATTACK,
    ROLL_ATTACK,
    CLEAR_CURRENT_ROLL,
    SET_DC,
    ADD_ATTACK_TO_COMBO,
    REMOVE_ATTACK_FROM_COMBO,
    SAVE_CURRENT_COMBO,
    ROLL_COMBO,
    ROLL_CURRENT_COMBO,
    CLEAR_CURRENT_COMBO,
    UPDATE_CURRENT_COMBO_NAME,
    DELETE_COMBO,
    EDIT_COMBO
} from "./actions"
import { rollAttacks } from "./Roll"

let initialState = {
    attacks: {},
    combos: {},
    currentComboName: "",
    currentCombo: [],
    rollData: [],
    damageModifiers: {
        Slashing: null,
        Bludgeoning: null,
        Piercing: null,
        Fire: null,
        Cold: null,
        Poison: null,
        Acid: null,
        Psychic: null,
        Necrotic: null,
        Radiant: null,
        Lightning: null,
        Thunder: null,
        Force: null
    },
    currentDC: 10
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

        case ROLL_ATTACK:
            next_state = {
                ...state,
                rollData: rollAttacks([
                    {
                        ...state.attacks[action.payload.name],
                        name: action.payload.name
                    }
                ])
            }
            break

        case ROLL_COMBO:
            next_state = {
                ...state,
                rollData: rollAttacks(state.combos[action.payload.name])
            }
            break

        case ROLL_CURRENT_COMBO:
            next_state = {
                ...state,
                rollData: rollAttacks(state.currentCombo)
            }
            break

        case CLEAR_CURRENT_COMBO:
            next_state = {
                ...state,
                currentCombo: [],
                currentComboName: ""
            }
            break

        case CLEAR_CURRENT_ROLL:
            next_state = {
                ...state,
                rollData: []
            }
            break

        case SET_DC:
            next_state = {
                ...state,
                currentDC: action.payload.DC < 1 ? 1 : action.payload.DC
            }
            break

        case ADD_ATTACK_TO_COMBO:
            next_state = {
                ...state,
                currentCombo: [
                    ...state.currentCombo,
                    {
                        name: action.payload.name,
                        ...state.attacks[action.payload.name]
                    }
                ]
            }
            break

        case REMOVE_ATTACK_FROM_COMBO:
            next_state = {
                ...state,
                currentCombo: [
                    ...state.currentCombo.slice(0, action.payload.index),
                    ...state.currentCombo.slice(action.payload.index + 1)
                ]
            }
            break

        case SAVE_CURRENT_COMBO:
            next_state = {
                ...state,
                combos: {
                    ...state.combos,
                    [action.payload.name]: state.currentCombo
                },
                currentCombo: [],
                currentComboName: ""
            }
            break

        case UPDATE_CURRENT_COMBO_NAME:
            next_state = {
                ...state,
                currentComboName: action.payload.name
            }
            break

        case DELETE_COMBO:
            next_state = {
                ...state,
                combos: omit(state.combos, [action.payload.name])
            }
            break

        case EDIT_COMBO:
            next_state = {
                ...state,
                combos: omit(state.combos, [action.payload.name]),
                currentCombo: state.combos[action.payload.name],
                currentComboName: action.payload.name
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
