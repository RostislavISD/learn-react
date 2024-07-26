import { Restaurant } from "../../api";
import StarIcon from "../../assets/star.svg?react";
import "./card.scss";

export function Card({ url, name, description, raiting, id }: Restaurant) {

  return (
    <li className="card">
      <div className="card__img-wrap">
        <img src={url} alt="img" />
      </div>
      <p>{name}</p>
      <p>{description}</p>
      <div className="card__rating">
        {[...new Array(5)].map((item, index) => (
          <span key={index} data-weight={index + 1} data-id={id} className={raiting >= index + 1 ? "is-active" : ""}>
            <StarIcon width={24} height={24} className="star" />
          </span>
        ))}
      </div>
    </li>
  );
}
