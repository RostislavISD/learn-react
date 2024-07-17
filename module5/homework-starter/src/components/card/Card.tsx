import StarIcon from '../../assets/star.svg?react'


interface ICardProps {
    id: string,
    name: string,
    description: string,
    raiting: number,
    url: string
}

export function Card({ url, name, description, raiting }: ICardProps) {
    <div className="card">
        <div className="card__img-wrap">
            <img src={url} alt="img" />
        </div>
        <p>{name}</p>
        <p>{description}</p>
        <div className="card__rating">
            {[...new Array(raiting)].map((item, index) => <span key={index}>
                <StarIcon width={10} height={10} className="star" />
            </span>)}
        </div>
    </div>
}