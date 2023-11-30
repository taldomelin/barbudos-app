import axios from "axios";
import React, {
    Component, useState, ChangeEvent, FormEvent, useEffect
} from "react";
import { Link } from "react-router-dom";
import styles from '../App.module.css';
import { CadastroAgendaInterface } from "../interface/CadastroAgenda";


const ListagemAgenda = () => {
    const [agenda, setAgenda] = useState<CadastroAgendaInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>("")
    const [error, setError] = useState("");


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisaAgenda") {
            setPesquisa(e.target.value);
        }
    }
    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                console.log(pesquisa);
                const response = await axios.post('http://127.0.0.1:8000/api/agenda/pesquisaDataHora',
                    {  dataHora: pesquisa },
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
                        setAgenda(response.data.data)
                    } else {

                        setAgenda([])
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
            axios.delete('http://127.0.0.1:8000/api/agenda/delete/' + id)
                .then(function (response) {
                    window.location.href = "/listagem/agenda"
                }).catch(function (error) {
                    console.log('Ocorreu um erro ao excluir');
                })
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/agenda/retornaTodos');
                if(response.data.status === true){
                    console.log(response);
                    setAgenda(response.data.data);
                }
                else{
                    console.log("erro");
                    
                }
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
                                        <input type="text" name='pesquisaAgenda' className='form-control'
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
                                    Listagem das Agenda
                                </h5>
                                <table className='table table-hover '>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>profissional_Id</th>
                                            <th>cliente_Id</th>
                                            <th>servico_Id</th>
                                            <th>dataHora</th>
                                            <th>pagamento</th>
                                            <th>valor</th> 
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agenda.map(agenda => (
                                            <tr key={agenda.id}>
                                                <td>{agenda.id}</td>
                                                <td>{agenda.profissional_Id}</td>
                                                <td>{agenda.cliente_Id}</td>
                                                <td>{agenda.servico_Id}</td>
                                                <td>{agenda.dataHora}</td>
                                                <td>{agenda.pagamento}</td>
                                                <td>{agenda.valor}</td>

                                                <td>
                                                <a onClick={e => handleDelete(agenda.id)} className='btn btn-danger btn-sm'>Excluir</a>
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
export default ListagemAgenda;