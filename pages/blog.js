import { useRef, useEffect, useState } from "react";
import NextLink from "next/link";
import { Text } from "@chakra-ui/react";
import { formatDate } from "../lib/format-date";
import { orderByDate } from "../lib/order-by-date";
import { getAllFilesMetadata } from "../lib/mdx";
import { usePagination } from "../lib/use-pagination";
import { Layout, PostListItem } from "../components";

export default function Blog({ posts }) {
  const { next, currentPage, currentData, maxPage } = usePagination(posts, 10);
  const [element, setElement] = useState(null);
  const observer = useRef();
  const prevY = useRef(0);

  const currentPosts = currentData();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;

        if (prevY.current > y) {
          next();
        }
        prevY.current = y;
      },
      { threshold: 0.5 }
    );
  }, []);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  const metadata = {
    title: "Últimos Artículos",
  };

  return (
    <Layout type="post" metadata={metadata}>
      {currentPosts &&
        currentPosts.map((post) => (
          <NextLink href={post.slug} key={post.slug}>
            <a>
              <PostListItem
                title={post.title}
                date={formatDate(post.date)}
                tags={post.tags}
              />
            </a>
          </NextLink>
        ))}
      {currentPage !== maxPage && (
        <Text fontSize="xl" fontWeight="bold" p={6} ref={setElement}>
          Cargando...
        </Text>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const unorderedPosts = await getAllFilesMetadata();
  const posts = unorderedPosts.sort(orderByDate);
  console.log(posts);
  return {
    props: { posts },
  };
}
