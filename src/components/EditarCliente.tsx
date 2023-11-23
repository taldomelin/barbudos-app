import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";

import styles  from "../App.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";



const EditarCliente = () => {

    const [nome, setNome] = useState<string>("");
    const [celular,setCelular] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [cpf,setCpf] = useState<string>("");
    const [nascimento,setNascimento] = useState<string>("");
    const [cidade,setCidade] = useState<string>("");
    const [estado,setEstado] = useState<string>("");
    const [pais,setPais] = useState<string>("");
    const [rua,setRua] = useState<string>("");
    const [numero,setNumero] = useState<string>("");
    const [bairro,setBairro] = useState<string>("");
    const [cep,setCep] = useState<string>("");
    const [complemento,setComplemento] = useState<string>("");
    const [localidade, setLocalidade] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [id, setId] = useState<string>();

    const parametro = useParams();

    const atualizar = (e: FormEvent) => {

        e.preventDefault();

        const dados = {
            id:id,
            nome: nome,
            celular: celular,
            email: email,
            cpf: cpf,
            nascimento: nascimento,
            cidade: cidade,
            estado: estado,
            pais: pais,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            localidade: localidade,
            complemento: complemento,
            password: password
        }
        axios.put("http://127.0.0.1:8000/api/cliente/update",
        dados,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function(response){
            console.log(response.data)
            window.location.href = "/listagem"
        }).catch(function(error){
            console.log('Ocorreu um erro ao atualizar');
        });

    }

    useEffect(() => {
         async function fetcData() {
            try{
                const response = await axios.get("http://127.0.0.1:8000/api/cliente/pesquisaId/"+parametro.id);

                if(response.data.status === true){
                    setNome(response.data.data.nome);
                    setCelular(response.data.data.celular);
                    setEmail(response.data.data.email);
                    setCpf(response.data.data.cpf);
                    setNascimento(response.data.data.nascimento);
                    setCidade(response.data.data.cidade);
                    setEstado(response.data.data.estado);
                    setPais(response.data.data.pais);
                    setRua(response.data.data.rua);
                    setNumero(response.data.data.numero)
                    setBairro(response.data.data.bairro);
                    setCep(response.data.data.cep);
                    setPassword(response.data.data.password);
                    setComplemento(response.data.data.complemento);
                    setLocalidade(response.data.data.localidade);
                    setId(response.data.data.id);
                    console.log(response.data.data)
                }
                
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
        if(e.target.name === "celular"){
            setCelular(e.target.value)
        }
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }
        if(e.target.name === "cpf"){
            setCpf(e.target.value)
        }
        if(e.target.name === "nascimento"){
            setNascimento(e.target.value)
        }
        if(e.target.name === "cidade"){
            setCidade(e.target.value)
        }
        if(e.target.name === "estado"){
            setEstado(e.target.value)
        }
        if(e.target.name === "pais"){
            setPais(e.target.value)
        }
        if(e.target.name === "rua"){
            setRua(e.target.value)
        }
        if(e.target.name === "numero"){
            setNumero(e.target.value)
        }
        if(e.target.name === "bairro"){
            setBairro(e.target.value)
        }
        if(e.target.name === "cep"){
            setCep(e.target.value)
        }
        if (e.target.name === "password"){
            setPassword(e.target.value)
        }
        if(e.target.name === "complemento"){
            setComplemento(e.target.value)
        }
    }

    return (
        <div>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-tittle'>Atualizar Cliente</h5>
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
                                    <label htmlFor="celular" className='from-label'>Celular</label>
                                    <input 
                                    type="text" 
                                    name='celular' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={celular}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='from-label'>E-mail</label>
                                    <input 
                                    type="text" 
                                    name='email' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={email}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cpf" className='from-label'>CPF</label>
                                    <input 
                                    type="text" 
                                    name='cpf' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={cpf}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="nascimento" className='from-label'>Nascimento</label>
                                    <input 
                                    type="date" 
                                    name='nascimento' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={nascimento}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cidade" className='from-label'>Cidade</label>
                                    <input 
                                    type="text" 
                                    name='cidade' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={cidade}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="estado" className='from-label'>Estado</label>
                                    <input 
                                    type="text" 
                                    name='estado' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={estado}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="pais" className='from-label'>Pais</label>
                                    <input 
                                    type="text" 
                                    name='pais' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={pais}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="rua" className='from-label'>Rua</label>
                                    <input 
                                    type="text" 
                                    name='rua' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={rua}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="numero" className='from-label'>Numero</label>
                                    <input 
                                    type="text" 
                                    name='numero' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={numero}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="bairro" className='from-label'>Bairro</label>
                                    <input 
                                    type="text" 
                                    name='bairro' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={bairro}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cep" className='from-label'>CEP</label>
                                    <input 
                                    type="text" 
                                    name='cep' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={cep}
                                    />                                    
                                </div>
                                <div className="col-6">
                                    <label htmlFor="password" className='from-label'>Senha</label>
                                    <input
                                     type="password"
                                     name='password'
                                     className='form-control'
                                     required
                                     onChange={handleState}
                                     value={password}
                                     />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="complemento" className='from-label'>Complemento</label>
                                    <input 
                                    type="text" 
                                    name='complemento' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    value={complemento }
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

export default EditarCliente;