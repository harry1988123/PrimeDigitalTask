import axios from "axios";
import { func } from "prop-types";
import configData  from "../config.json";

export function loadColor(){
    console.log(configData.SERVER_URL);
    return(dispatch)=>{
        return axios.get(configData.SERVER_URL+`/colors`).then((response)=>{
            dispatch(colorsList(response.data));
        })
        .catch(error =>{
            console.log(error.message);
        })
    }
}

export function colorsList(colorobj){ //Action Creators
    return {
        type:'COLOR',
        payload:colorobj
    }
}

export function loadShapes(){
    return(dispatch)=>{
        return axios.get(configData.SERVER_URL+`/shapes`).then((response)=>{
            dispatch(shapesList(response.data));
        })
        .catch(error =>{
            console.log(error.message);
        })
    }
}

export function shapesList(shapesobj){ //Action Creators
    return {
        type:'SHAPE',
        payload:shapesobj
    }
}

export function loadSizes(){
    return(dispatch)=>{
        return axios.get(configData.SERVER_URL+`/sizes`).then((response)=>{
            dispatch(sizeList(response.data));
        })
        .catch(error =>{
            console.log(error.message);
        })
    }
}

export function sizeList(sizesobj){ //Action Creators
    return {
        type:'SIZE',
        payload: sizesobj
    }
}

export function loadPlanets(searchText){
    return(dispatch)=>{
        return axios.get(configData.SERVER_URL+`/planets?name_like=`+searchText).then((response)=>{
            dispatch(planetList(response.data));
        })
        .catch(error =>{
            console.log(error.message);
        })
    }
}

export function planetList(planet){
    return {
        type:'PLANET',
        payload:planet
    }
}

export function createPostAction(postData){
    return dispatch => {
        createPost(postData).then(response => {
            console.log(response.data); 
            dispatch(SearchResult(response.data));
        });
    }
}

export function SearchResult(response){
    
    return {
        type: 'SEARCH_RESULT',
        payload: response
    }
}

export function SetSelectedSearchText(text){
    debugger;
    return {
        type: 'SEARCH_TEXT',
        payload: text
    }
}

export function SetSelectedColorList(color){ 
    return {
        type: 'STORE_COLOR',
        payload: color
    }
}

export function SetSelectedShapeList(shape){
    return {
        type: 'STORE_SHAPE',
        payload: shape
    }
}

export function getSelectedSizeList(size){
    return {
        type: 'STORE_SIZE',
        payload: size
    }
}

export function createPost(postData){ 
    const color = postData.colorId.length > 0 ? `&color=`+ postData.colorId.toString() : "";
    const shape = postData.shapeId.length > 0 ? `&shape=` + postData.shapeId.toString() : "";
    const size = postData.sizeId.length > 0 ? `&size=` + postData.sizeId.toString() : "";
    return axios.get( configData.SERVER_URL + `/planets?q=`+ postData.searchText + color + shape + size);
    //return axios.get( configData.SERVER_URL + `/planets?q=`+ postData.searchText)
}