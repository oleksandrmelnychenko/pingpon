import { notification } from "antd"
import { IServiceApplicationState } from "../reducers/application.state"
import { gameManagementActions } from "../reducers/game.slice"
import { ajax } from 'rxjs/ajax'
import { catchError, map, mergeMap, switchMap, flatMap, merge } from 'rxjs/operators'
import { from, of, observable, Observable } from 'rxjs';
import API from '../constants/api.constants'
import { ErrorHandler } from '../helpers/error.handling';

