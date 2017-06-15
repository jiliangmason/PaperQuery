/**
 * Created by Administrator on 2017/6/15 0015.
 */
import {getData} from '../get';

export function fetchChartData() {
    return getData('/api/chart');
}