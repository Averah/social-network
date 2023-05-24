


let initialState = {
    friends: [
        { id: 1, friend: 'Sasha' },
        { id: 2, friend: 'Anna' },
        { id: 3, friend: 'Kate' }
    ] as Array<FrindType>
}

export type InitialStateType = typeof initialState
export type FrindType = {
    id: number
    friend: string
}

export const sidebarReducer = (state = initialState, action:any): InitialStateType => {
    return state
}

