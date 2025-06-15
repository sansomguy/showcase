// re-export blog so that we can have the blog page at the root and at the /blog/ endpoint in the application
import { usePostsLoader as useBlogPostsLoader, head as blogHead } from "./blog";
import blogComponent from "./blog";

export const usePostsLoader = useBlogPostsLoader;

export const head = blogHead;

export default blogComponent;
