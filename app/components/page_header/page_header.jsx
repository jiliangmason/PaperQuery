import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {Col, Row, Icon} from 'antd';
import './style.less';

export default class PageHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <div className="header-left-side"></div>
                    </Col>
                    <Col span={20}>
                        <div id="page-container">
                            <div className="page-header-title float-left">
                                <Icon type="question-circle" />
                                <span>问卷管理</span>
                            </div>
                            <div className="page-header-subtitle float-left">
                                <span>我的问卷</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={2}>
                        <div className="header-right-side"></div>
                    </Col>
                </Row>
            </div>
        )
    }

}