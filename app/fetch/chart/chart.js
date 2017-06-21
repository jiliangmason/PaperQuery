/**
 * Created by Administrator on 2017/6/15 0015.
 */
import {getData} from '../get';
import {postData} from '../post';

export function fetchChartData() {
    return getData('/api/chart');
}

export function postChartData(value) {
    return postData('/api/submit/' , value);
}