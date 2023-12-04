import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TelaUsuario from "./telaCadastro/TelaUsuario";
import TelaChat from "./telaCadastro/TelaChat";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/usuario" element={<TelaUsuario/>} />,
            <Route path="/" element={<TelaChat/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;