import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incNumber, decNumber, createPostAction  } from './Actions/index';
import { Input, Space, Checkbox } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import store from './store';

const App = ()=>{

  const myState = useSelector((state) => state.fetchThings); 
  const dispatch = useDispatch();
  let SearchText = "";
  const onSearch = value => {console.log(value); SearchText = value; PostRequest(); }
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

  let SelectedColorList = [];
  function onChangeColor(checkedValues) { 
    SelectedColorList = checkedValues;
  }
  let SelectedShapeList = [];
  function onChangeShape(checkedValues){ 
    SelectedShapeList = checkedValues;
  }
  let SelectedSizeList = [];
  function onChangeSize(checkedValues){ 
    SelectedSizeList = checkedValues;
  }
  let outPutResult = [];
  function PostRequest(){
    const postData ={
      'searchText': SearchText,
      'colorId': SelectedColorList,
      'shapeId': SelectedShapeList,
      'sizeId': SelectedSizeList
    }
    dispatch(createPostAction(postData,outPutResult));
    store.dispatch({type: 'SEARCH_RESULT'}); 
    console.log(myState.searchResult);
    outPutResult = myState.searchResult;
  }

 return (
   <>
    <div className="container"> 
        {/* <h1>Increament/Decreament counter</h1>
        <h4>Using React and Redux</h4>

        <div className="quantity">
            <a className="quantity__minus" title="Decrement" onClick= { () => dispatch(decNumber()) } ><span>-</span></a>
            <input name="quantity" type="text" className="quantity__input" value={ myState }/>
            <a className="quantity__plus" title="Increment" onClick= { () => dispatch(incNumber(5)) }><span>+</span></a>
        </div> */}

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
                  <div className="secondary-text"> Earth have Blue color and Round shape </div></div>)) : ""
                }
              </div>
          </div>
        </div>

        
        

    </div>
   </>
 ) 
}

export default App;