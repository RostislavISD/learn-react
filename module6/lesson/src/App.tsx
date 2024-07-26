import { Transit, RenderPage, PagesProvider } from "./PagesProvider";
import "./app.css";

export function App() {
	return (
		<PagesProvider>
			<div className="header">_</div>

			<div className="section">
				<nav className="navMenu">
					<Transit to={"/"}>Главная</Transit>
					<Transit to={"/users"}>Пользователи</Transit>
				</nav>

				<main className="content">
					<RenderPage />
				</main>
			</div>

			<div className="footer">
				<a href="https://skillbox.ru/code/">https://skillbox.ru/</a>
			</div>
		</PagesProvider>
	);
}
