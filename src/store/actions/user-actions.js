import { userActions } from "../slices/user-slice"

export const updateToken = (token) => {
  return async (dispatch) => {
    dispatch(userActions.updateUserToken({token}))
  }
}