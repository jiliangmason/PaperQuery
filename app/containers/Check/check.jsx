import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Col, Row, Card, Button} from 'antd';
import CheckList from '../../components/check_list/check_list';
import {fetchChartData} from '../../fetch/chart/chart';
import './style.less';

class Check extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            chart: []
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
        const info = this.props.paperInfo;
        const params = this.props.params;
        console.log('查看的问卷信息:', info[params.index].content);
        this.setState({
            data: info[params.index].content
        });
    }

    componentDidMount() {
        let result = fetchChartData();
        result.then(res=>res.json())
            .then(json=>{
                //console.log('chart data',json);
                this.setState({
                    chart: json
                })
            })
    }

    backHandler() {
        window.history.back();
    }

    render() {

        return (
            <div>
                <Row>
                    <Col span={2} />
                    <Col span={20}>
                        <div className="check-data-window">
                            <Card title={"这是标题"} bordered={false} extra={<Button icon="left" onClick={this.backHandler.bind(this)}>返回</Button>} className="check-form-title">
                                <CheckList data={this.state.data} chart={this.state.chart}/>
                            </Card>
                        </div>
                        <Button icon="left" className="check-form-back-btn" onClick={this.backHandler}>返回</Button>
                    </Col>
                    <Col span={2} />
                </Row>
            </div>
        )
    }

}

const mapStateToProps = (state)=> {
    return {
        paperInfo: state.paperNumReducer
    }
};

export default connect(
    mapStateToProps
)(Check)

