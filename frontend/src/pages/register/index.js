import React,{useState} from "react"
import{Link, useHistory} from "react-router-dom"
import facebook from "../../assets/logo-facebook.png"
import facebook_connecter from "../../assets/facebook.png"
import "./style.css"
import api from "../../services/api"

export default function Register(){
    const[nome,setnome] = useState("")
    const[sobrenome,setsobrenome] = useState("")
    const[usuario,setusuario] = useState("")
    const[email,setemail] = useState("")
    const[senha,setsenha] = useState("")

    const history = useHistory()

   async function handleRegister(e){
       console.log("foi")
        e.preventDefault()

        const data={
            nome,
            sobrenome,
            usuario,
            email,
            senha
        }
        try{
            const response=await api.post("/",data)
           
            alert(`seu ID de acesso ${response.data.id}`)
            history.push("/dashboard")
        }catch(err){
            alert("Erro no cadastro, tente novamente")
        }
    }  


    
    return(
        
            
        <div className="container">
            <form onSubmit={handleRegister}>
            <div className = "icon-container">

                <img src={facebook} alt="facebook" />
                 
            </div>
  
        <div className="right-container">

            <h1>O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h1>
            
        </div>
        <div className="right-image">

            <img src={facebook_connecter} alt="facebook"></img>

        </div>

        <div className="header-container">

            <header >
                Abra uma conta
            </header>

                <p>
                É rápido e fácil.
                </p>
            </div>
        
            
        <div className="register-container">
        
            
                <div  className="Box-Coitainer">
            <form onSubmit={handleRegister}>
                
            <input value={nome} 
            onChange={e=>setnome(e.target.value)} 
            type="text"  
            className="input-box" 
            placeholder="Nome" 
            />

            <input value={sobrenome}
             onChange={e=>setsobrenome(e.target.value)}
            type="text"  
            className="input-boxx" 
            placeholder="Sobrenome" 
            />
            <input value={usuario} 
            onChange={e=>setusuario(e.target.value)} 
            type="text"  
            className="inputs" 
            placeholder="Usuario" 
            />

            <input value={email} 
            onChange={e=>setemail(e.target.value)} 
            type="text"  
            className="inputs" 
            placeholder="Email" 
            />
            <input value={senha} 
            onChange={e=>setsenha(e.target.value)} 
            type="text"  
            className="inputs" 
            placeholder="Senha" 
            />
            </form>
            
           
            </div>
            
            
            
            <div className="politicas">

            <h2>Ao clicar em Cadastre-se, você concorda com nossos Termos, Política de Dados e Política de Cookies. 
                Você pode receber notificações por SMS e pode cancelar isso quando quiser.</h2>
                </div>

                

         <div className="button-cadastrar">
             <div className="box">

             <button  >Cadastrar</button>
             
             <Link to="/login">
             <h3>Ja possuo uma conta.</h3>
             </Link>
             </div>
            
             
             
             </div>  
              
             
        </div>
        </form>
        </div>
        
    )
}
