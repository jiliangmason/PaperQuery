import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';
import {Button} from 'antd';

export default class ButtonChangeItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }


    upClick() {
        const index = this.props.index;
        this.props.goUp(index);
    }

    downClick() {
        const index = this.props.index;
        this.props.goDown(index);
    }

    copyClick() {
        const index = this.props.index;
        this.props.doCopy(index);
    }

    delClick() {
        const index = this.props.index;
        this.props.doDel(index);
    }

    render() {
        return (
            <div className="query-button-area">
                <Button type="primary" onClick={this.upClick.bind(this)}>上移</Button>
                <Button type="primary" onClick={this.downClick.bind(this)}>下移</Button>
                <Button type="primary" onClick={this.copyClick.bind(this)}>复用</Button>
                <Button type="primary" onClick={this.delClick.bind(this)}>删除</Button>
            </div>
        )
    }

}