import { Players } from "../model";
import { DropResult } from "@hello-pangea/dnd";

export const onDragEnd = (
  result: DropResult,
  players: Players[],
  myFavorite: Players[],
  yourFavorite: Players[]
) => {
  const { source, destination } = result;

  if (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index) ||
    destination.droppableId === "NBA Players"
  )
    return;

  let add,
    list = players,
    myFav = myFavorite,
    yourFav = yourFavorite;

  if (source.droppableId === "My Favorite Players") {
    add = myFav[source.index];
    myFav.splice(source.index, 1);
    if (destination.droppableId === "Your Favorite Players") {
      yourFav.splice(destination.index, 0, add);
    }
    if (destination.droppableId === "My Favorite Players") {
      myFav.splice(destination.index, 0, add);
    }
  }

  if (source.droppableId === "Your Favorite Players") {
    add = yourFav[source.index];
    yourFav.splice(source.index, 1);
    if (destination.droppableId === "My Favorite Players") {
      myFav.splice(destination.index, 0, add);
    }
    if (destination.droppableId === "Your Favorite Players") {
      yourFav.splice(destination.index, 0, add);
    }
  }

  if (source.droppableId === "NBA Players") {
    add = { ...list[source.index] };
    add.id *= Math.floor(100000 * Math.random());

    if (destination.droppableId === "My Favorite Players") {
      myFav.splice(destination.index, 0, add);
    }
    if (destination.droppableId === "Your Favorite Players") {
      yourFav.splice(destination.index, 0, add);
    }
  }

  return { myFav, yourFav };
};
