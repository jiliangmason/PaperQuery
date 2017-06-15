/*
* 当前没有已经存在的问卷时，新建页面
* */

import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {Col, Row, Button} from 'antd';
import {Link} from 'react-router';
import './style.less';

export default class NewPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className="new-page-window">
                            <Link to="edit">
                                <Button type="primary" icon="plus" className={"new-page-create-button"}>新建问卷</Button>
                            </Link>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }

}