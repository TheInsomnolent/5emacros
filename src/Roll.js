import React from "react"
import { sum } from "lodash"

const polyDie_ = faces => Math.floor(Math.random() * Math.floor(faces)) + 1
const d20 = () => polyDie_(20)

const polyDice = ({ diceString, critSuccess }) => {
    let numberOfDice = diceString.split("d")[0]
    let numberOfFaces = diceString.split("d")[1]
    if (critSuccess) numberOfDice = 2 * numberOfDice

    let total = 0
    for (let i = 0; i < numberOfDice; i++) {
        total += polyDie_(numberOfFaces)
    }

    return total
}

export const rollAttacks = attacks => {
    let rollData = []

    attacks.forEach(attack => {
        // Handle advantage canceling
        let advantage = attack.advantage
        let disadvantage = attack.disadvantage
        if (advantage && disadvantage) {
            advantage = false
            disadvantage = false
        }

        // Handle attack type data
        let result = {
            name: attack.name,
            type: attack.type,
            magical: attack.magical
        }

        // Handle to hit roll
        result.toHit = advantage
            ? Math.max(d20(), d20())
            : disadvantage
            ? Math.min(d20(), d20())
            : d20()

        if (result.toHit === 1) result.crit = "FAIL"
        else if (result.toHit === 20) result.crit = "SUCCESS"
        result.toHit = result.toHit + parseInt(attack.hit)

        // Handle damage dice
        result.damage = sum(
            attack.damage.split(/[-+]/).map(substring => {
                if (substring.includes("d")) {
                    return polyDice({
                        diceString: substring,
                        critSuccess: result.crit === "SUCCESS"
                    })
                } else return parseInt(substring)
            })
        )
        rollData.push(result)
    })

    return rollData
}

const Roll = () => {
    return <div />
}

export default Roll
