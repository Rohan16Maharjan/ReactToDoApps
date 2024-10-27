import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './feature/ToDo/screens/Add';

function App() {
  return (
    <>
      <Add />
      <ToastContainer />
    </>
  );
}

export default App;
