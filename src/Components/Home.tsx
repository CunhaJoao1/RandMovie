import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from "styled-components"
import { Modal } from './Modal'
import { MovieInfo } from './MovieInfo'


/* const [background, setBackground] = useState("") */
const Div = styled.div`
    width: 100vw;
    height: 100vh;
    overflow:hidden;
    object-fit: cover;
   /*  background: #7D7D7D; */
    background-image: url("https://images.pexels.com/photos/2752777/pexels-photo-2752777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    position: absolute;
    .overlay{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #7d7d7d1d;
    }

    .title{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        height: 20rem;
        color: aliceblue;
        h1{
            font: 700 91px 'Overpass', sans-serif;
            text-align: center;
        }
        h2{
            font: 600 24px 'Overpass', sans-serif;
            
        }
    }
`
export function Home(){
    const [name, setName] = useState<string>("")
    const [sinopse, setSinopse] = useState<string>("")
    const [minutes, setMinutes] = useState<string>("")
    const [year, setYear] = useState<string>("")
    const [image, setImage] = useState<string>("")


    const baseApiBanner = "https://api.themoviedb.org/3/search/movie?api_key=4df042d4d4726acc422e724ea818f92f&query=$"
    const BannerApi = "https://image.tmdb.org/t/p/w500/"
    useEffect(() =>{
        axios.get("https://k2maan-moviehut.herokuapp.com/api/random").then((response) =>{
           /*  console.log(response.data) */
            const data = response.data;
            setName(data.name)
            setSinopse(data.overview)
            setMinutes(data.runtime)
            setYear(data.releaseYear)
        })
    }, [])
    useEffect(()=>{
        axios.get(baseApiBanner + name).then((response)=>{
            const data = response.data;
            const bannerPath = data.results[0].poster_path;
            console.log(response.data);
            setImage( BannerApi + bannerPath) 
            
        }).catch((error) =>{
            console.log(error)
        })
    })
   
    return(
        <Div>
            <div className="overlay">
                        <div className="title">
                            <h3>Esse será o seu filme aleatório:</h3>
                            <h1>{name}</h1>
                        </div>
                    <MovieInfo movieName={name} year={year} minutes={minutes} sinopse={sinopse} imgBanner={image}></MovieInfo>
            </div>            
        </Div>
    )
}