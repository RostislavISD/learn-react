import { USERS } from "../../data";
import "./UserInfoPage.css";
import { IUserInfoPageProps } from "./interfaces";

export function UserInfoPage({ userId }: IUserInfoPageProps) {
	const user = USERS[Number(userId)];

	if (!user) {
		return (
			<div className="userInfoPage">
				<h2>UserInfoPage</h2>

				<div className="users">
					<p>Пользоатвеля с таким ИД нет</p>
				</div>
			</div>
		);
	}

	return (
		<div className="userInfoPage">
			<h2>UserInfoPage</h2>

			<div className="users">
				<p>{user.jobTitle}</p>
				<p>{user.email}</p>
				<img src={user.avatar} alt="" width={200} height={200} />
				<p>{user.fullName}</p>
				<p>{user.bio}</p>
			</div>
		</div>
	);
}
