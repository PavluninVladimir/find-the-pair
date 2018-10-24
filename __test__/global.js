import React from 'react';
import axios from 'axios';
import Enzyme from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import deppFreeze from 'deep-freeze';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');
global.React = React;
global.axios = axios;
global.mockStore = configureMockStore({});