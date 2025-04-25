// 图片组件
export const ImageComponent: React.FC<{
  src: string;
  width: number;
  onLoad: () => void;
  style?: React.CSSProperties;
}> = ({ src, width, onLoad, style }) => {
  return (
    <img
      src={src}
      alt="waterfall"
      style={{
        position: "absolute",
        transition: "0.3s",
        width: `${width}px`,
        ...style,
      }}
      onLoad={onLoad}
      loading="lazy"
    />
  );
};
