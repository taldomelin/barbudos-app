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
import EditarCliente from "../components/EditarCliente";
import EditarProfissional from "../components/EditarProfissional";
const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="cadastro" element={<CadastroCliente/>}/>
            <Route path="listagem" element={<ListagemClientes/>}/>
            <Route path="/editar/:id" element={<EditarCliente/>}/>
            <Route path="cadastroServico" element={<CadastroServico/>}/>
            <Route path="listagemServico" element={<ListagemServicos/>}/>
            
            <Route path="listagemProfissional" element={<ListagemProfissionais/>}/>
            <Route path="CadastroProfissional" element={<CadastroProfssional/>}/>
            <Route path="/editarProfissopnal/:id" element={<EditarProfissional/>}/>
        </Routes>
        </BrowserRouter>
    );
}
export default AppRouter