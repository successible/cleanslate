type props = {
  width: number
  height: number
  alt: string
  src: any
  className?: string
}

export const Image: React.FC<props> = ({
  alt,
  className,
  height,
  src,
  width,
}) => {
  return (
    <img
      className={className}
      src={src.src}
      alt={alt}
      style={{ height, width }}
    />
  )
}
