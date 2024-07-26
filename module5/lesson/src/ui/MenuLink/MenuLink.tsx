type TProps = {
    id: string;
    path: string;
    title: string;
    onClick: (routeId: string) => void;
<<<<<<< HEAD
};

export const NavigationLink: React.FC<TProps> = ({ id, path, title, onClick }) => {
    const handleLinkClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
        e.preventDefault();

=======
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
>>>>>>> 39f3b0fa1cc9d24044d99fef4c9086b78d4217c3
        onClick(id);
    }

    return (
<<<<<<< HEAD
        <a href={path} onClick={handleLinkClick}>{title}</a>
=======
        <a href={path} onClick={handleLinkClick} className={active !== undefined ? "active" : ""}>{title}</a>
>>>>>>> 39f3b0fa1cc9d24044d99fef4c9086b78d4217c3
    )
}