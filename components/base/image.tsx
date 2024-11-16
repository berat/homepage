"use client";

import { useState } from "react";
import classNames from "classnames";
import NextImage, { ImageProps as NextImageProps } from "next/image";

type ImageProps = {
  rounded?: string;
  divClassname?:string
} & NextImageProps;

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, divClassname, ...rest } = props;

  console.log('Image ~ divClassname:', divClassname)

  const [isLoading, setLoading] = useState(true);

  const roundedClass = "rounded-" + rounded;
  return (
    <div
      className={classNames({
        "overflow-hidden": true,
        "animate-pulse": isLoading,
        [roundedClass]: rounded,
        [divClassname]: divClassname
      })}
    >
      <NextImage
        className={classNames(className, {
          "duration-700 ease-in-out": true,
          "scale-[1.02] blur-xl grayscale": isLoading,
          "scale-100 blur-0 grayscale-0": !isLoading,
          [roundedClass]: rounded,
        })}
        src={src}
        alt={alt}
        loading="lazy"
        quality={100}
        onLoad={(e) => setLoading(false)}
        {...rest}
      />
    </div>
  );
};
export default Image;
