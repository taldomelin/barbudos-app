import axios from "axios";
import React,{
    Component, useState, ChangeEvent, FormEvent, useEffect
} from "react";
import style from '../App.module.css';
import { CadastroClienteInterface } from "../interface/CadastroCliente";
const listagemClientes = () => {
    const[nome, setNome] = useState<CadastroClienteInterface[]>([]);
    const[pesquisa, setPesquisa] = useState<string>("")
    const[error, setError] = useState("");


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.name);
        }
    }

    const buscar = (e: FormEvent)=> {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/nome',
                { nome: pesquisa },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then(function(response) {
                    setNome(response.data.data);
                }).catch(function (error) {
                    console.log(error);
                });
               
            }catch(error){
                console.log(error);
            }

        }
        fetchData();
    }

    useEffect(() =>{
        async function fatchData() {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/retornarTudo')
                setNome(response.data.data);
            } catch (error) {
                setError("Ocrreu um erro");
                console.log(error)
            }
        }

        fatchData();
    }, []);

    return (
        <div>
            <main className={style.main}>
                <div className='container'>
   
                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name="pesquisa"
                                            className='form-control'
                                            onChange={handleState} />
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
   
   
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>
                                Listagem de Usuários
                            </h5>
                            <table className='table table-hover '>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>celular</th>
                                        <th>email</th>
                                        <th>cpf</th>
                                        <th>nascimento</th>
                                        <th>cidade</th>
                                        <th>estado</th>
                                        <th>pais</th>
                                        <th>rua</th>
                                        <th>numero</th>
                                        <th>bairro</th>
                                        <th>cep</th>
                                        <th>complemento</th>
                                        <th>senha</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nome.map(nome => (
                                        <tr key={nome.id}>
                                            <td>{nome.id}</td>
                                            <td>{nome.nome}</td>
                                            <td>{nome.celular}</td>
                                            <td>{nome.email}r</td>
                                            <td>{nome.cpf}r</td>
                                            <td>{nome.nascimento}r</td>
                                            <td>{nome.cidade}r</td>
                                            <td>{nome.estado}r</td>
                                            <td>{nome.pais}r</td>
                                            <td>{nome.rua}r</td>
                                            <td>{nome.numero}r</td>
                                            <td>{nome.bairro}r</td>
                                            <td>{nome.cep}r</td>
                                            <td>{nome.complemento}r</td>
                                            <td>{nome.password}r</td>

                                            <td>
                                                <a href="#" className='btn btn-primary btn-sm'>Editar</a>
                                                <a href="#" className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default listagemClientes;
