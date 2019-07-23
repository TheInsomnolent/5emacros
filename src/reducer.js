import { omit, pick } from "lodash"
import uuid from "uuid/v4"

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
    EDIT_COMBO,
    NEW_CHARACTER,
    CHANGE_CHARACTER,
    RENAME_CURRENT_CHARACTER,
    SET_DAMAGE_MODIFIER,
    TOGGLE_DRAWER,
    CANCEL_DELETE,
    DELETE_CHARACTER,
    CONFIRM_DELETE
} from "./actions"
import { rollAttacks } from "./Roll"

const createNewBlankCharacter = () => {
    return {
        id: uuid(),
        name: "Unnamed Character",
        attacks: {},
        combos: {},
        currentComboName: "",
        currentCombo: [],
        rollData: []
    }
}

let initialState = {
    attacks: {},
    combos: {},
    drawers: {
        attacks: true,
        damage: true,
        critFailDamage: true
    },
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
    currentDC: 10,
    currentCharacterName: null,
    currentCharacterId: null,
    characters: null,
    pendingDelete: null
}

// Load stored data if any
let storedData = JSON.parse(window.localStorage.getItem("storedState"))
if (!storedData) storedData = {}
initialState = {
    ...initialState,
    ...storedData
}

if (!initialState.currentCharacterId) {
    // If no character is selected but one exists pick the top one
    if (!!initialState.characters && Object.keys(initialState.characters) > 0) {
        const character = Object.values(initialState.characters)[0]
        initialState = {
            ...initialState,
            ...{
                currentCharacterId: character.id,
                currentCharacterName: character.name,
                ...omit(character, ["id", "name"])
            }
        }
    }

    // If no character is selected and none exist create one
    if (
        !initialState.characters ||
        Object.keys(initialState.characters) === 0
    ) {
        const character = createNewBlankCharacter()
        initialState = {
            ...initialState,
            ...{
                currentCharacterId: character.id,
                currentCharacterName: character.name,
                ...omit(character, ["id", "name"]),
                characters: {
                    [character.id]: character
                }
            }
        }
    }
}

const reducer = (state = initialState, action) => {
    let next_state
    let next_character
    let duplicate_name_counter = 0
    const existing_names = !state.characters
        ? []
        : Object.values(state.characters).map(({ name }) => name)

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
                ]),
                drawers: {
                    ...state.drawers,
                    damage: true,
                    critFailDamage: true
                }
            }
            break

        case ROLL_COMBO:
            next_state = {
                ...state,
                rollData: rollAttacks(state.combos[action.payload.name]),
                drawers: {
                    ...state.drawers,
                    damage: true,
                    critFailDamage: true
                }
            }
            break

        case ROLL_CURRENT_COMBO:
            next_state = {
                ...state,
                rollData: rollAttacks(state.currentCombo),
                drawers: {
                    ...state.drawers,
                    damage: true,
                    critFailDamage: true
                }
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
                ],
                drawers: {
                    ...state.drawers,
                    combos: true
                }
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

        case NEW_CHARACTER:
            next_character = createNewBlankCharacter()
            while (existing_names.includes(next_character.name)) {
                duplicate_name_counter += 1
                if (duplicate_name_counter === 1)
                    next_character.name = `${next_character.name} ${duplicate_name_counter}`
                else
                    next_character.name = next_character.name.replace(
                        `${duplicate_name_counter - 1}`,
                        `${duplicate_name_counter}`
                    )
            }
            next_state = {
                ...state,
                ...{
                    currentCharacterId: next_character.id,
                    currentCharacterName: next_character.name,
                    ...omit(next_character, ["id", "name"])
                },
                characters: {
                    ...state.characters,
                    [next_character.id]: next_character
                }
            }
            break

        case CHANGE_CHARACTER:
            next_character = state.characters[action.payload.id]
            next_state = {
                ...state,
                ...{
                    currentCharacterId: next_character.id,
                    currentCharacterName: next_character.name,
                    ...omit(next_character, ["id", "name"])
                }
            }
            break

        case RENAME_CURRENT_CHARACTER:
            next_state = {
                ...state,
                currentCharacterName: action.payload.name,
                characters: {
                    ...state.characters,
                    [state.currentCharacterId]: {
                        ...state.characters[state.currentCharacterId],
                        name: action.payload.name
                    }
                }
            }
            break

        case SET_DAMAGE_MODIFIER:
            next_state = {
                ...state,
                damageModifiers: {
                    ...state.damageModifiers,
                    [action.payload.type]: action.payload.value
                }
            }
            break

        case TOGGLE_DRAWER:
            next_state = {
                ...state,
                drawers: {
                    ...state.drawers,
                    [action.payload.key]: state.drawers[action.payload.key]
                        ? !state.drawers[action.payload.key]
                        : true
                }
            }
            break

        case DELETE_CHARACTER:
            next_state = {
                ...state,
                pendingDelete: action.payload.id
            }
            break

        case CANCEL_DELETE:
            next_state = {
                ...state,
                pendingDelete: null
            }
            break

        case CONFIRM_DELETE:
            next_state = { ...state }
            // If current character is target
            if (state.pendingDelete === state.currentCharacterId) {
                // If other character exists pick the top one
                if (Object.keys(initialState.characters) > 0) {
                    next_character = Object.values(initialState.characters)[0]
                    next_state = {
                        ...next_state,
                        ...{
                            currentCharacterId: next_character.id,
                            currentCharacterName: next_character.name,
                            ...omit(next_character, ["id", "name"])
                        }
                    }
                }
                // If no other character exist create one
                else {
                    next_character = createNewBlankCharacter()
                    next_state = {
                        ...next_state,
                        ...{
                            currentCharacterId: next_character.id,
                            currentCharacterName: next_character.name,
                            ...omit(next_character, ["id", "name"])
                        }
                    }
                }
            }

            // Remove character from store
            next_state = {
                ...next_state,
                characters: omit(next_state.characters, [state.pendingDelete]),
                pendingDelete: null
            }
            break

        default:
            next_state = state
            break
    }
    // Update stored character
    if (
        next_state.currentCharacterId &&
        next_state.characters[next_state.currentCharacterId]
    ) {
        next_state = {
            ...next_state,
            characters: {
                ...next_state.characters,
                [next_state.currentCharacterId]: {
                    ...next_state.characters[next_state.currentCharacterId],
                    ...pick(next_state, [
                        "attacks",
                        "combos",
                        "currentComboName",
                        "currentCombo",
                        "rollData"
                    ])
                }
            }
        }
    }

    window.localStorage.setItem("storedState", JSON.stringify(next_state))
    return next_state
}

export default reducer
