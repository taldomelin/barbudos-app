import React,{Component, useState, ChangeEvent, FormEvent, useEffect} from "react";

import styles from '../App.module.css';
import Footer from "./Footer"
import Header from "./Header"
import axios from "axios";


const CadastroProfssional = () => {
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
    const [salario,setSalario] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [erro, setErro] = useState<string>("");
    const [localidade, setLocalidade] = useState<string>("");
    
    const cadastrarProfissionais = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
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
            complemento: complemento,
            salario: salario,
            password: password
        }

        console.log(dados)

        axios.post('http://127.0.0.1:8000/api/profissional/criar',
        dados,
        {
            headers:{
                "Accept": "aplication/json",
                "Content-Type": "aplication/json"
            }
        }
        ).then(function(response){
            console.log(response.data)
            if(response.data.success == true){
            window.location.href = "/listagem/Profissional"
            }else{
                console.log(response.data)
                alert("ocorreu um erro no cadastro do profissional")
            }
        }).catch(function(error){
            console.log(error)
        })
    }

    const findCep = (e: FormEvent) => {

        e.preventDefault();

        fetch('https://viacep.com.br/ws/' + cep + '/json',
            {
                method: 'GET'
            }).then(response => response.json())
            .then(
                data => {
                    setCidade(data.localidade);
                    setPais(data.pais)
                    setEstado(data.uf);
                    setErro("")
                }
            ).catch(error => {
                setErro("Pesquisa Inválida");
            });

        console.log("Localidade:" + localidade);
    }

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
        if(e.target.name === "complemento"){
            setComplemento(e.target.value)
        }
        if(e.target.name === "salario"){
            setSalario(e.target.value)
        }
        if(e.target.name === "password"){
            setPassword(e.target.value)
        } 
    }

    return (
        <div>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-tittle'>Cadastrar Profissional</h5>
                            <form onSubmit={cadastrarProfissionais} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='from-label'>Nome</label>
                                    <input 
                                    type="text" 
                                    name='nome' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
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
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cidade" className='from-label'>Cidade</label>
                                    <input 
                                    type="text" 
                                    name='cidade' 
                                    value={cidade}
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="estado" className='from-label'>Estado</label>
                                    <input 
                                    type="text" 
                                    name='estado'
                                    value={estado} 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="pais" className='from-label'>Pais</label>
                                    <input 
                                    type="text" 
                                    name='pais' 
                                    value={pais}
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="rua" className='from-label'>Rua</label>
                                    <input 
                                    type="text" 
                                    name='rua' 
                                    value={rua}
                                    className='form-control'
                                    required 
                                    onChange={handleState}
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
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="bairro" className='from-label'>Bairro</label>
                                    <input 
                                    type="text" 
                                    name='bairro' 
                                    value={bairro}
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cep" className='from-label'>CEP</label>
                                    <input 
                                    type="text" 
                                    name='cep' 
                                    onBlur={findCep}
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cep" className='from-label'>Salario</label>
                                    <input 
                                    type="text" 
                                    name='salario' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
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
                                    />                                    
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="password" className='from-label'>Senha</label>
                                    <input 
                                    type="password" 
                                    name='password' 
                                    className='form-control'
                                    required 
                                    onChange={handleState}
                                    />                                    
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
export default CadastroProfssional;