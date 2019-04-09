import React from 'react';
import ReactDOM from 'react-dom';

import DateRange from './DateRange/DateRange.jsx';

const renderDiv = document.getElementById('render');
ReactDOM.render(<DateRange date={new Date()}/>, renderDiv);
