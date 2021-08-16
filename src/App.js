import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPostAction, SetSelectedShapeList, SetSelectedColorList, SearchResult, SetSelectedSearchText  } from './Actions/index';
import { Input, Space, Checkbox } from 'antd'; 
import store from './store';
import _ from 'lodash';

const App = ()=>{
  const myState = useSelector((state) => state.fetchThings); 
  const dispatch = useDispatch();
  const [SearchText, setSearchText] = useState("");
  const [SelectedColorList, SetColors] = useState([]);
  const [SelectedShapeList, SetShape] = useState([]);
  const [outPutResult, setOutPutResult] = useState([]);
  function onSearch(value){
    dispatch(SetSelectedSearchText(value));
    setSearchText(value); 
  }
  const { Search } = Input; 
  let colorList = [];
  let sizeList = [];
  let shapeList = [];
  if(myState.color != undefined){ 
    colorList = [];
    myState.color.forEach(element => {
      colorList.push({label: element.name, value: element.id})// Converting the checkbox suitable data
    });
  }
  if(myState.size != undefined){ 
    sizeList = [];
    myState.size.forEach(element => {
      sizeList.push({label: element.name, value: element.id})// Converting the checkbox suitable data
    });
  }
  if(myState.shape != undefined){ 
    shapeList = [];
    myState.shape.forEach(element => {
      shapeList.push({label: element.name, value: element.id})// Converting the checkbox suitable data
    });
  }

  function onChangeColor(checkedValues) { 
    dispatch(SetSelectedColorList(checkedValues));
    SetColors(checkedValues);  
  }

  function onChangeShape(checkedValues){ 
    dispatch(SetSelectedShapeList(checkedValues));
    SetShape(checkedValues);  
  }

  const [SelectedSizeList, SetSize] = useState([]);
  function onChangeSize(checkedValues){ 
    SetSize(checkedValues);  
  }
  function PostRequest(){ 
    const postData ={
      'searchText': SearchText,
      'colorId': SelectedColorList,
      'shapeId': SelectedShapeList,
      'sizeId': SelectedSizeList
    }    
    dispatch(createPostAction(postData));
    store.dispatch({type: 'SEARCH_RESULT'});      
    setOutPutResult(myState.searchResult);
  } 

  useEffect(() =>{ 
    if(SearchText != ""){
      PostRequest();
    }    
  },[SearchText,SelectedColorList,SelectedShapeList,SelectedSizeList]);

 return (
   <>
    <div className="container">  
        <div className="top"> 
            <Space direction="vertical">
              <Search placeholder="Input search text" onSearch={onSearch} enterButton size="large"  style={{ width: 978 }}  />
            </Space>
        </div>

        <div className="body-container">
          <div className="left-panel">

              <div className="color-container"> 
                <div className="header-text">Colors</div>
                <Checkbox.Group options={colorList}  onChange={onChangeColor} style={{ display:'flex',padding: '0.5rem 0',marginBottom: 40, color: 'black', fontWeight: 600 }} />
              </div>

              <div className="Shape-container">
                <div className="header-text">Shape</div>
                <Checkbox.Group options={shapeList}  onChange={onChangeShape} style={{ display:'flex',padding: '0.5rem 0',marginBottom: 40, color: 'black', fontWeight: 600 }} />
              </div>

              <div className="size-container">
                <div className="header-text">Size</div>
                <Checkbox.Group options={sizeList} onChange={onChangeSize} style={{ display:'flex',padding: '0.5rem 0',marginBottom: 40, color: 'black', fontWeight: 600 }} />
              </div>

          </div>
          <div className="right-side-panel">
              <div className="result-container">
                {
                  myState.searchResult != undefined ?  myState.searchResult.map(result => (<div className="outer-div-container"><div className="result-name"> { result.name } </div> 
                  <div className="secondary-text"> { result.name } have { _.filter(myState.color, {'id': result.color })[0]["name"] } color and { _.filter(myState.shape, {'id': result.shape})[0]["name"] } shape </div></div>)) : ""
                }
              </div>
          </div>
        </div>

    </div>
   </>
 ) 
}

export default App;