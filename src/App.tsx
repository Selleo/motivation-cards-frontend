import { BrowserRouter } from "react-router-dom";
import AppRoutes from './screens/AppRoutes'
import 'antd/dist/antd.css';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
