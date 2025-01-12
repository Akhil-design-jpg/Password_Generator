import { useState, useCallback, useEffect, useRef } from "react";
// useRef - kisi bhi cheez ka reference lena hota hai use - useRef
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
    const passwordRef = useRef(null)
  



  // useCallback is a react hook that lets you store a function in the memory definition between re-renders
  // jo jo humne variables run karne hai useCallback mei vo dependency ke andar daaldenge
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // if numberAllowed true then add these numbers in str variable
    // same goes with charAllowed
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&**/+-(){}[]:',.<>?;/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      
    //  append values
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);
  // memory/ cache mei rakho run useEffect se karo
  // jaha ye possible run hoga uss method ko optimize karlo 

  const CopyPasswordToClipBoard = useCallback(()=>{
    //useRef - to give better copy ui feature for the user 
    // matlab jab copy ho tab user ko pata chaljaae ki copy hogya
    passwordRef.current?.select();
    
    // passwordRef.current?.setSelectionRange(0,3)// jaha humne 0th se leker 3rd element takk copy karna yaa kahi takk bhi copy karna hai
    alert("Copied to clipboard")
    window.navigator.clipboard.writeText(password)
    // writeText - to copy and paste the text
    // given this syntax for copying
  },[password])

 


  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed,charAllowed,passwordGenerator])
  // run only one time using dependency
  // if there is any error run it again useffect dependency
  
  return (
    <>
      <div className="text-center w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 h-36">
        <h1 className="text-white text-center font-bold my-3">
          Password Generator
        </h1>
        <div className='className = "flex shadow rounded-lg overflow-hidden mb-4"'>
          <input
            type="text"
            value={password}
            className="outline-none w-full mt-2 rounded-lg  py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
            // now the button and this input are interlinked for copy this input only 
          />
          <button
            onClick={CopyPasswordToClipBoard}
          className=" rounded-lg mt-2 w-24 ouline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
                // reverse the previous value in true or false
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
                // same goes with characters
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
