import axios from "axios";
import React, {
    Component, useState, ChangeEvent, FormEvent, useEffect
} from "react";
import { Link } from "react-router-dom";
import styles from '../App.module.css';
import { CadastroClienteInterface } from "../interface/CadastroCliente";

const ListagemClientes = () => {
    const [clientes, setClientes] = useState<CadastroClienteInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>("")
    const [error, setError] = useState("");


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }
    function handleDelete(id: number) {
        const confirm = window.confirm('Deseja excluir?');
        if (confirm)
            axios.delete('http://127.0.0.1:8000/api/cliente/delete/' + id)
                .then(function (response) {
                    window.location.href = "/cliente/listagem"
                }).catch(function (error) {
                    console.log('Ocorreu um erro ao excluir');
                })
    }

    function RedefinirSenha(id: number) {
        const confirm = window.confirm('Deseja redefinir a senha?');
        if (confirm)
        axios.put('http://127.0.0.1:8000/api/cliente/esqueciSenha/' + id)
            .then(function (response) {
               
            }).catch(function (error) {
                console.log('Ocorreu um erro ao alterar a senha');
            })
    }

     


    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/cliente/pesquisarPorNome',
                    { nome: pesquisa, email: pesquisa  },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                
                ).then(function (response) {
                    if (true === response.data.status) {
                        console.log(response.data.status)
                        setClientes(response.data.data)
                    }else setClientes([])
                }).catch(function (error) {
                    console.log(error)
                });
                
                

            } catch (error) {
                console.log(error);
            }
        }   
        
        fetchData();
        
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cliente/retornarTudo');
                console.log(response.data.data);
                setClientes(response.data.data);
            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error)
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <main className={styles.main}>
                <div className='container'>
                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control'
                                            onChange={handleState} />

                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='card'>
                            <div className='card-body '>
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
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientes.map(clientes => (
                                            <tr key={clientes.id}>
                                                <td>{clientes.id}</td>
                                                <td>{clientes.nome}</td>
                                                <td>{clientes.celular}</td>
                                                <td>{clientes.email}</td>
                                                <td>{clientes.cpf}</td>

                                                <td>
                                                <Link to={"/editar/"+ clientes.id}  className='btn btn-primary btn-sm' >Editar</Link>
                                                    <a onClick={e => handleDelete(clientes.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                                    <a onClick={e => RedefinirSenha(clientes.id)} className='btn btn-secondary btn-sm'>Redefinir Senha</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default ListagemClientes;