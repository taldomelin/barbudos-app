import axios from "axios";
import React, {
    Component, useState, ChangeEvent, FormEvent, useEffect
} from "react";
import { Link } from "react-router-dom";
import styles from '../App.module.css';
import { CadastroProfissionaisInterface } from "../interface/CadastroProfissionais";

const ListagemProfissionais = () => {
    const [profissionais, setProfissionais] = useState<CadastroProfissionaisInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>("")
    const [error, setError] = useState("");


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisaProfissional") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                console.log(pesquisa);
                const response = await axios.post('http://127.0.0.1:8000/api/profissional/pesquisarNome',
                    { nome: pesquisa, email: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }

                ).then(function (response) {
                    
                    console.log(response.data)
                    if (true === response.data.status) {
                        console.log(response.data)
                        setProfissionais(response.data.data)
                    } else {

                        setProfissionais([])
                    }
                }).catch(function (error) {
                    console.log(error)
                });



            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }
    function handleDelete(id: number) {
        const confirm = window.confirm('Você tem certeza que deseja excluir?');
        if (confirm)
            axios.delete('http://127.0.0.1:8000/api/profissional/deletar/' + id)
                .then(function (response) {
                    window.location.href = "/listagem/Profissional"
                }).catch(function (error) {
                    console.log('Ocorreu um erro ao excluir');
                })
    }
    function RedefinirSenha(id: number) {
        const confirm = window.confirm('Deseja redefinir a senha?');
        if (confirm)
        axios.put('http://127.0.0.1:8000/api/profissional/esqueciSenha/' + id)
            .then(function (response) {
               
            }).catch(function (error) {
                console.log('Ocorreu um erro ao alterar a senha');
            })
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profissional/retornarTodos');
                console.log(response);
                setProfissionais(response.data.data);
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
                                        <input type="text" name='pesquisaProfissional' className='form-control'
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
                                    Listagem de Profissionais
                                </h5>
                                <table className='table table-hover '>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>salario</th>
                                            <th>celular</th>
                                            <th>E-mail</th>
                                            <th>Cpf</th>
                                            <th>Ações</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {profissionais.map(profissionais => (
                                            <tr key={profissionais.id}>
                                                <td>{profissionais.id}</td>
                                                <td>{profissionais.nome}</td>
                                                <td>{profissionais.salario}</td>
                                                <td>{profissionais.celular}</td>
                                                <td>{profissionais.email}</td>
                                                <td>{profissionais.cpf}</td>

                                                <td>
                                                <Link to={"/editarProfissopnal/"+ profissionais.id}  className='btn btn-primary btn-sm' >Editar</Link>
                                                <a onClick={e => handleDelete(profissionais.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                                <a onClick={e => RedefinirSenha(profissionais.id)} className='btn btn-secondary btn-sm'>Redefinir Senha</a>
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
export default ListagemProfissionais;