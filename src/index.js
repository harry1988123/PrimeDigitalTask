import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { loadColor,loadShapes,loadSizes,loadPlanets } from './Actions';


store.subscribe(()=>{
  console.log(store.getState());
});

store.dispatch(loadColor());
store.dispatch(loadShapes());
store.dispatch(loadSizes());  

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
 
reportWebVitals();
