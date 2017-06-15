import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Edit from '../containers/Edit/edit';
import Home from '../containers/Home/home';
import PageList from '../containers/PageList/page_list';
import App from '../containers/App';
import NewPage from '../containers/NewPage/new_page';
import Check from '../containers/Check/check';

export default class RouterMap extends React.Component{
    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="/edit(/:id)" component={Edit}/>
                    <Route path="/page" component={PageList}/>
                    <Route path="/new" component={NewPage}/>
                    <Route path="/check/:index" component={Check}/>
                </Route>
            </Router>
        )
    }
}