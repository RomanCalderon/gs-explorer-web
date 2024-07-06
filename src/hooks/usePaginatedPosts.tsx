import { useEffect, useState } from 'react';

import { PostCollection } from '../components/Post/Post';

function usePaginatedPosts(page: number, pageSize: number) {
    const [posts, setPosts] = useState<PostCollection>();

    useEffect(() => {
        let baseAddress = import.meta.env.VITE_API_URL;
        const request = new Request(`${baseAddress}/api/posts/v1?page=${page}&pageSize=${pageSize}`);
        const getPosts = async () => {
            await fetch(request)
                .then(response => response.json())
                .then(json => setPosts(json))
                .catch((ex) => console.error(ex));
        };

        getPosts();
    }, [page, pageSize]);

    return [posts?.posts];
}

export default usePaginatedPosts;