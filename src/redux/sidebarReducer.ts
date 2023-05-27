


let initialState = {
    friends: [
        { id: 1, name: 'Sasha' },
        { id: 2, name: 'Anna' },
        { id: 3, name: 'Kate' }
    ] as Array<FriendType>
}

export type InitialStateType = typeof initialState
export type FriendType = {
    id: number
    name: string
}

export const sidebarReducer = (state = initialState, action:FriendType): InitialStateType => {
    return state
}

