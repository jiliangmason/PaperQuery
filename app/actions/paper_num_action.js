/**
 * Created by Administrator on 2017/5/16 0016.
 */
import * as ActionType from '../constants/user_info_list';

/*
* 1.编辑某个问卷
* 2.删除问卷
*
*
* */

export function updatePager(data) {
    return {
        type: ActionType.PAPER_UPDATE,
        data /*这里是es6对象属性速写，相当于data: data*/
    }
}

export function delPaper(item) {
    return {
        type: ActionType.PAPER_DEL,
        data: item
    }
}

export function delAllItem() {
    return {
        type: ActionType.DEL_ALL_ITEM
    }
}

export function addPaper(item) {
    return {
        type: ActionType.PAPER_ADD,
        data: item
    }
}


