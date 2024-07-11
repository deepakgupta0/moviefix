import { useEffect } from "react";
import useThrottle from "./useThrottle";

const useInfiniteScroll = (
  callback: (direction: "up" | "down") => void,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const throttledScroll = useThrottle(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const clientHeight = containerRef.current.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      callback("down");
    } else if (scrollTop === 0) {
      callback("up");
    }
  }, 500);
  useEffect(() => {
    containerRef.current?.addEventListener("scroll", throttledScroll);
    return () =>
      containerRef.current?.removeEventListener("scroll", throttledScroll);
  }, [throttledScroll]);
};

export default useInfiniteScroll;
