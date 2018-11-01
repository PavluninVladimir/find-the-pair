import /* webpackPreload: true */  { Component } from 'react';
import /* webpackPreload: true */ { connect } from 'react-redux';
import /* webpackPreload: true */  uuid4 from 'uuid/v4';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import style from './playing-field.scss';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
    getImg
} from '../actions/get-img';
import {
    generate,
    clearIdCell,
    isPair,
    imgView,
    imgHide,
    gameOver
} from '../actions/generate-field';


class PlayingField extends Component {

    imgToForm = (options) => {
        const { count, key, img } = options;
        return (<img
            key={key}
            data-key={key}
            src={img}
            onClick={this.imgOnClick}
            style={{ 'width': `${100 / count}%` }}
        />)
    }

    paperToForm = (listImg) => {
        let key = uuid4();
        return (<div key={key}>
            <Paper elevation={2}>
                {listImg}
            </Paper>
        </div>)
    }

    handleChange = event => {
        let count = event.target.value;
        let countImg = (count*count)/2
        this.props.clearIdCell();
        this.setState({
            ...this.state,
            [event.target.name]: count,
            sizeField: count
        });
        this.props.generate({
            init: true,
            count,
            cell: this.imgToForm,
            row: this.paperToForm
        })
        this.props.getImg(countImg);
    };

    imgOnClick = event => {
        if (!this.props.pair || event.target.dataset.key
            !== this.props.pair.dataset.key) {
            let res = this.props.isPair(event.target);
            event.target.src = this.props.imgView(event.target.dataset.key);

            if (res) {
                let img = event;
                setTimeout((event, props) => {
                    event.remove();
                    props.pair.remove();
                }, 100, img.target, this.props)
            }

            if (!res && res !== undefined) {
                let img = event;
                setTimeout((event, props) => {
                    props.pair.src = props.imgHide();
                    event.src = props.imgHide();
                }, 500, img.target, this.props)
            }
        }
    }

    constructor(props) {
        super(props);
        this.imgOnClick = this.imgOnClick.bind(this);
        this.getImg = this.props.getImg.bind(this);
        this.state = {
            countImg: 0,
            loader: true,
            isTimer1: false,
            isTimer2: false,
        };
    }

    componentDidMount = () => {
        this.setState({ ...this.state, loader: false });
    }
    render() {
        let linearProgress = (<LinearProgress />)
        let text1 = `На запоминание картинок остается ${5-this.state.timerv} сек!`
        let text2 = `У вас осталось ${30-this.state.timerv} сек!`
        let component = (
            <div>
                <Paper elevation={2} className={style.paper}>
                    <Typography variant="h5" className={style.title}>
                        Find the Pair
                    </Typography>
                    <FormControl className={style.selectComplexity}>
                        <InputLabel htmlFor="outlined-age-simple">
                            Select one of three difficulties
                        </InputLabel>
                        <Select
                            autoWidth={true}
                            className={style.selectDifficulties}
                            value={this.state.difficulties || ""}
                            onChange={this.handleChange}
                            input={<Input name="difficulties" id="outlined-age-simple" />}
                        >
                            <MenuItem value={4}>Easy</MenuItem>
                            <MenuItem value={6}>Medium</MenuItem>
                            <MenuItem value={8}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={style.buttonStart}>
                        <Button
                            variant="contained"
                            color="primary"
                            size='small'
                            onClick={() => {
                                let i = 0;
                                this.props.generate({
                                    count: this.state.sizeField,
                                    cell: this.imgToForm,
                                    row: this.paperToForm,
                                    show: true
                                })
                                let s = setInterval(() => {
                                    i++;
                                    if (i === 6) {
                                        this.props.generate({
                                            count: this.state.sizeField,
                                            cell: this.imgToForm,
                                            row: this.paperToForm,
                                            show: false
                                        })
                                        clearInterval(s);
                                    }
                                }, 1000);
                                this.setState({...this.state, isTimer1: false});
                                let j = 0;
                                let n = setInterval(() => {
                                    this.setState({...this.state, timerv: j, isTimer2: true});
                                    j++;
                                    if (j === 29) {
                                        this.props.gameOver()
                                        clearInterval(n);
                                    }
                                }, 1000);
                                this.setState({...this.state, isTimer2: false});
                            }}
                        >
                            Start
                        </Button>
                    </FormControl>
                    <FormControl className={style.timerText}>
                        <Typography variant="h5">
                            {this.state.isTimer2 && text2}
                        </Typography>
                    </FormControl>
                </Paper>
                <div className={style.paperListImg}>
                    {this.props.fields}
                </div>
            </div>
        );
        return (
            <div>
                {this.state.loader && linearProgress}
                {!this.state.loader && component}
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            pictures: state.getImg,
            fields: state.generate.fields,
            pair: state.generate.pair
        }
    },
    {
        clearIdCell,
        getImg,
        generate,
        isPair,
        imgView,
        imgHide,
        gameOver
    }
)(PlayingField);