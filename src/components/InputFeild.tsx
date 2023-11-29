import React, { useRef, useState } from "react";
import { Players } from "../model";

import "./InputFeild.css";

interface Props {
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
}

export const InputFeild: React.FC<Props> = ({
  setSearchPhrase,
  setPage,
  setPlayers,
}) => {
  const [input, setInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input) {
      setSearchPhrase((searchPhrase) => input);
      setInput((input) => "");
      setPage((searchPage) => 0);
    }
  };

  return (
    <div className="input__container">
      <form
        className="input__form"
        onSubmit={(e) => {
          handleSubmit(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          name="input"
          className="input"
          type="input"
          placeholder="😤 Give us a name !"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="input__button" type="submit">
          GO!
        </button>
      </form>
    </div>
  );
};
