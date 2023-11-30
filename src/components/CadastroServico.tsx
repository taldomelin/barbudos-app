import React,{Component, useState, ChangeEvent, FormEvent, useEffect} from "react";

import styles from '../App.module.css';
import Footer from "./Footer"
import Header from "./Header"
import axios from "axios";


const CadastroServico = () => {
    const [nome, setNome] = useState<string>("");
    const [descricao,setDescricao] = useState<string>("");
    const [duracao,setDuracao] = useState<string>("");
    const [preco,setPreco] = useState<string>("");
    const [nomeErro, setErroNome] = useState<string>("");
    const [descricaoErro,setDescricaoErro] = useState<string>("");
    const [duracaoErro,setDuracaoErro] = useState<string>("");
    const [precoErro,setPrecoErro] = useState<string>("");
    
    const cadastrarServico = (e: FormEvent) => {
        setErroNome("")
        setDescricaoErro("")
        setDuracaoErro("")
        setPrecoErro("")

        e.preventDefault();

        const dados = {
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco,
           
        }

        console.log(dados)

        axios.post('http://127.0.0.1:8000/api/servico/criar',
        dados,
        {
            headers:{
                "Accept": "aplication/json",
                "Content-Type": "aplication/json"
            }
        }
        ).then(function(response){
            if (response.data.success === false) {
                if ('nome' in response.data.error) {
                    setErroNome(response.data.error.nome[0])
                }
                if ('celular' in response.data.error) {
                    setDescricaoErro(response.data.error.celular[0])
                }
                if ('email' in response.data.error) {
                    setDuracaoErro(response.data.error.email[0])
                }
                if ('cpf' in response.data.error) {
                    setPrecoErro(response.data.error.cpf[0])
                }
            } else {
            window.location.href = "/listagem/Servico"
            }
        }).catch(function(error){
            console.log(error);
        });

    }

    const handleState = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name === "nome"){
            setNome(e.target.value)
        }
        if(e.target.name === "descricao"){
            setDescricao(e.target.value)
        }
        if(e.target.name === "duracao"){
            setDuracao(e.target.value)
        }
        if(e.target.name === "preco"){
            setPreco(e.target.value)
        }
        
    }

    return (
        <div>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-tittle'>Cadastrar Serviço</h5>
                            <form onSubmit={cadastrarServico} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='from-label'>Nome</label>
                                    <input 
                                    type="text" 
                                    name='nome' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />        
                                    <div className='text-danger'>{nomeErro}</div>                               
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="descricao" className='from-label'>Descrição</label>
                                    <input 
                                    type="text" 
                                    name='descricao' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />     
                                    <div className='text-danger'>{descricaoErro}</div>                                     
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="duracao" className='from-label'>Duração</label>
                                    <input 
                                    type="text" 
                                    name='duracao' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />         
                                    <div className='text-danger'>{duracaoErro}</div>                            
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="preco" className='from-label'>Preço</label>
                                    <input 
                                    type="text" 
                                    name='preco' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />               
                                    <div className='text-danger'>{precoErro}</div>                      
                                </div>
                                
                                
                               
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sm'>Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default CadastroServico;