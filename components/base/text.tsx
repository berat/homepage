"use client";

import Link from "next/link";
import classNames from "classnames";

import { getRandomInt } from "@/utils/helpers";

export default function Text({ title }) {
  return title.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    const classname = classNames({
      "text-text": true,
      "font-semibold": bold,
      "bg-[#e8e8e8] px-1 py-0.5 text-red-600 rounded text-[14.75px]": code,
      "italic pr-1": italic,
      "line-through": strikethrough,
      underline: underline,
    });

    if (text.content === " ") {
      return null;
    }

    return (
      <span
        className={classname}
        style={color !== "default" ? { color } : {}}
        key={getRandomInt(666666, 214144141)}
      >
        {text.link ? (
          <Link
            href={text.link.url}
            className="text-primary underline underline-offset-2 font-medium"
            target={
              !text.link.url.includes(
                typeof window !== "undefined" && window.location.origin,
              )
                ? "_blank"
                : "_self"
            }
          >
            {text.content}
          </Link>
        ) : (
          text.content
        )}
      </span>
    );
  });
}
