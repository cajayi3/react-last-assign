import { createSlice } from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name:   "Name",
        height: "Height",
        weight: "Weight",
        strength: "Strength",
        vision: "Vision",
        weakness: "Weakness",
        ability: 'Ability',
        origin: "Origin",
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseHeight: (state, action) => { state.height = action.payload },
        chooseWeight: (state, action) => { state.weight = action.payload },
        chooseStrength: (state, action) => { state.strength = action.payload },
        chooseVision: (state, action) => { state.vision = action.payload },
        chooseWeakness: (state, action) => { state.weakness = action.payload },
        chooseAbility: (state, action) => { state.ability = action.payload },
        chooseOrigin: (state, action) => { state.origin = action.payload },

    }
})


export const reducer = rootSlice.reducer;
export const { chooseName, chooseHeight, chooseWeight, chooseStrength, chooseVision, chooseWeakness, chooseAbility, chooseOrigin} = rootSlice.actions