/*
 * pageList: 用来呈现所有的已经存在问卷页面
 * */
import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {Table, Button, Radio, message, Modal} from 'antd';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {LocalStore} from '../../util/localStore';
import * as paperEditAction from '../../actions/paper_num_action';
import './style.less';

class PageList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            select: false,
            visible: false,
            delIndex: 0
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
        /*
         * 用来测试数据
         * */
        this.setState({
            data: this.props.paperInfo
        });
        //const paperList = this.props.paperInfo;
        //console.log(paperList);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.paperInfo || LocalStore.getItem('QUESTION')
        });
    }

    editClickHandler(recordId) {
        //通过id获取问卷的回答情况, 该id是redux中每条数据的编号id
        hashHistory.push("/edit/" + encodeURIComponent(recordId));
    }

    /*
     * 删除指定记录
     * */
    delClickHandler(recordId) {
        // console.log(recordId);
        this.setState({
            visible: true,
            delIndex: recordId
        });

    }

    /*
     * 删除所有记录
     * */
    delAllHandler() {
        let allowDel = false;
        const actions = this.props.actions;
        const data = this.state.data;
        data.forEach(item=> {
            if (item.status == '发布中') {
                allowDel = true;
            }
        });
        if (!allowDel) {
            actions.delAllItem();
        }
        else {
            message.info('无法全部删除，请逐个删除');
        }

    }

    /*
     * 新建问卷
     * */
    createHandler() {
        hashHistory.push('new');
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    /*
     * 查看数据
     * */
    checkHandler(index) {
        hashHistory.push("/check/" + index);
    }

    handleOk() {
        const actions = this.props.actions;
        const recordId = this.state.delIndex;
        actions.delPaper(recordId);
        this.setState({
            select: false,
            visible: false
        });
    }

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state'
        }, {
            title: '操作',
            key: 'actions',
            render: record=>(
                <span>
                    <Button type="primary" onClick={this.editClickHandler.bind(this, record.id)}
                            disabled={record.state == '发布中'}>编辑</Button>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={this.delClickHandler.bind(this, record.id)}
                            disabled={record.state == '发布中'}>删除</Button>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={this.checkHandler.bind(this, record.id)}>查看数据</Button>
                </span>
            )
        }];

        const dataSource = this.state.data.map((item, index)=> {
            return {
                key: `${index}`,
                title: `我的问卷${index + 1}`,
                time: item.id,
                state: item.status, //根据每个item下的状态包装数据
                id: index,
                data: item.content //data中保存着本问卷的选项选择情况
            }

        });

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    select: (selectedRows.length == this.props.paperInfo.length)
                })
            },
            /*getCheckboxProps: record => ({
             disabled: record.name === 'Disabled User',    // Column configuration not to be checked
             }),*/
        };

        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource}/>
                <div className="page-list-selection-btn">
                    <Button type="primary" disabled={!this.state.select}
                            onClick={this.delAllHandler.bind(this)}>删除所有</Button>
                    <Button type="primary" icon="plus" onClick={this.createHandler.bind(this)}>新建问卷</Button>
                </div>
                <Modal title="提示" visible={this.state.visible} onOk={this.handleOk.bind(this)}
                       onCancel={this.handleCancel.bind(this)}>
                    <p>确认要删除此问卷</p>
                </Modal>
            </div>
        )
    }

}

let mapStateToProps = (state)=> {
    return {
        paperInfo: state.paperNumReducer
    }
};

let mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators(paperEditAction, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageList)