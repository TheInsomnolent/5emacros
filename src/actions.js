export const ADD_ATTACK = "ADD_ATTACK"
export const DELETE_ATTACK = "DELETE_ATTACK"
export const ROLL_ATTACK = "ROLL_ATTACK"
export const ADD_ATTACK_TO_COMBO = "ADD_ATTACK_TO_COMBO"

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

export const addAttackToCombo = ({
    name,
    advantage = false,
    disadvantage = false
}) => ({
    type: ADD_ATTACK_TO_COMBO,
    payload: { name, advantage, disadvantage }
})
