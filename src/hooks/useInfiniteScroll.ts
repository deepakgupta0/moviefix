import { useEffect } from "react";
import useThrottle from "./useThrottle";

const useInfiniteScroll = (callback: (direction: "up" | "down") => void) => {
  const throttledScroll = useThrottle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (
      window.innerHeight + scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      callback("down");
    } else if (scrollTop === 0) {
      callback("up");
    }
  }, 400);
  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [throttledScroll]);
};

export default useInfiniteScroll;
