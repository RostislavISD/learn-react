import { ReactElement, createContext, useContext, useEffect, useState } from "react";
import { IPage, IPageProvider, IPageProviderProps } from "./interfaces";

const PagesContext = createContext<IPageProvider | null>(null);

export function PagesProvider({ children }: IPageProviderProps): ReactElement {
	const [page, setPage] = useState<IPage>({
		//name: "/",
		name: window.location.pathname,
		search: window.location.search
	});

	const navigate = (name: string) => {
		window.history.pushState(null, "", name),
		setPage({ name, search: "" });
	};

	const setSearchParam = (key: string, value:string) => {
		const searchParams = new URLSearchParams;

		searchParams.set(key, value);

		const newPage: IPage = {
			name: page.name,
			search: searchParams.toString()
		}

		window.history.replaceState(null, "", `${newPage.name}?${newPage.search}`);
		setPage(newPage);
	}


	//работа со стрелками браузера.
	useEffect(() => {
		const handlePopstet = () => {
			setPage({name: window.location.pathname,
				search: window.location.search 
			})
		};

		window.addEventListener('popstate', handlePopstet);
		return () => {window.removeEventListener('popstate', handlePopstet)}
	}, [])

	return (
		<PagesContext.Provider value={{ ...page, navigate, setSearchParam }}>
			{children}
		</PagesContext.Provider>
	);
}

export function usePages(): IPageProvider {
	const pages = useContext(PagesContext);

	if (!pages) {
		throw new Error("pages not found");
	}

	return pages;
}
