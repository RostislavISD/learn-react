import { Link, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlayListInfoPage.css"

export function PlayListInfoPage() {
  const { playListId } = useParams();
  const playList = PLAYLISTS[Number(playListId)];

  if (!playList || !playList.songs.length) {
    return (
      <div className="playListInfoPage">
        <h2>PlayListInfoPage</h2>

        <div>
          <p>такого плейлиста нет</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playListInfoPage">
      <h2>PlayListInfoPage</h2>

      <div className="playListInfoPage__content">
        <Link to={`/playListPage?searchGenre=${playList.genre.toLocaleLowerCase()}&searchName=`}><p>Жанр: {playList.genre}</p></Link>
        <p>Название: {playList.name}</p>
        <ul>
          {playList.songs.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
