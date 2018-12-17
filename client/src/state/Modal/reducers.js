import { handleActions } from 'redux-actions';
import { changeModal, closeModal, cloaseModal } from './actions'

const modalReducer = handleActions({
    [changeModal]: (state, action) => action.payload,
    [cloaseModal]: (state, action) => null
}, null);

export default modalReducer;