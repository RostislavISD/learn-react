type TProps = {
    id: string;
    path: string;
    title: string;
    onClick: (routeId: string) => void;
    active?: boolean;
};

export const NavigationLink: React.FC<TProps> = ({ id, path, title, active, onClick }) => {
    const handleLinkClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
        const elts = document.querySelectorAll("header a");
        e.preventDefault();
        const el = e.target as HTMLElement;
        elts.forEach((elem) => {
            elem.classList.remove("active");
        })
        el.classList.add("active");
        onClick(id);
    }

    return (
        <a href={path} onClick={handleLinkClick} className={active !== undefined ? "active" : ""}>{title}</a>
    )
}