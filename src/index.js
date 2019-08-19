import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import DashApp from './DashApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<DashApp />, document.getElementById('root'));

serviceWorker.unregister();
