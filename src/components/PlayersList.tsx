import React, { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Players } from "../model";
import "./PlayersList.css";
import { randomColor } from "../hooks/randomColor";

interface Props {
  players: Players[];
  title: string;
  size: number;
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  searchPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const NBA_PLAYERS_LIST_COLOR = "#32C3CD";
const FAVORITE_LIST_COLOR = "#EB6750";

export const PlayersList: React.FC<Props> = ({
  players,
  title,
  size,
  searchPhrase,
  setSearchPhrase,
  searchPage,
  setPage,
}) => {
  const [color, setColor] = useState<string>(FAVORITE_LIST_COLOR);

  const isFavoriteList: boolean = !(title === "NBA Players");

  const handlePrevPage = () => {
    if (searchPage !== 1) {
      setPage((searchPage) => searchPage - 1);
    }
  };

  const handleNextPage = () => {
    if (players.length === size) {
      setPage((searchPage) => searchPage + 1);
    }
  };

  const handleFetchAll = () => {
    if (searchPhrase) {
      setPage((searchPage) => 0);
      setSearchPhrase((searchPhrase) => "");
    }
  };

  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          className={`list__container${
            snapshot.isDraggingOver ? " draginto" : ""
          }`}
          style={
            isFavoriteList
              ? { backgroundColor: color }
              : { backgroundColor: NBA_PLAYERS_LIST_COLOR }
          }
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="list__haeding">
            <span>{title}</span>
            {isFavoriteList ? (
              <button
                className="list__button"
                onClick={() => setColor(randomColor())}
              >
                🎨
              </button>
            ) : (
              <div>
                <button
                  className="list__button blue"
                  onClick={() => handleFetchAll()}
                >
                  {"GO!"}
                </button>
                {" | "}
                <button
                  className="list__button"
                  onClick={() => handlePrevPage()}
                >
                  {"<"}
                </button>{" "}
                <button
                  className="list__button"
                  onClick={() => handleNextPage()}
                >
                  {">"}
                </button>
              </div>
            )}
          </div>
          {players?.map((player, index) => {
            return (
              <Draggable
                draggableId={player.id.toString()}
                key={player.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    className={`list__element${
                      snapshot.isDragging ? " dragged" : ""
                    }`}
                    key={player.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    🏀 {`${player.name} - ${player.team}`}
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
