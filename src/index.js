import dva from 'dva';
import './index.css';
import createLoading  from 'dva-loading';
import './utils/func';
import injectTapEventPlugin from 'react-tap-event-plugin';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());
injectTapEventPlugin();

// 3. Model
app.model(require("./models/app"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

document.cookie = 'PHPSESSID=nqgod42tdocn20a71i2aaunp14'
