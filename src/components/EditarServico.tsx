import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";

import styles  from "../App.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";



const EditarProfissional = () => {

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [duracao, setDuracao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [id, setId] = useState<string>();

    const parametro = useParams();

    const atualizar = (e: FormEvent) => {

        e.preventDefault();

        const dados = {
            id:id,
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco,

        }
        axios.put("http://127.0.0.1:8000/api/servico/atualizar",
        dados,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function(response){
            window.location.href = "/listagemServico";
        }).catch(function(error){
            console.log('Ocorreu um erroao atualizar');
        });

    }

    useEffect(() => {
         async function fetcData() {
            try{
                const response = await axios.post("http://127.0.0.1:8000/api/servico/pesquisarID/"+parametro.id);
                setNome(response.data.data.nome);
                setDescricao(response.data.data.descricao);
                setDuracao(response.data.data.duracao);
                setPreco(response.data.data.preco);
                setId(response.data.data.id);
                console.log(response)
            } catch(error){
                console.log("error ao buscar dados da api");
            }
         }
         fetcData();
    }, []); 


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
                            <h5 className='card-tittle'>Atualizar Serviço</h5>
                            <form onSubmit={atualizar} className='row g-3'>
                            <div className='col-6'>
                                    <label htmlFor="nome" className='from-label'>Nome</label>
                                    <input 
                                    type="text" 
                                    name='nome' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={nome}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="celular" className='from-label'>descrição</label>
                                    <input 
                                    type="text" 
                                    name='descricao' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={descricao}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="duracao" className='from-label'>duração</label>
                                    <input 
                                    type="text" 
                                    name='duracao' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={duracao}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="preco" className='from-label'>preço</label>
                                    <input 
                                    type="text" 
                                    name='preco' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={preco}
                                    />                                    
                                </div>
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sm'>Atualizar</button>
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

export default EditarProfissional;