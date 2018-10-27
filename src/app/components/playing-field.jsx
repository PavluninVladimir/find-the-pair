import { Component } from 'react';
import uuid4 from 'uuid/v4';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import style from './playing-field.scss';
import pic from '../files/img/di-IUZQY3.png';
import LinearProgress from '@material-ui/core/LinearProgress';



class PlayingField extends Component {

    imgToForm = (width) => {
        let key = uuid4();
        return (<img
            key={key}
            src={pic}
            style={{ 'width': `${100 / width}%` }}
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
        let rowImg = () => this.generateRow(this.imgToForm, count).map(
            element => element(count)
        )
        let fieldPlay = this.generateRow(this.paperToForm, count).map(
            (element) => element(rowImg()));
        this.setState({ [event.target.name]: event.target.value, fieldPlay });
    };

    generateRow = (elements, count) => {
        if (count === 1) {
            return elements;
        }
        return [].concat(elements, this.generateRow(elements, count - 1));
    };

    constructor(props) {
        super(props);
        this.state = {
            age: '',
            name: 'hai',
            fieldPlay: '',
            loader: true
        };
    }

    componentDidMount = () => {
        this.setState({...this.state, loader: false});
    }

    render() {
        let linearProgress = (<LinearProgress />)
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
                        <Button variant="contained" color="primary" size='small'>
                            Start
                        </Button>
                    </FormControl>
                </Paper>
                <div className={style.paperListImg}>
                    {this.state.fieldPlay}
                </div>
            </div>
        );
        return (
            <div>
                {this.state.loader && linearProgress}
                {!this.state.loader &&  component}
            </div>
        )
    }
}

export default PlayingField;