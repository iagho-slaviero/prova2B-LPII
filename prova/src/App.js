import { BrowserRouter, Routes, Route } from "react-router-dom";
import telaUsuario from './telaCadastro/telaUsuario'
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {
              
            }
            <Route path="/usuario" element={<telaUsuario/>} />

            {
              
            }
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;