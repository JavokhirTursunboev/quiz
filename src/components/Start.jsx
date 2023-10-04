import React from "react";
import { useRef, useEffect } from "react";
import { useGlobalContext } from "../App";

function Start() {
  const { setUser } = useGlobalContext();
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUser(inputRef.current.value);
  };

  return (
    <form className="start" onSubmit={handleClick}>
      <input
        placeholder="enter your name "
        className="startInput"
        ref={inputRef}
      />
      <button className="startButton">Start</button>
    </form>
  );
}

export default Start;
