import React, {
    useEffect,
    useState
} from "react"
import "./style.css"
import facebook_icon from "../../assets/icon-dashboard.png"
import image_icon from "../../assets/Image-icon.png"
import trash from "../../assets/trash-icon.png"
import like from "../../assets/like-icon.png"
import comment from "../../assets/comment.jpeg"
import {
    useHistory
} from "react-router-dom"
import api from "../../services/api"
import Dropzone from "react-dropzone"
import imagem from "../../assets/Imagem.jpg"
import Axios from "axios"

import io from 'socket.io-client';

const socket = io('http://localhost:3001');



export default function Dashboard() {

    let [posts, setposts] = useState([])
    const [legenda, setLegenda] = useState("")
    const [UploadImage, setUploadImage] = useState(false)
    const [file] = useState(new FormData())
    const [imageData] = useState(new FormData())
    const name = localStorage.getItem("fullname")
    const user_id = localStorage.getItem("Id")
    const history = useHistory()




    const data = {
        name,
        legenda,
        user_id,

    }


    async function uploadImgur() {

        const image = imageData

        const config = {

            headers: {
                Authorization: "Client-ID 02c65427fd1ee22"
            }
        }
        const response = await Axios.post('https://api.imgur.com/3/image', image, config)
        const url = response.data.data.link

        return (url)


    }

    async function MapPosts() {

        const response = await api.get("projects")

        const data = response.data


        data.reverse()

        setposts(data)

    }


    useEffect(() => {
        if (!user_id) {
            history.push("/login")
        }
    })

    useEffect(() => {

        MapPosts()
    }, [])



    async function handleCreate(e) {
        e.preventDefault()


        if (data.legenda === "" & data.fileName === "") {
            return
        }

        let LinkUrl = null

        if (UploadImage === true) {
            LinkUrl = await uploadImgur()
            console.log("aa")
        }

        const config = {
            headers: {
                authorization: LinkUrl
            }
        }


        setTimeout(async function () {
            await api.post("projects", data, config)
            MapPosts()
        }, 3000)

    }


    async function handleDelete(id) {
        try {

            await api.delete(`projects/${id}`, {
                headers: {
                    authorization: user_id
                }
            })


            MapPosts()




        } catch (error) {
            alert("Erro ao deletar o post")
        }

    }

    socket.on("refresh", data => {
        MapPosts()
    })

    return(
        <div>
            
            <div className="dashboard-container">
                <div className="top-container">
                    <img src={facebook_icon} alt="facebook"/>
                </div>

                <div className="creater-poster">

                  <div className="header-post-creator">
                      <h2>Criar um post</h2>
                  </div>
                  <div className="content-container">
                      <img src={imagem} alt="content"></img>
                      <input onChange={(e)=>{setLegenda(e.target.value)}}type="text" placeholder={`Oque você esta pensando, ${ localStorage.getItem("name")}?`}></input>
                      </div>    
                  <div className="footer-creater-poster">
                        <div className="insert-image-container" >
                            <Dropzone  accept="image/*" onDropAccepted={async files=>{

                                
                                setUploadImage(true)                                                               
                                file.append("file",files[0]) 
                                imageData.append("image",files[0])
                              
                                
                            }}>
                                {({getRootProps,getInputProps,isDragActive,isDragReject})=>(
                                    <div
                                    {...getRootProps()}      
                                    >
                                        <div className="insert-image-box">
                                    <img src={image_icon} alt="image_icon"></img>

                                    <text>Foto</text>
                                    
                                    <input  {...getInputProps()}/>
                                    </div>
                                    
                                    </div>
                                )}
                                     
                                </Dropzone>
                        
                        </div>  
                        <button onClick={(e)=>handleCreate(e)}>Publicar</button>
                        </div>
                      </div>    


                </div>
                {posts.map(posts=>( 
                <div className="postes-container">
                         
                       <div className="postes-box">
                                <img className="profile-photo" src={imagem} alt="profile"></img>
                                <img className="trash-icon" src={trash} alt="trash" onClick={()=>handleDelete(posts.ProjectId)}></img>
                            <h3 >{posts.name}</h3>
                                
                                <div className="subtitle">
                            <p >{posts.legenda}</p>   
                            </div> 
                                  
                        <div className="image-poster">
                            <img src={posts.url} ></img>
                            </div>           
                                   
                        <div className="function-bar" >
                            <div className="like-bar">
                                <img className="like-icon"  src={like} alt="like"/>
                                <span >Like</span>
                                </div>
                            <div className="comment-bar">
                                <img className="comment-icon" src={comment} alt="comment"/>                                
                                <span>Comentar </span>
                            </div>
                               
                        </div>

            
                       </div>
   
                </div>

))} 
            
            </div>
    )
}