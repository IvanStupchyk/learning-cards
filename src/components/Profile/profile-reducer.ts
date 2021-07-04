const initialStateProfile = {
   profile:{
       _id: '',
       email: '',
       name: '',
       avatar: '',
       publicCardPacksCount: 0
   }
}

export const profileReducer = (state: initialProfileType = initialStateProfile, action: actionsProfileType) => {
    switch (action.type) {
        case 'PROFILE/SET-PROFILE':
            return {...state, ...action.payload}
        case 'PROFILE/UPDATE-PROFILE':
            return {...state, profile: state.profile, avatar: action.payload.avatar, name: action.payload.name}
        default:
            return state
    }
}

//actionC
export const setProfileAC = (profile: initialProfileType) => ({
    type: 'PROFILE/SET-PROFILE', payload: {profile}
} as const)
const updateProfileAC = (avatar: string, name: string) => ({
    type: 'PROFILE/UPDATE-PROFILE',
    payload: {avatar, name}
} as const)


//types
export type initialProfileType = typeof initialStateProfile
export type actionsProfileType = | ReturnType<typeof setProfileAC>
    | ReturnType<typeof updateProfileAC>