import IButton from "@mui/material/Button";
import { useContext, useState} from "react";
import { ThemeContext } from "../utils/ThemeContent";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/ConfigureStore";

export function Profile(){
const {theme, toggleTheme}=useContext(ThemeContext);
const name =useSelector((store)=>store.name);
const [value,setValue]=useState('')
const dispatch= useDispatch();

const hendleChange=()=>{
  dispatch({type:"change_name",payload:value});
  console.log(value);
  setValue('')
}

    return(
        <>
        <h1>Profile</h1>
        <p>{theme==="light"?"Light":"Dark"}</p>
        {/* <button>Change Theme</button> */}
        <IButton onClick={toggleTheme} type="Submit" variant="contained" color="secondary">
          Change Theme
        </IButton>
        <hr margin='20px' />
        <h2>{name}</h2>
        <input type='text' value={value} onChange={(e)=>setValue(e.target.value)}/>
        <button onClick={hendleChange}>New name</button>
        </>
    )
}