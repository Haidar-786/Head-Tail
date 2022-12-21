import { useState } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState([]);
  const [face, setFace] = useState();
  const [error, setError] = useState(false);


 
  // console.log("lastColoumn",lastColoumn[lastColoumn.length - 1])

  const del = (col, row) => {
    console.log(col, row, "derfg");
    if (state[col].length === 1) {
      console.log("hitting");
      state.splice(col, 1);
      setState([...state]);
    } else {
      state[col].splice(1, 1);
      setState([...state]);
      console.log("setstate",setState)
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const lastColoumn = state[state.length-1];
    console.log("lastcoloum",lastColoumn)
    const lastletter = lastColoumn ? lastColoumn[lastColoumn.length - 1] : " ";
    if (lastletter === face) {
      setError(false);
      const newFaces = state[state?.length - 1];
      newFaces.push(face);
      setState([...state]);
      setFace(""); 
    }else if (["H", "T"].includes(face)) {
      state.push([face]);
      setState([...state]);
      setError(false);
      setFace("");
    } else {
      setError(true);
    }
    
  };
  return (
    <div className="App">
      <h1>Heads and Tails</h1>
      <form onSubmit={submitHandler}>
        <select value={face} onChange={(e) => setFace(e.target.value)} className="select-box">
          <option>Select a value</option>
          <option Value="H">H</option>
          <option Value="T">T</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">Please select any one value</div>}
      <div className="parent" >
        {state.map((item, ix) => (
          <span className="coloumn">
           {/* { console.log("index of the item ",item)}
           { console.log("index of the ix ",ix)}
           { console.log("index of the state[ix] ",state[ix])} */}
            {item.map((face, iy) => (
              <div className="face" onClick={() => del(ix, iy)}>
                {console.log("index of the iy",iy,face)}
                {face}
                <span className="face-tooltip">
                  Delete coloumn {ix + 1} row {iy + 1}
                </span>
              </div>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}