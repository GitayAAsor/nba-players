import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

import { InputFeild } from "./components/InputFeild";
import { PlayersList } from "./components/PlayersList";

import { fetchPlayers } from "./hooks/fetchPlayers";
import { onDragEnd } from "./hooks/onDragEnd";

import { Players } from "./model";

import "./App.css";

const NUMBER_OF_PLAYERS_TO_SHOW_ON_PAGE: number = 15;
const NUMBER_OF_PLAYERS_ON_API_PAGE: number = 25;

const App: React.FC = () => {
  const [players, setPlayers] = useState<Players[]>([]);
  const [playersToShow, setPlayersToShow] = useState<Players[]>([]);
  const [myFavorite, setMyFavorite] = useState<Players[]>([]);
  const [yourFavorite, setYourFavorite] = useState<Players[]>([]);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const setFirstPagesOfPlayers = async () => {
    const firstApiPageOfPlayers = await fetchPlayers(1, searchPhrase);
    if (firstApiPageOfPlayers) {
      setPlayersToShow((playersToShow) =>
        firstApiPageOfPlayers.slice(0, NUMBER_OF_PLAYERS_TO_SHOW_ON_PAGE)
      );
      setPlayers((players) => firstApiPageOfPlayers);
    }
  };

  useEffect(() => {
    const setPagesOfPlayers = async () => {
      if (!page) {
        setPlayers((players) => []);
        setPage((page) => 1);
      } else {
        const appPageStartIndex: number =
          (page - 1) * NUMBER_OF_PLAYERS_TO_SHOW_ON_PAGE;
        const appPageEndIndex: number =
          page * NUMBER_OF_PLAYERS_TO_SHOW_ON_PAGE;

        const playersListLength: number = players.length;
        const restOfPlayersLength =
          playersListLength % NUMBER_OF_PLAYERS_ON_API_PAGE;

        if (!playersListLength) {
          setFirstPagesOfPlayers();
        } else if (appPageEndIndex < playersListLength) {
          setPlayersToShow(
            (playersToShow) =>
              (playersToShow = players.slice(
                appPageStartIndex,
                appPageEndIndex
              ))
          );
        } else {
          if (!restOfPlayersLength) {
            const nextApiPageNumber: number =
              playersListLength / NUMBER_OF_PLAYERS_ON_API_PAGE + 1;
            const nextApiPageOfPlayers = await fetchPlayers(
              nextApiPageNumber,
              searchPhrase
            );

            if (nextApiPageOfPlayers) {
              const morePlayers = players.concat(nextApiPageOfPlayers);

              setPlayersToShow(
                (playersToShow) =>
                  (playersToShow = morePlayers.slice(
                    appPageStartIndex,
                    appPageEndIndex
                  ))
              );

              setPlayers((players) => morePlayers);
            }
          } else {
            setPlayersToShow(
              (playersToShow) =>
                (playersToShow = players.slice(
                  appPageStartIndex,
                  appPageStartIndex + restOfPlayersLength
                ))
            );
          }
        }
      }
    };
    setPagesOfPlayers();
  }, [page]);

  const handleOnDragEnd = (result: DropResult) => {
    const results = onDragEnd(result, players, myFavorite, yourFavorite);
    if (results) {
      setMyFavorite((myFavorite) => results.myFav);
      setYourFavorite((yourFavorite) => results.yourFav);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="app">
        <span className="app__heading">Our Favorite NBA Players</span>
        <InputFeild
          setSearchPhrase={setSearchPhrase}
          setPage={setPage}
          setPlayers={setPlayers}
        />
        <main>
          <section className="lists__container">
            <div className="list">
              <PlayersList
                players={playersToShow}
                title="NBA Players"
                size={NUMBER_OF_PLAYERS_TO_SHOW_ON_PAGE}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                searchPage={page}
                setPage={setPage}
              />
            </div>
            <div className="list">
              <Droppable droppableId="bin">
                {(provided, snapshot) => (
                  <div
                    className={`bin${snapshot.isDraggingOver ? " drag" : ""}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    🗑️⃪ ⛹️‍♂️ Drag & Drop Here To Delete
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <PlayersList
                players={myFavorite}
                title="My Favorite Players"
                size={NUMBER_OF_PLAYERS_TO_SHOW_ON_PAGE}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                searchPage={page}
                setPage={setPage}
              />

              <PlayersList
                players={yourFavorite}
                title="Your Favorite Players"
                size={NUMBER_OF_PLAYERS_TO_SHOW_ON_PAGE}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                searchPage={page}
                setPage={setPage}
              />
            </div>
          </section>
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;
