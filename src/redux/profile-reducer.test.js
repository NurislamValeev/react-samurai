import profileReducer, {setStatus} from "./profile-reducer"
import React from "react"

it('new status should be set', () => {
   // 1. test data
   let action = setStatus("hey broo <3")

   let state = {
      status: ""
   }
   // 2. action
   let newState = profileReducer(state, action)

   // 3. expectation
   expect(newState.status).toBe("hey broo <3")
})

