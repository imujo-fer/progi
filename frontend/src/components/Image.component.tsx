import { ComponentProps } from "react";

const env = import.meta.env.VITE_ENV;
const viteUrl = import.meta.env.VITE_URL || "";

const imageUrlPrefix = env === "dev" ? viteUrl : "";

type ImageProps = ComponentProps<"img">;

export default function Image({ src, ...props }: ImageProps) {
  return <img src={imageUrlPrefix + src} {...props} />;
}
