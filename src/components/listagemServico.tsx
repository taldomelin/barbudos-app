import axios from "axios";
import React, {
    Component, useState, ChangeEvent, FormEvent, useEffect
} from "react";
import styles from '../App.module.css';
import { CadastroServicoInterface } from "../interface/CadastroServico";

const ListagemServicos = () => {
    const [servicos, setServicos] = useState<CadastroServicoInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>("")
    const [error, setError] = useState("");


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisaServico") {
            setPesquisa(e.target.name);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/Profissional',
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
                        setServicos(response.data.data)
                    } else {

                        setServicos([])
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/retornarTodos');
                console.log(response.data.data);
                setServicos(response.data.data);
            } catch (error) {
                setError("Ocrreu um erro");
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
                        <div className='card    '>
                            <div className='card-body '>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name="pesquisaServico"
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

                    <div className='container'>
                        <div className='card'>
                            <div className='card-body '>
                                <h5 className='card-title'>
                                    Listagem de Seviços
                                </h5>
                                <table className='table table-hover '>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Duraçao</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servicos.map(servicos => (
                                            <tr key={servicos.id}>
                                                <td>{servicos.id}</td>
                                                <td>{servicos.nome}</td>
                                                <td>{servicos.descricao}</td>
                                                <td>{servicos.duracao}r</td>
                                                <td>{servicos.preco}r</td>
                                               

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
                </div>
            </main>
        </div>
    );
}
export default ListagemServicos;