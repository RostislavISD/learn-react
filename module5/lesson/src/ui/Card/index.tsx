import { Button } from "../Button";
import './styles.css';

type TProps = {
    id: string;
    img: string;
    features: string[];
    title: string;
    description: string;
    badges: string[];
    onChooseRoom: (roomId: string) => void;
};

export const Card = ({ id, img, features, title, description, badges, onChooseRoom }: TProps) => {
    const handleButtonClick = () => onChooseRoom(id);
    return (
        <div className='card'>
            <img src={img} />
            <ul className='features'>
                {features.map(feature => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className='badges'>
                {badges.map(badge => <div key={badge} className='badge'>{badge}</div>)}
            </div>
            <Button onClick={handleButtonClick}>Выбрать</Button>
        </div>
    )
}
