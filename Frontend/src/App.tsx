import {BrowserRouter as Router} from 'react-router-dom'
import { Routers } from './routes/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routers />
        <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;
