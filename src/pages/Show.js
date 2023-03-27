import React,{useEffect,useState,useReducer} from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import ShowMainData from "../components/show/ShowMainData";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";


const reducer = (prevState,action) => {
    switch(action.type){

        case 'FETCH_SUCCESS': {
            return {isLoad:false,shows:action.shows,error:null}
        }

        case 'FETCH_FAILED': {
            return {...prevState,isLoad:false,error:action.error}
        }

        default: return prevState
    }

}

const initialState = {
    shows:null,
    isLoad:true,
    error:null
}

const Show = () => {

    const {id} = useParams()

    const [{shows,isLoad,error},dispatch] = useReducer(reducer,initialState)

    // const [shows,setShow] = useState(null)
    // const [isLoad,setIsLoad] = useState(true)
    // const [error,setError] = useState(null)

    useEffect(()=>{

        let isMounted = true

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result => {
            if(isMounted){
                dispatch({type:'FETCH_SUCCESS',shows:result})
            }
        }).catch(err => {
            if(isMounted){
                dispatch({typr:'FETCH_FAILED',error:err.message})
            }
        })

        return () => {
            isMounted=false
        }

    },[id])
    console.log(shows)

    if(isLoad){
        return <div>Data is being loaded</div>
    }
    if(error){
        return <div>Error Occurred : {error}</div>
    }

    return <ShowPageWrapper>
        <ShowMainData 
            image={shows.image} 
            name={shows.name} 
            rating={shows.rating} 
            summary={shows.summary} 
            tags={shows.genres}
        />
        <InfoBlock>
            <h2>Details</h2>
            <Details
                status={shows.status}
                network={shows.network}
                premiered={shows.premiered} 
            />
        </InfoBlock>
        <InfoBlock>
            <h2>Seasons</h2>
            <Seasons
                seasons={shows._embedded.seasons}
            />
        </InfoBlock>
        <InfoBlock>
            <h2>Cast</h2>
            <Cast
                cast={shows._embedded.cast}
            />
        </InfoBlock>
    </ShowPageWrapper>
}

export default Show;