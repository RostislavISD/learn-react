import { FC } from "react";
import { fetchLogout, fetchUsername } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../Button";

export const Top: FC = () => {
  const userQuery = useQuery(
    {
      queryFn: () => fetchUsername(),
      queryKey: ["user"],
    },
    queryClient
  );

  const logoutMutation = useMutation(
    {
      mutationFn: fetchLogout,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      },
    },
    queryClient
  );


  return (
    <>
      <span>Авторизован: {userQuery.data}</span>
      <button onClick={()=>logoutMutation.mutate()}> Выйти </button>
    </>
  );
};
