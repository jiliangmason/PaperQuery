/*
 * 根据已经存在的问卷条数，来呈现是新建页面 or 所有问卷页面
 * */

import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin'
import {LocalStore} from '../../util/localStore';
import {QUESTION} from '../../config/localStoreConfig';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoActionFormList from '../../actions/paper_num_action';
import NewPage from '../../containers/NewPage/new_page';
import PageList from '../../containers/PageList/page_list';

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            num: []
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
        const questionNum = LocalStore.getItem('QUESTION');
        if (questionNum != null) {
            this.setState({
                num: questionNum
            });
        }
    }

    render() {
        const pageNum = this.state.num.length
            ? <PageList exdata={this.state.num}/>
            : <NewPage />;
        return (
            <div>
                {pageNum}
            </div>
        )
    }

}
