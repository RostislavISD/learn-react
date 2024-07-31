import { ReactNode } from "react";
import { usePages } from "./PagesProvider";
import { MainPage } from "../pages/MainPage";
import { UsersPage } from "../pages/UsersPage";
import { UserInfoPage } from "../pages/UserInfoPage";

export const RenderPage = (): ReactNode => {
	const { name } = usePages();

	if (name === "/") {
		return <MainPage />;
	}

	if (name === "/users") {
		return <UsersPage />;
	}

	//заменяет динамически
	const userId = name.replace('/users/', '')

	if (userId) {
		return <UserInfoPage userId={userId} />;
	}

	// if (name === "/users/1") {
	// 	return <UserInfoPage userId={1} />;
	// }

	// if (name === "/users/2") {
	// 	return <UserInfoPage userId={2} />;
	// }

	// if (name === "/users/3") {
	// 	return <UserInfoPage userId={3} />;
	// }

	// if (name === "/users/4") {
	// 	return <UserInfoPage userId={4} />;
	// }

	// if (name === "/users/5") {
	// 	return <UserInfoPage userId={5} />;
	// }

	// if (name === "/users/6") {
	// 	return <UserInfoPage userId={6} />;
	// }

	// if (name === "/users/7") {
	// 	return <UserInfoPage userId={7} />;
	// }

	// if (name === "/users/8") {
	// 	return <UserInfoPage userId={8} />;
	// }

	// if (name === "/users/9") {
	// 	return <UserInfoPage userId={9} />;
	// }

	return null;
};
