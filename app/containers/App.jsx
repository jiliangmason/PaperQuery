import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin'
import {LocalStore} from '../util/localStore';
import {QUESTION} from '../config/localStoreConfig';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoActionFormList from '../actions/paper_num_action';
import NewPage from '../containers/NewPage/new_page';
import PageHeader from '../components/page_header/page_header';

export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            num: 0
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <PageHeader />
                {this.props.children}
            </div>
        )
    }

}


