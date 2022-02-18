import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import Routes from './routes'

import './App.css';


const App =()=> {
  return (
    <div className="App">
      <BrowserRouter>
          <ConfigProvider locale={zhCN}>
              <Routes />
          </ConfigProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
