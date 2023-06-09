import { ResultCodesEnum } from '../API/authAPI';
import { followAPI, FollowUnfollowType } from '../API/followAPI';
import { actions, InitialState, usersReducer, follow, unfollow } from './usersReducer';


let state: InitialState 

beforeEach(() => {
    state = {
        users: [{id:0, name: 'Kate0', status: 'status 0', photos: {small: null, large: null}, followed: false},
        {id:1, name: 'Kate1', status: 'status 1', photos: {small: null, large: null}, followed: false},
        {id:2, name: 'Kate2', status: 'status 2', photos: {small: null, large: null}, followed: true},
        {id:3, name: 'Kate3', status: 'status 3', photos: {small: null, large: null}, followed: true}],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>,
        filter: {searchData: '', friend: ''}
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect (newState.users[0].followed).toBeFalsy()
    expect (newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect (newState.users[2].followed).toBeTruthy()
    expect (newState.users[3].followed).toBeFalsy()
})


// thunks tests

jest.mock('../API/followAPI')
const followAPIMock = jest.mocked(followAPI, { shallow: true });
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    followAPIMock.followUser.mockClear();
    followAPIMock.unfollowUser.mockClear();    
})

const result: FollowUnfollowType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}


test('success follow thunk', async () => {
    followAPIMock.followUser.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
    followAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));

    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
