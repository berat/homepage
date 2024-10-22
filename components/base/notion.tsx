import Link from "next/link";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Tweet } from "react-tweet";
// utils
import { getTweetIdFromUrl, getYoutubeId, validTweet } from "@/utils/helpers";
// components
import Text from "./text";
import Image from "./image";

export default function renderBlock(block) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p
          key={block.id}
          className="w-[96%] lg:w-full  mx-auto py-1.5 lg:py-2 leading-6 "
        >
          <Text title={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1
          key={block.id}
          className="w-[96%] lg:w-full  mx-auto text-3xl font-semibold leading-8 py-2 pt-8 lg:pt-6"
        >
          <Text title={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2
          key={block.id}
          className="w-[96%] lg:w-full  mx-auto text-2xl font-semibold leading-8 py-1.5 pt-8 lg:pt-6"
        >
          <Text title={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3
          key={block.id}
          className="w-[96%] lg:w-full  mx-auto text-xl leading-7 py-2 pt-8"
        >
          <Text title={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return (
        <ul
          key={block.id}
          className="w-[96%] lg:w-full  mx-auto list-disc pl-8 lg:pl-16 py-1.5 lg:py-3 leading-6"
        >
          {value.children.map((child) => renderBlock(child))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol
          key={block.id}
          className="w-full  mx-auto list-decimal pl-8 lg:pl-16 py-1.5 lg:py-3 leading-6"
        >
          {value.children.map((child) => renderBlock(child))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li
          key={block.id}
          className="w-[96%] lg:w-full  mx-auto leading-6 my-1"
        >
          <Text title={value.rich_text} />
          {/* eslint-disable-next-line no-use-before-define */}
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div key={block.id} className="to-do w-[96%] lg:w-full  mx-auto">
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text title={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details key={block.id} className="w-[96%] lg:w-full  mx-auto">
          <summary>
            <Text title={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <div key={child.id}>{renderBlock(child)}</div>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div key={block.id}>
          <strong>{value?.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case "image": {
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption =
        value.caption.length > 0 ? value.caption[0]?.plain_text : "";
      return (
        <figure
          key={block.id}
          className={`${caption ? "my-4" : "my-1"} w-fit  mx-auto`}
        >
          <Image
            src={src}
            alt={caption}
            width={800}
            rounded="[4px]"
            height={800}
            className={`${
              caption ? "max-h-[750px]" : "max-h-[450px]"
            } w-auto rounded`}
          />
          {caption && (
            <figcaption className="text-sm text-text tracking-wide leading-6 w-11/12 lg:w-9/12 text-center mx-auto mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }
    case "divider":
      return (
        <hr
          key={id}
          className="w-full lg:w-full  mx-auto border-gray bg-gray h-0.5 my-8"
        />
      );
    case "quote":
      return (
        <blockquote
          className="w-[96%] lg:w-full  mx-auto my-6  bg-gray px-6 border-l-[3px] border-text rounded-r-md py-6 text-text text-base leading-6"
          key={id}
        >
          <Text title={value.rich_text} />
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={block.id}
          className="w-[96%] lg:w-full  mx-auto text-[15px] mt-2 my-4"
        >
          <code key={id} className={`rounded language-${value.language}`}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file": {
      const srcFile =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure key={block.id}>
          <div>
            📎{" "}
            <Link href={srcFile} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case "bookmark": {
      const href = value.url;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="w-[96%] lg:w-full  mx-auto"
        >
          {href}
        </a>
      );
    }
    case "table": {
      return (
        <table key={block.id} className="w-blog mx-auto">
          <tbody>
            {block.children?.map((child, index) => {
              const RowElement =
                value.has_column_header && index === 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      <Text title={cell} />
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div
          key={block.id}
          className="flex flex-row gap-1 lg:gap-3 flex-wrap my-3 justify-center w-fit mx-auto"
        >
          {block.children.map((childBlock) => renderBlock(childBlock))}
        </div>
      );
    }
    case "column": {
      return (
        <div key={block.id} className="w-fit">
          {block.children
            .filter((item) =>
              item.type === "paragraph"
                ? item[item.type].rich_text.length !== 0
                : item
            )
            .map((child) => renderBlock(child))}
        </div>
      );
    }
    case "video": {
      let url = value.external.url;

      if (getYoutubeId(url)) {
        return (
          <div className="youtube-embed">
            <YouTubeEmbed videoid={getYoutubeId(url)} params="controls=0" />
          </div>
        );
      } else {
        return (
          <iframe
            src={url}
            width="100%"
            key={block.id}
            height="500px"
            allowFullScreen
            className="rounded w-[96%] lg:w-full mx-auto my-3"
            loading="lazy"
          />
        );
      }
    }
    case "embed": {
      const url = value.url;

      if (validTweet(url)) {
        return (
          <div className="mx-auto w-fit">
            <Tweet id={getTweetIdFromUrl(url)} />
          </div>
        );
      }
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
}

function renderNestedList(blocks) {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return (
      <ol key={blocks.id}>
        {value.children.map((blocks) => renderBlock(blocks))}
      </ol>
    );
  }
  return (
    <ul key={blocks.id}>{value.children.map((block) => renderBlock(block))}</ul>
  );
}
