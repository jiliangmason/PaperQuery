import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {Card, Radio, Checkbox, Progress} from 'antd';
import './style.less';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

export default class CheckList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            chart: []
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.chart);
        this.setState({
            chart: nextProps.chart
        })
    }

    render() {
        const data = this.props.data;
        const cardStyle = {
            width: "926px",
            margin: "20px auto",
        };
        const textCardStyle = {
            width: "926px",
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
        return (
            <div>
                {data.map((item, index)=> {
                    if (item.id == "radio") {
                        return (<div key={index}>
                            <Card style={cardStyle} className="check-list-radio-data">
                                <span className="radio-title-name float-left">Q{index + 1}单选题</span>
                                <RadioGroup>
                                    <Radio style={radioStyle} value={1}>选项一</Radio>
                                    <Radio style={radioStyle} value={2}>选项二</Radio>
                                </RadioGroup>
                                <p>数据占比</p>
                                <Progress percent={this.state.chart.length?Number(this.state.chart[0].value[0]):0} status="active"/>
                                <Progress percent={this.state.chart.length?Number(this.state.chart[0].value[1]):0} status="active"/>
                                {/*这里放数据比条形图*/}
                            </Card>
                        </div>)
                    }

                    if (item.id == "checkbox") {
                        return (<div key={index}>
                            <Card style={cardStyle}>
                                <span className="checkbox-title-name float-left">Q{index + 1}多选题</span>
                                <div className="check-list-checkbox-group">
                                    <CheckboxGroup options={options}/>
                                </div>
                                <p>数据占比</p>
                                <Progress percent={this.state.chart.length?Number(this.state.chart[1].value[0]):0} status="active"/>
                                <Progress percent={this.state.chart.length?Number(this.state.chart[1].value[1]):0} status="active"/>
                                <Progress percent={this.state.chart.length?Number(this.state.chart[1].value[2]):0} status="active"/>
                                {/*这里放饼状图*/}
                            </Card>
                        </div>)
                    }

                    if (item.id == "text") {
                        return (<div key={index}>
                            <Card style={textCardStyle}>
                                <p className="input-title-name">Q{index + 1}文本题</p>
                                <div className="check-list-progress">
                                    <p>有效数据占比</p>
                                    <Progress percent={this.state.chart.length?Number(this.state.chart[2].value[0]):0} status="active"/>
                                </div>
                                {/*条状图*/}
                            </Card>
                        </div>)
                    }

                })}
            </div>
        )
    }

}

