import React,{useState} from "react"
import "./style.css"
import facebook from "../../assets/logo-facebook.png"
import {Link,useHistory } from "react-router-dom"
import api from "../../services/api"

export default function Login(){

    const[id,setId] = useState("")
    const history = useHistory()

   async function handleLogin(e){
    e.preventDefault()
        try{
            const response=await api.post("login",{id})

            localStorage.setItem("Id",id)
            localStorage.setItem("name",response.data.nome)
            localStorage.setItem("fullname",response.data.nome+" "+response.data.sobrenome)
            

            history.push("/dashboard")
        }catch(error){
            alert("Id invalido")
        }
           
    }


    
    return(

        <div >
            <div className="icon-container">
                <Link to="/">
                <img src={facebook} alt="facebook"  />
                </Link>
            </div>

            <div className="login-container">

           <div className="login-box">
               
                <h1>Entrar no facebook</h1>    
                <form onSubmit={handleLogin}>
               <div className="Login-signin-container">                                 
                <input value={id} onChange={e=>setId(e.target.value)} type="text" placeholder="ID" required/>
                <button type="submit"  className="enter-button">Entrar</button>
                <p>ou</p>
                <Link to="/">
                <button className="create-new-account">Criar nova conta</button>
                </Link>
                </div> 
                </form>
            </div>
            </div>

        </div>

    )
}