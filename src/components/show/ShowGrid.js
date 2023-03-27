import React from "react";
import ShowCard from "./ShowCard"; 

import { FlexGrid } from "../styled";

import IMAGE_NOT_FOUND from '../../images/not_found.png';
import { useShows } from "../../misc/custom-hooks";

const ShowGrid = ({data}) => {

    const [starredShow,dispatchStarred] = useShows()

    return <FlexGrid>
        {
            data.map(({show}) => {

                const isStarred = starredShow.includes(show.id)

                const onStarClick = () => {
                    if(isStarred){
                        dispatchStarred({type:'REMOVE',showId:show.id})
                    }
                    else{
                        dispatchStarred({type:'ADD',showId:show.id})
                    }
                    dispatchStarred({type:'REMOVE',showId:null})
                }

                return    <ShowCard 
                        key={show.id} 
                        id={show.id} 
                        name={show.name} 
                        image={show.image?show.image.medium:IMAGE_NOT_FOUND}
                        summary={show.summary}
                        onStarClick={onStarClick}
                        isStarred={isStarred}
                    />
            })
        }
    </FlexGrid>
}

export default ShowGrid;