import { useEffect, useState } from 'react';
import styled from "styled-components";
import {BiTimeFive} from "react-icons/bi";
import {AiFillStar} from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import {motion, AnimatePresence} from "framer-motion"
import axios from 'axios';

const Movie = styled.div`
    height: 16.68rem;
    width: auto;
    display: flex;
    justify-content: center;
    margin: 0 2rem 0 2rem;

    @media screen and (max-width: 915px) {
        margin: 2rem 1rem 0 1rem;
        flex-direction: column;
        align-items: center;

    }
    @media screen and (max-width: 550px) {
        margin: 5rem 1rem 0 1rem;        
    }
    .banner{
        margin-right: 4.5rem;
        background: gray;
        width: 11.5rem;
        height: 16.68rem;
        border-radius: 20px;

        img{
            width: 11.5rem;
            height: 16.68rem;
            border-radius: 20px;
            object-fit: cover;
        }
        @media screen and (max-width: 915px) {
            margin-right: 1rem;
    }
    }
    
    .movieInfo{
        display: grid;
        color: aliceblue;
        max-width: 45.12rem;
        @media screen and (max-width: 915px) {
        height:25rem;


    }
        .sinopse{
            align-self: flex-start;
            font: 400 1.2rem 'Overpass', sans-serif;
        }
        .hating{
        display: flex;
        justify-content: space-between;
        align-self: center;
        font-size: 1.5rem;

        .minutes{
            display: flex;
            align-items: center;
            font: 600 1.5rem 'Overpass', sans-serif;
        }
        }
        .buttons{
            align-self: flex-end;
            button{
            border: none;
            cursor: pointer;
            margin-right: 1rem;
            padding: 1rem 1.5rem;
            background-color: #0072D2;
            color: aliceblue;
            border-radius: 5px;
            transition: all .2s ease;
            font: 400 1rem 'Overpass', sans-serif;
            @media screen and (max-width: 350px) {
                padding: .5rem .5rem;
                margin-right: 1rem;

            }

            &:hover{
                transform: scale(1.03);
            }
            &:active{
                transform: scale(1.002);
            }
        }
        .trailer{
            background-color: #131318;
            border: 1px solid aliceblue;
        }
        }
        .teste{
            
        }
    }
    
    
`
 type MovieProps ={
    imgBanner: string;
    sinopse: string;
    minutes: string;
    year: string;
    movieName: string;
 }
export function MovieInfo(props: MovieProps){
    const Div = styled.div`
            .modal{
                visibility: hidden;
                opacity: 0;
                z-index: -1000;

            }
            .modal[data-open="true"]{
                visibility: visible;
                opacity: 1;
                z-index: 100;
                background-color: #0072D2;
                width: 1000px;
                height: 500px;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                border-radius: 20px;
                .vide{

                }
                .video[data-open="true"]{
                    height: 400px;
                    background-color: aliceblue;
                }
            }

            .close{
                display: flex;
                justify-content: right;

                
                i{
                    margin: 1rem 1rem 0 0;
                    cursor: pointer;
                }
                
            }
    `
    const [nameMovie, setNameMovie] = useState("")
    const [videoId, setVideoId] = useState("")
    useEffect(()=>{
    setNameMovie(props.movieName)
    const apikei = "AIzaSyCISBCtwzdbrmcOCRLSdaF0uYCYpe2jCpU";
        axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${apikei}&type=video&maxResults=1&q=${props.movieName}+trailer`).then((response)=>{
            console.log(response.data)
            setVideoId(response.data.items[0].id.videoId) 
        }).catch((error)=>{
            console.log(error)
        })  
        
        
    },[nameMovie])
    const [isOpen, setIsOpen] = useState(false)
    let AutoPlay = 0; 
    if(isOpen===true){
        AutoPlay = 1;
    }
    function Modal(){
        return(
                <Div>
                    <div className='modal' data-open={isOpen}>
                    <div className="close">
                        <i onClick={()=> setIsOpen(false)}><IoClose size={"2.3em"}/></i>
                    </div>
                    <div className="video" data-open={isOpen}>
                    {/* <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=${AutoPlay}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                     <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=${AutoPlay}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                    </div>
                    </div>
                </Div>
            )
        
    }
    return(
        <Movie>
            <div className="banner">
                <img src={props.imgBanner} alt="" />
            </div>
            <article className="movieInfo">
                <div className='sinopse'>
                    <p>
                        {props.sinopse}
                    </p>
                </div>
                <div className="hating">
                    <div className='minutes'><BiTimeFive/>{props.minutes}</div>
                    <div className='star'><AiFillStar color='yellow'/><AiFillStar color='yellow'/><AiFillStar color='yellow'/><AiFillStar/><AiFillStar/> </div>
                    <div>{props.year}</div>
                </div>
                <div className="buttons">
                    <button>ASSISTA AGORA</button>
                    <button className='trailer' onClick={()=> setIsOpen(true)}>TRAILER</button>
                </div>
                <div className="teste"></div>
                <Modal></Modal>
                
            </article>
        </Movie>
    )
}