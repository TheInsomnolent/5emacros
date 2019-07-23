export const ADD_ATTACK = "ADD_ATTACK"
export const DELETE_ATTACK = "DELETE_ATTACK"
export const ROLL_ATTACK = "ROLL_ATTACK"
export const ADD_ATTACK_TO_COMBO = "ADD_ATTACK_TO_COMBO"
export const REMOVE_ATTACK_FROM_COMBO = "REMOVE_ATTACK_FROM_COMBO"
export const SAVE_CURRENT_COMBO = "SAVE_CURRENT_COMBO"
export const CLEAR_CURRENT_ROLL = "CLEAR_CURRENT_ROLL"
export const SET_DC = "SET_DC"
export const ROLL_COMBO = "ROLL_COMBO"
export const ROLL_CURRENT_COMBO = "ROLL_CURRENT_COMBO"
export const CLEAR_CURRENT_COMBO = "CLEAR_CURRENT_COMBO"
export const DELETE_COMBO = "DELETE_COMBO"
export const EDIT_COMBO = "EDIT_COMBO"
export const UPDATE_CURRENT_COMBO_NAME = "UPDATE_CURRENT_COMBO_NAME"
export const NEW_CHARACTER = "NEW_CHARACTER"
export const CHANGE_CHARACTER = "CHANGE_CHARACTER"
export const RENAME_CURRENT_CHARACTER = "RENAME_CURRENT_CHARACTER"

export const addAttack = ({ attack }) => ({
    type: ADD_ATTACK,
    payload: { attack }
})

export const deleteAttack = ({ name }) => ({
    type: DELETE_ATTACK,
    payload: { name }
})

export const rollAttack = ({ name }) => ({
    type: ROLL_ATTACK,
    payload: { name }
})

export const addAttackToCombo = ({ name }) => ({
    type: ADD_ATTACK_TO_COMBO,
    payload: { name }
})

export const removeAttackFromCombo = ({ index }) => ({
    type: REMOVE_ATTACK_FROM_COMBO,
    payload: { index }
})

export const saveCurrentCombo = ({ name }) => ({
    type: SAVE_CURRENT_COMBO,
    payload: { name }
})

export const clearCurrentCombo = () => ({
    type: CLEAR_CURRENT_COMBO
})

export const deleteCombo = ({ name }) => ({
    type: DELETE_COMBO,
    payload: { name }
})

export const editCombo = ({ name }) => ({
    type: EDIT_COMBO,
    payload: { name }
})

export const clearCurrentRoll = () => ({
    type: CLEAR_CURRENT_ROLL
})

export const setDC = ({ DC }) => ({
    type: SET_DC,
    payload: { DC }
})

export const rollCombo = ({ name }) => ({
    type: ROLL_COMBO,
    payload: { name }
})

export const rollCurrentCombo = () => ({
    type: ROLL_CURRENT_COMBO
})

export const updateCurrentComboName = ({ name }) => ({
    type: UPDATE_CURRENT_COMBO_NAME,
    payload: { name }
})

export const newCharacter = () => ({
    type: NEW_CHARACTER
})

export const changeCharacter = ({ id }) => ({
    type: CHANGE_CHARACTER,
    payload: { id }
})

export const renameCurrentCharacter = ({ name }) => ({
    type: RENAME_CURRENT_CHARACTER,
    payload: { name }
})