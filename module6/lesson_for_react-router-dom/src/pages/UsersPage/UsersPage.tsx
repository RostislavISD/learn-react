import { ChangeEvent, useState } from "react";
import { USERS } from "../../data";
import { Transit, usePages } from "../../PagesProvider";
import "./UsersPage.css";
import { Link, useSearchParams } from "react-router-dom";

export function UsersPage() {
	//const [searchName, setSearchName] = useState<string>("");

	//const{setSearchParam, search} = usePages();

	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		setSearchParams({
			searchName: value.toLowerCase(),
		});
	};


	const searchName = searchParams.get('searchName') || "" ;

	const filteredUsers = USERS.filter(({ fullName }) =>
		fullName.toLowerCase().includes(searchName)
	);

	return (
		<div className="usersPage">
			<h2>UsersPage</h2>

			<div className="users">
				<label>
					введите имя{" "}
					<input type="text" value={searchName} onChange={handleSearchName} />
				</label>

				{filteredUsers.map(({ id, fullName }) => (
					<Link to={`/users/${id}`} key={id}>
						{fullName}
					</Link>
				))}
			</div>
		</div>
	);
}
