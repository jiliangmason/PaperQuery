/*
 * 问卷编辑页面
 * */
import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';
import {Card, Row, Col, Collapse, Icon, Button, Input, DatePicker, Modal} from 'antd';
import QuestionList from './subpage/question_list';
import QuestionEdit from './subpage/question_edit';
import {hashHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as paperPageAction from '../../actions/paper_num_action';
const Panel = Collapse.Panel;

export default class Edit extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            radio: 0,
            checkbox: 0,
            textarea: 0,
            total: 0,
            isSave: false,
            isPub: false,
            visible: false, //modal可见
            confirmLoading: false, //确认按钮loading
            date: ""
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    radioHandler() {
        const radioNum = this.state.radio;
        this.setState({
            total: this.state.total + 1,
            radio: radioNum + 1
        })
    }

    checkboxHandler() {
        const checkboxNum = this.state.checkbox;
        this.setState({
            total: this.state.total + 1,
            checkbox: checkboxNum + 1
        })
    }

    textareaHandler() {
        const textareaNum = this.state.textarea;
        this.setState({
            total: this.state.total + 1,
            textarea: textareaNum + 1
        })
    }

    dateChange(value, dateString) {
        this.setState({
            date: dateString
        })
    }

    dateOk(value) {
        console.log('onOk: ',value);
    }

    /*
    * 保存
    * */
    saveHandler() {
        let save = this.state.isSave;
        this.setState({
            isSave: !save
        })

    }

    /*
    * 发布
    * */
    pubHandler() {
        this.setState({
            visible: true
        })
    }

    /*
    * 对话框取消
    * */
    handleCancel() {
        this.setState({
            visible: false
        })
    }

    /*
    * 对话框确认
    * */
    handleOk() {
        this.setState({
            confirmLoading: true
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                isPub: true,
                confirmLoading: false,
            });

            //可以发起post请求
        }, 2000);
    }

    render() {
        const createQlist = this.props.params.id
            ?<QuestionEdit id={this.props.params.id} save={this.state.isSave} date={this.state.date}
                           total={this.state.total}
                           radio={this.state.radio}
                           checkbox={this.state.checkbox}
                           textarea={this.state.textarea} pub={this.state.isPub}/>

            :<QuestionList  total={this.state.total}
                            radio={this.state.radio}
                            checkbox={this.state.checkbox}
                            textarea={this.state.textarea}
                            save={this.state.isSave} date={this.state.date} pub={this.state.isPub}/>;
        const panelHeader = (
            <div className="add-new-question">
                <Icon type="plus" className="add-new-icon"/>
                <span>添加问题</span>
            </div>
        );
        return (
            <div>
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <div className="edit-page-window">
                            <Card title="这是标题" bordered={false} className="edit-page-card">
                                {createQlist}
                            </Card>
                            <Card bordered={false} className="edit-page-card">
                                <Collapse bordered={false} className="edit-page-header">
                                    <Panel header={panelHeader} key="1">
                                        <div className="edit-page-button float-left">
                                            <Button type="primary" icon="check-circle-o"
                                                    onClick={this.radioHandler.bind(this)}>单选</Button>
                                            <Button type="primary" icon="check-square"
                                                    onClick={this.checkboxHandler.bind(this)}>多选</Button>
                                            <Button type="primary" icon="file-text"
                                                    onClick={this.textareaHandler.bind(this)}>文本</Button>
                                        </div>
                                    </Panel>
                                </Collapse>
                            </Card>
                            <Card bordered={false}>
                                <div className="edit-page-footer clear-fix">
                                    <div className="edit-page-footer-date float-left">
                                        <span>问卷截止日期</span>
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="选择截止日期"
                                            onChange={this.dateChange.bind(this)}
                                            onOk={this.dateOk.bind(this)}
                                        />
                                    </div>
                                    <div className="edit-page-footer-query-btn float-left">
                                        <Button type="primary" onClick={this.saveHandler.bind(this)}>保存问卷</Button>
                                        <Button type="primary" onClick={this.pubHandler.bind(this)}>发布问卷</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Modal title="提示" visible={this.state.visible}  onOk={this.handleOk.bind(this)} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel.bind(this)}>
                            <div>
                                <p>是否发布问卷?</p>
                                <p>(此问卷截止日期是:{this.state.date})</p>
                            </div>
                        </Modal>
                    </Col>
                    <Col span={2}/>
                </Row>
            </div>
        )
    }

}
