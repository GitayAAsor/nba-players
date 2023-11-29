const API_URL = "https://www.balldontlie.io/api/v1/players";

export const fetchPlayers = async (page: number, searchPhrase: string) => {
  try {
    const fetchUrl = `${API_URL}?page=${page}&search=${searchPhrase}`;
    const response = await fetch(fetchUrl);
    const resJson = await response.json();
    const players = resJson.data.map((player: any) => {
      return {
        id: player.id,
        name: `${player.first_name} ${player.last_name}`,
        team: player.team.full_name,
      };
    });
    console.log(
      `API Fetch Successful ✅\n( ApiPage: ${page} , searchPhrase: ${searchPhrase} , NumberOfNewPlayers: ${players.length} )}`
    );
    return players;
  } catch (err) {
    console.log(`API Fetch Unsuccessful ❌\n( errorIs: ${err} )`);
    alert(err);
  }
};
