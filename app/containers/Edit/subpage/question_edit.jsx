import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Card, Radio, Checkbox, Input} from 'antd';
import * as paperEditAction from '../../../actions/paper_num_action';
import ButtonChangeItem from '../../../components/button_change_item/button_change_item';
import {LocalStore} from '../../../util/localStore';
import * as Config from '../../../config/localStoreConfig';
import {postChartData} from '../../../fetch/chart/chart';
import './style.less';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class QuestionEdit extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            paperId: 0,
            textWritable: false,
            totalArr: [],
            publish: false
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
        const id = Number(this.props.id);
        const paperInfo = this.props.paperInfo;
        const content = paperInfo[id].content;

        this.setState({
            paperId: id, //保存本问卷在redux中的id
            totalArr: content
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props == nextProps)
            return;

        const totalObj = this.state.totalArr;
        //console.log(nextProps.radio);

        if (this.props.total != nextProps.total) //总数发生改变
        {
            if (this.props.radio != nextProps.radio) {
                totalObj.push({
                    id: "radio",
                    index: nextProps.radio //待修改，毫无逻辑
                })
            }

            if (this.props.checkbox != nextProps.checkbox) {
                totalObj.push({
                    id: "checkbox",
                    index: nextProps.checkbox
                })
            }

            if (this.props.textarea != nextProps.textarea) {
                totalObj.push({
                    id: "text",
                    index: nextProps.textarea
                })
            }
        }

        this.setState({
            totalArr: totalObj
        });

        /*
         * save操作了,可以在这里面把问卷内容存进redux
         * */
        if (this.props.save != nextProps.save) {
            //console.log(this.state.totalArr);
            this.saveData();
            //console.log(this.props.paperInfo[0]);
        }

        /*
         * pub操作
         * */
        if (this.props.pub != nextProps.pub) {
            this.setState({
                publish: true
            });
            //这里如果直接写saveData是不会生效的，因为state.publish并没有变化
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevState.publish != this.state.publish) {
            //console.log(this.state.publish);
            this.saveData(); //渲染完成publish才改变
        }
    }

    /*
     * 保存redux数据，更新某id的问卷页面
     * */
    saveData() {
        const data = this.state.totalArr;
        const paper = this.props.paperInfo;
        const actions = this.props.actions;
        const dateId = this.props.date;

        let editData = {
            id: dateId, //日期+时分秒
            content: data,
            status: this.state.publish?'发布中':'未发布'
        };
        paper[this.state.paperId] = editData;
        actions.updatePager(paper);
        console.log('编辑页面保存数据',paper);

        //写入localStorage
        LocalStore.setItem(Config.QUESTION, this.props.paperInfo);

        //post发送数据到服务器
        let res = postChartData(editData);
        res.then(response=>response.json())
            .then(json=>{
                console.log(json);
            })
            .catch(err=>{
                console.log('post err:'+ err.message);
            });

        hashHistory.push("/page");
    }

    /*
     * 删除方法
     * */
    delHandler(index) {
        const totals = this.state.totalArr;
        totals.splice(index, 1);
        this.setState({
            totalArr: totals
        });

        //console.log(totals);
    }

    /*
     * 复用
     * */
    copyHandler(index) {
        const totals = this.state.totalArr;

        totals.splice(index, 0, totals[index]);
        this.setState({
            totalArr: totals
        });

        //console.log(totals, index);
    }

    /*
     * 上移
     * */
    moveUp(index) {
        const totals = this.state.totalArr;
        if (!index) {
            return;
        }
        //[totals[index-1], totals[index]] = [totals[index], totals[index-1]];
        let tmp;
        tmp = totals[index - 1];
        totals[index - 1] = totals[index];
        totals[index] = tmp;

        this.setState({
            totalArr: totals
        });

        //console.log(totals);
    }

    /*
     * 下移
     * */
    moveDown(index) {
        const totals = this.state.totalArr;
        if (index == totals.length - 1) {
            return;
        }
        //[totals[index-1], totals[index]] = [totals[index], totals[index-1]];
        let tmp;
        tmp = totals[index + 1];
        totals[index + 1] = totals[index];
        totals[index] = tmp;

        this.setState({
            totalArr: totals
        });

        //console.log(totals);
    }

    /*
     * 单选点击事件,给每一个radio数组添加一个value属性记录当前选择的值
     * */
    radioChange(index, e) {
        let radioArr = this.state.totalArr;
        let val = e.target.value;
        radioArr[index].value = val;
        this.setState({
            totalArr: radioArr
        });
        //console.log(radioArr[index]);

    }

    /*
     * 保存多选框的选择结果
     * */
    checkGroupHandler(index, checkedValues) {
        let checkArr = this.state.totalArr;
        checkArr[index].value = checkedValues;
        this.setState({
            totalArr: checkArr
        });
    }

    /*
    * 文本框是否选择，选择true 不选false
    * */
    textSelected(index, e) {
        let val = e.target.checked;
        //console.log(val);
        let textarr = this.state.totalArr;
        textarr[index].write = val;
        this.setState({
            totalArr: textarr
        })
    }

    changeHandler(index, e) {
        let value = e.target.value;
        let textarr = this.state.totalArr;
        if (!textarr[index].write)
        {
            return;
        }
        textarr[index].value = value;
        this.setState({
            totalArr: textarr
        });
        //console.log(this.state.totalArr);
    }

    render() {

        const cardStyle = {
            width: "926px",
            height: "138px",
            margin: "20px auto",
        };
        const textCardStyle = {
            width: "926px",
            height: "240px",
            margin: "20px auto",
        };
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const options = [
            {label: '选项一', value: '选项一'},
            {label: '选项二', value: '选项二'},
            {label: '选项三', value: '选项三'},
        ];

        const content = this.props.paperInfo[Number(this.props.id)].content;
        return (
            <div>
                {
                    content.map((item, index)=> {
                        if (item.id == "radio") {
                            return (<div key={index}>
                                <Card style={cardStyle}>
                                    <span className="radio-title-name float-left">Q{index + 1}单选题</span>
                                    <RadioGroup onChange={this.radioChange.bind(this, index)} defaultValue={item.value}>
                                        <Radio style={radioStyle} value={1}>选项一</Radio>
                                        <Radio style={radioStyle} value={2}>选项二</Radio>
                                    </RadioGroup>
                                    <ButtonChangeItem className="button-change-item-area" index={index}
                                                      doDel={this.delHandler.bind(this)}
                                                      doCopy={this.copyHandler.bind(this)}
                                                      goUp={this.moveUp.bind(this)}
                                                      goDown={this.moveDown.bind(this)}/>
                                </Card>
                            </div>)
                        }

                        if (item.id == "checkbox") {
                            return (<div key={index}>
                                <Card style={cardStyle}>
                                    <span className="checkbox-title-name float-left">Q{index + 1}多选题</span>
                                    <div className="checkbox-group">
                                        <CheckboxGroup options={options}
                                                       onChange={this.checkGroupHandler.bind(this, index)}
                                                       defaultValue={item.value}/>
                                    </div>
                                    <ButtonChangeItem className="button-change-item-area" index={index}
                                                      doDel={this.delHandler.bind(this)}
                                                      doCopy={this.copyHandler.bind(this)}
                                                      goUp={this.moveUp.bind(this)}
                                                      goDown={this.moveDown.bind(this)}/>
                                </Card>
                            </div>)
                        }

                        if (item.id == "text") {
                            return (<div key={index}>
                                <Card style={textCardStyle}>
                                    <span className="input-title-name float-left">Q{index + 1}文本框</span>
                                    <div className="input-group">
                                        <Input type="textarea" rows={5} style={{width: "600px", marginLeft: "20px"}}
                                               value={item.value ? item.value : ""} disabled={!item.write}
                                               onChange={this.changeHandler.bind(this, index)}
                                        />
                                        <Checkbox onChange={this.textSelected.bind(this, index)}
                                                  defaultChecked={item.value ? true : false}>此题是否必选</Checkbox>
                                    </div>
                                    <ButtonChangeItem className="button-change-item-area" index={index}
                                                      doDel={this.delHandler.bind(this)}
                                                      doCopy={this.copyHandler.bind(this)}
                                                      goUp={this.moveUp.bind(this)}
                                                      goDown={this.moveDown.bind(this)}/>
                                </Card>
                            </div>)
                        }
                    })
                }
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
)(QuestionEdit)