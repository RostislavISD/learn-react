import { useMutation, useQuery } from "@tanstack/react-query";
import { getRestaurants, Restaurant, updateRestaurantRating } from "../../api";
import "./cardList.scss";
import { Card } from "../card/Card";
import "./cardList.scss";
import { useEffect, useState } from "react";
import { queryClient } from "../../App";


type Response = {
    data: Restaurant[];
    isError: boolean;
    isLoading: boolean;
  };

const useRestaurantList = (): Response => {
    const { data, isError, isLoading } = useQuery({
      queryKey: ['restaurant'],
      queryFn: getRestaurants,
    });
  
    return { data, isError, isLoading };
  };



export function CardList() {
    const [inputValue, setInputValue] = useState<string>("");
    const { data, isLoading, isError} = useRestaurantList();

    const dataMutation =   useMutation({
        mutationFn: updateRestaurantRating,
        onSuccess() {
          queryClient.invalidateQueries({queryKey: ["restaurant"]})
        }
      }, queryClient)

    useEffect(() => {
        const cardList = document.querySelector(".CardList__wrap");
        cardList?.addEventListener("click", (event) => {
            event.stopPropagation();
            const target = event.target as HTMLElement;

            if (target.closest("span")) {
                console.log(target.closest("span")?.dataset.id, target.closest("span")?.dataset.weight,);

                const id = target.closest("span")?.dataset.id ;
                const raiting =  target.closest("span")?.dataset.weight;
                if (!id || !raiting) return;
                dataMutation.mutate({ id: id , raiting: Number(raiting) });
            }
        });
    },[data, dataMutation]);
  

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки</p>;

  const stroyCards = () => {
   return  (data || []).filter((elem) => elem.name.toLowerCase().includes(inputValue.toLowerCase())).map((cardData) => 
        <Card 
            url={cardData.url} 
            name={cardData.name} 
            description={cardData.description} 
            raiting={cardData.raiting} 
            key={cardData.id}
            id={cardData.id}/>
    )
  };

  const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <section className="CardList">
      <form action="#">
        <input placeholder="Search for restaurants" value={inputValue} onChange={handleChange}/>
      </form>
      <ul className="CardList__wrap">
        {stroyCards()}
      </ul>
    </section>
  );
}
