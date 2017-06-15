import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './static/css/common.less';
import './static/css/font.css';
import 'antd/dist/antd.css';
import Perf from 'react-addons-perf';
import {hashHistory} from 'react-router';
import RouteMap from './router/route_map';

/*
* 网页性能检测
* */
if (__DEV__) {
    window.Perf = Perf;
}

const store = configureStore();

class MainIndex extends React.Component {

    render() {

        return (
            <Provider store={store}>
               <RouteMap history={hashHistory}/>
            </Provider>
        )
    }

}

ReactDOM.render(<MainIndex />, document.getElementById('root'));