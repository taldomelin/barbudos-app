import React from "react";
import ListagemClientes from "../components/listagem";
import CadastroCliente from "../components/CadastroCliente";
import { 
    BrowserRouter,
     Route,
     Routes
} from "react-router-dom";
import CadastroServico from "../components/CadastroServico";
import ListagemServicos from "../components/listagemServico";
import CadastroProfssional from "../components/CadastroProfissional";
import ListagemProfissionais from "../components/listagemProfissionais";

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="cadastro" element={<CadastroCliente/>}/>
            <Route path="listagem" element={<ListagemClientes/>}/>
            <Route path="cadastroServico" element={<CadastroServico/>}/>
            <Route path="listagemServico" element={<ListagemServicos/>}/>
            <Route path="cadastroProfissional" element={<CadastroProfssional/>}/>
            <Route path="listagemProfissional" element={<ListagemProfissionais/>}/>
        </Routes>
        </BrowserRouter>
    );
}
export default AppRouter