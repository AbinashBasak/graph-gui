import React from 'react';
import styles from './canvas.module.css';
import Shape, { Update } from './shape';

import { connect } from 'react-redux';
import * as CanvasActions from '../../store/action/createAction';
import { bindActionCreators } from 'redux';



class Rect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: window.innerHeight,
            width: (window.innerWidth * 66.45 / 100),
            mouseX: 0,
            mouseY: 0,
            ctx: null
        }
        this.updateCursor = this.updateCursor.bind(this)
    }

    componentDidMount() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        this.setState(ctx)
        canvas.addEventListener('click', (e) => {
            this.setState({ mouseX: e.pageX - canvas.offsetLeft });
            this.setState({ mouseY: e.pageY - canvas.offsetTop });
            Shape(ctx, this.state.mouseX, this.state.mouseY, this.props.data, this.props.actions)
        })
    }

    componentDidUpdate() {
        this.updateCursor(this.props.data.activeOperations)
        Update(this.props.data)
    }

    updateCursor(e) {
        switch (e) {
            case 'E1': document.getElementById('canvas').style.cursor = 'crosshair'; break
            default: document.getElementById('canvas').style.cursor = 'default'
        }
    }

    render() {
        return (
            <>
                <canvas className={styles.canvas} height={this.state.height} width={this.state.width} id="canvas" ></canvas>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(CanvasActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Rect);