import React, { Component } from 'react';
import Types from 'prop-types';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import FormLoginAdmin from './components/form-login-admin/form-login-admin';
import store from './store';

class App extends Component {
    static propTypes= {
        url: Types.string
    }
    render() {
        const component = FormLoginAdmin
        if (typeof window === 'undefined') {
            return (
                <Provider store={ store }>
                    <StaticRouter location={ this.props.url } context={ {} }>
                        <Switch>
                            <Route exact path='/logon' component={ component }/>
                        </Switch>
                    </StaticRouter>
                </Provider>)
        }
        if (typeof window !== 'undefined') {
            return (
                <Provider store={ store }>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/logon' component={ component }/>
                        </Switch>
                    </BrowserRouter>
                </Provider>)
        }
    }
}

export default App;
