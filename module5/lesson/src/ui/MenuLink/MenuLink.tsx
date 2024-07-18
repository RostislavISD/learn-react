type TProps = {
    id: string;
    path: string;
    title: string;
    onClick: (routeId: string) => void;
};

export const NavigationLink: React.FC<TProps> = ({ id, path, title, onClick }) => {
    const handleLinkClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        onClick(id);
    }

    return (
        <a href={path} onClick={handleLinkClick}>{title}</a>
    )
}