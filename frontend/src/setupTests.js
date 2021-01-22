import Enzyme from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import 'jest-enzyme';

Enzyme.configure({ adapter: new EnzymeAdapter() })