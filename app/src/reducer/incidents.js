import IncidentsService from "../services/incidents.service";

const ACTION_CREATE  = "ACTION_CREATE";
const ACTION_READ    = "ACTION_READ";
const ACTION_UPDATE  = "ACTION_UPDATE";
const ACTION_DELETE  = "ACTION_DELETE";
const ACTION_LOADING = "ACTION_LOADING";

const INITIAL_STATE = {
    loading: false,
    incidents: [],
    types: [],
    severities: [],
};

export default function reducer(state = INITIAL_STATE, action = {}) {
    const { payload } = action;
    const incidents = [...state.incidents];

    switch (action.type) {
        case ACTION_CREATE:
            return { ...state, incidents: [ ...state.incidents, payload.data ] };
        case ACTION_READ:
            return { 
                ...state,
                incidents: [ ...payload.data.incidents ],
                types: [ ...payload.data.types ],
                severities: [ ...payload.data.severities ],
            };
        case ACTION_UPDATE:
            let updatedIndex = incidents.findIndex(item => item.id === payload.data.id);

            if (updatedIndex !== -1) {
                incidents[updatedIndex] = payload.data;
            }

            return { ...state, incidents: [ ...incidents ] };
        case ACTION_DELETE:
            let deletedIndex = incidents.findIndex(item => item.id === payload.id);

            if (deletedIndex !== -1) {
                incidents.splice(deletedIndex, 1);
            }

            return { ...state, incidents: [...incidents] };
        case ACTION_LOADING:
            return { ...state, loading: true };
        default: return state;
    }
}

export const create = (data) => async (dispatch) => {
    try {
        const res = await IncidentsService.create(data);

        dispatch({
            type: ACTION_CREATE,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const read = () => async (dispatch) => {
    try {
        dispatch({
            type: ACTION_LOADING
        })

        const res = await IncidentsService.all();

        dispatch({
            type: ACTION_READ,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const find = (id) => async (dispatch) => {
    try {
        const res = await IncidentsService.find(id);

        dispatch({
            type: ACTION_READ,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const update = (data) => async (dispatch) => {
    try {
        const res = await IncidentsService.update(data);

        dispatch({
            type: ACTION_UPDATE,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const destroy = (id) => async (dispatch) => {
    try {
        await IncidentsService.destroy(id);

        dispatch({
            type: ACTION_DELETE,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};