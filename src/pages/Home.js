import React, {useState} from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";
import ActorGrid from "../components/actor/ActorGrid";
import { SearchInput,RadioInputsWrapper,SearchButtonWrapper } from "./Home.styled";
import CustomRadio from '../components/CustomRadio';

const Home = () => {

    const [input,setInput] = useState('')
    const [results,setResults] = useState(null)
    const [searchOption,setSearchOption] = useState('shows')

    const isShowsSearch = searchOption === 'shows'

    const changeInput = (ev) => {
        setInput(ev.target.value)

    }

    const clicked = () => {
        
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result)
        })
    }

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13)
        {
            clicked()
        }
        
    }

    const onRenderResult = () => {
        if(results && results.length === 0){
            return <div>No Results</div>
        }
        if(results && results.length > 0){
            return results[0].show ? <ShowGrid data={results}/> 
                : <ActorGrid data={results}/>
        }


        return null;
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value)
    }


    return <MainPageLayout>
        <SearchInput type="text" onChange={changeInput} onKeyDown={onKeyDown} value={input}/>
        <RadioInputsWrapper>
        <div>
          <CustomRadio label="Shows" id="shows-search" value="shows" checked={isShowsSearch} onChange={onRadioChange}/>
        </div>

        <div>
          <CustomRadio label="Actors" id="actors-search" value="people" checked={!isShowsSearch} onChange={onRadioChange}/>
        </div>
        </RadioInputsWrapper>
        <SearchButtonWrapper><button type="button" onClick={clicked}>Search</button></SearchButtonWrapper>
        {onRenderResult()}
    </MainPageLayout>
}

export default Home;