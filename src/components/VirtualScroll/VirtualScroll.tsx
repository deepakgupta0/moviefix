import React, { useEffect, useState } from "react";
import useThrottle from "../../hooks/useThrottle";

interface VirtualScrollProps {
  items: React.ReactNode[];
  itemHeight: number;
  containerRef: React.RefObject<HTMLDivElement>;
}
const TOP_BAR_HEIGHT = 167;
const VirtualScroll: React.FC<VirtualScrollProps> = ({
  items,
  itemHeight,
  containerRef
}) => {
    console.log(items)
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items?.length * itemHeight;
  const viewportHeight = window.innerHeight - TOP_BAR_HEIGHT; // You can make this dynamic based on container height
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + viewportHeight) / itemHeight)
  );
  const visibleItems = items.slice(startIndex, endIndex + 1);

  const throttledOnScroll = useThrottle(() => {
    console.log("onScroll");
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, 600);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", throttledOnScroll);
      return () => {
        container.removeEventListener("scroll", throttledOnScroll);
      };
    }
  }, [throttledOnScroll]);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${viewportHeight}px`,
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div
        style={{
          height: `${(totalHeight)}px`,
          position: "relative",
        }}
      >

        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: "absolute",
              top: `${
                (startIndex + index) *
                itemHeight
              }px`,
              height: `${itemHeight}px`,
              width: "100%",
            }}
          >
            {item}
          </div>
        ))}

      </div>
    </div>
  );
};

export default React.memo(VirtualScroll);
