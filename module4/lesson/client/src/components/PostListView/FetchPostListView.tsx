import { fetchPostList } from "../../api/Post";
//import { usePostList } from "../../api/User"
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { PostListView } from "./PostListView";
import { useQuery } from "@tanstack/react-query";

export const FetchPostListView = () => {

    //заменили свой запрос на react-query
    //const { state, refetch } = usePostList();

    const postListQuery = useQuery(
        {
            queryFn: () => fetchPostList(),
            queryKey: ["posts"],
        }, queryClient)

    switch (postListQuery.status) {
        //case "idle":
        case "pending":
            return <Loader />
        case "success":
            //return <PostListView postList={state.data} />
            return <PostListView postList={postListQuery.data.list} />
        case "error":
            return (
                <div>
                    <span>Произошла ошибка</span>
                    {/* <button onClick={refetch}>Повторить запрос</button> */}
                    <button onClick={() => postListQuery.refetch()}>Повторить запрос</button>
                </div>
            )
    }
};