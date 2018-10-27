import React, { Component } from 'react';
import Types from 'prop-types';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PlayingField from './components/playing-field';
import store from './store';

class App extends Component {
    static propTypes= {
        url: Types.string
    }
    render() {
        const component = PlayingField
        if (typeof window === 'undefined') {
            return (
                <Provider store={ store }>
                    <StaticRouter location={ this.props.url } context={ {} }>
                        <Switch>
                            <Route exact path='/' component={ component }/>
                        </Switch>
                    </StaticRouter>
                </Provider>)
        }
        if (typeof window !== 'undefined') {
            return (
                <Provider store={ store }>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={ component }/>
                        </Switch>
                    </BrowserRouter>
                </Provider>)
        }
    }
}

export default App;
