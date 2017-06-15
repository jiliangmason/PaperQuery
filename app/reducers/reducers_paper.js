import * as ActionType from '../constants/user_info_list';

/*
 用户数据的处理规则
 * action.data 和 action.type: 从userinfo_action中传来的数据
 * state 是一个全局的状态树
 *
 * */
const initialState = [];
export default function paperNumReducer(state = initialState, action) {
    //console.dir(state);
    switch (action.type) {
        case ActionType.PAPER_UPDATE:
            return action.data;

        case ActionType.PAPER_DEL:
            state = state.filter((item, index)=> {
                if (index != action.data) {
                    return item;
                }
            });
            return state;

        case ActionType.PAPER_ADD:
            state.unshift(action.data);
            return state;

        case ActionType.DEL_ALL_ITEM:
            state = [];
            return state;

        default:
            return state;
    }
}