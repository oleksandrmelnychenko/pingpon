import { combineEpics } from 'redux-observable'
import * as userService from './user.service'

const epicsArray = [
    ...(Object as any).values(userService),
]

export const epics = combineEpics(...epicsArray);
