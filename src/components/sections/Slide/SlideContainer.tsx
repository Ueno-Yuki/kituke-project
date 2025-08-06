import { SlideContainerProps } from "@/types";

/**
 * スライド画像コンテナコンポーネント
 */
export default function SlideContainer({
  extendedImages,
  slideWrapperStyle,
  slideItemStyle
}: SlideContainerProps) {
  return (
    <div style={slideWrapperStyle}>
      {extendedImages.map((image, index) => (
        <div 
          key={index}
          style={{
            ...slideItemStyle,
            backgroundImage: `url('${image}')`
          }}
        />
      ))}
    </div>
  );
}