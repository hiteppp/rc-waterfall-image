import React, { useState, useEffect, useRef, useCallback } from "react";
import { useResize } from "../hooks/useResize";
import { ImageComponent } from "./ImageComponent";
import { request } from "../api";
import InfiniteScroll from "./InfiniteScroll";
import { nanoid } from "nanoid";
import { fetchMoreImages } from "../api/getData";
import PullToRefresh from "./PullToRefresh";
// 瀑布流主组件
const Waterfall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ left: number; top: number }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, _setHasMore] = useState<boolean>(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const imgWidth = 220;
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    request("randomImages", {}).then((res) => {
      setImageList(res.data.data);
    });
  }, []);
  console.log("imageList", imageList);
  // 计算列数和间距
  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return { space: 0, columns: 0 };

    const containerWidth = containerRef.current.clientWidth;
    const columns = Math.floor(containerWidth / imgWidth);
    const space = (containerWidth - imgWidth * columns) / (columns + 1);

    return { space, columns };
  }, []);

  // 计算布局位置
  const calculatePositions = useCallback(() => {
    const { space, columns } = calculateColumns();
    if (columns === 0) return;

    const nextTops = new Array(columns).fill(0);
    const newPositions: { left: number; top: number }[] = [];
    const container = containerRef.current;

    if (!container) return;
    Array.from(container.children).forEach((imgElement, index) => {
      if (!(imgElement instanceof HTMLImageElement)) return;
      const minTop = Math.min(...nextTops);
      const columnIndex = nextTops.indexOf(minTop);

      const left = (columnIndex + 1) * space + columnIndex * imgWidth;
      newPositions[index] = { left, top: minTop };

      nextTops[columnIndex] += imgElement.height + space;
    });

    setContainerHeight(Math.max(...nextTops));
    setPositions(newPositions);
  }, [calculateColumns]);

  // 初始化加载图片
  useEffect(() => {
    calculatePositions();
  }, [calculatePositions]);

  // 使用自定义resize hook
  useResize(calculatePositions);
  const loadMoreHandler = () =>
    new Promise((r) => {
      fetchMoreImages().then((res) => {
        //console.log("res", res);
        //@ts-ignore
        setImageList((oldImages) => {
          if (oldImages.length < 30) {
            return [...oldImages, ...res];
          } else {
            let len = oldImages.length
            return [...oldImages.slice(len - 20), ...res];
          }
        });
      });
      r(imageList);
    });
  const PullToLoadMore = () => {
    setLoading(true);
    fetchMoreImages().then((res) => {
      //@ts-ignore
      setImageList(res);
      setLoading(false);
      //console.log('imageList',imageList);
      
    });
  };
  return (
    <div>
      <PullToRefresh onRefresh={PullToLoadMore}>
        <div
          ref={containerRef}
          style={{
            width: "100vw",
            margin: "0 auto",
            position: "relative",
            height: containerHeight,
            minHeight: "100vh",
          }}
        >
          {!(loading && imageList.length) && (
            imageList.map((src, index) => (
              <ImageComponent
                key={src + index}
                src={src}
                width={imgWidth}
                style={positions[index] || { left: 0, top: 0 }}
                onLoad={calculatePositions}
              />
            ))
          )}
        </div>
      </PullToRefresh>
      <InfiniteScroll
        hasMore={hasMore}
        loadMore={loadMoreHandler}
        key={nanoid()}
      />
    </div>
  );
};

export default Waterfall;
