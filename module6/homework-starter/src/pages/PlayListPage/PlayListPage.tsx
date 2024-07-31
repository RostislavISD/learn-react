import { Link, useSearchParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlayListPage.css";
import { ChangeEvent} from "react";

export function PlayListPage() {
	const [searchParam, setSearchParam] = useSearchParams();

	const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		setSearchParam({ searchName: value.toLowerCase(), searchGenre });
	};

    const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		setSearchParam({ searchGenre: value.toLowerCase(), searchName });
	};

	const searchName = searchParam.get("searchName") || "";
    const searchGenre = searchParam.get("searchGenre") || "";

	const filteredList= PLAYLISTS.filter(({ name }) =>
		name.toLowerCase().includes(searchName)
	).filter(({ genre }) =>
		genre.toLowerCase().includes(searchGenre)
	);


	return (
		<div className="playListPage">
			<h2>PlayListPage</h2>

            <form action="#">
                <label htmlFor="">
                    Введите жанр: 
                    <input type="text" value={searchGenre} onChange={handleSearchGenre} />


                </label>
                <label htmlFor="">
                    Введите название: 
                    <input type="text" value={searchName} onChange={handleSearchName} />
                </label>
            </form>

			<div className="playListPage">
				{filteredList.map(({id, name}) => (
					<Link to={`/playListInfoPage/${id}`} key={id}>
						{name}
					</Link>
				))}
			</div>
		</div>
	);
}