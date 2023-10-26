import React from "react";

import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import listagemClientes from "../components/listagem";
import CadastroCliente from "../components/CadastroCliente";

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="cadastro" element={<CadastroCliente/>}/>
            <Route path="listagem" element={<listagemClientes/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default AppRouter