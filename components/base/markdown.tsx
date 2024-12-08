import { ReactNode } from "react";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES, MARKS } from "@contentful/rich-text-types";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Tweet } from "react-tweet";

import OptmzImage from "@/components/base/image";

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

interface AssetLink {
  block: Asset[];
}

export interface Content {
  json: Document;
  links: {
    entries: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inline: any[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      block: any[];
    };
    assets: AssetLink;
  };
}

function RichTextAsset({
  id,
  assets,
}: {
  id: string;
  assets: Asset[] | undefined;
}) {
  const asset = assets?.find((asset) => {
    return asset.sys.id === id;
  });

  if (asset?.url) {
    return (
      <figure className="w-full mb-4">
        <OptmzImage
          src={asset.url}
          width={1280}
          height={720}
          alt={asset.description}
          className="max-h-[750px] w-full object-contain rounded duration-700 ease-in-out scale-100 blur-0 grayscale-0  hover:scale-[1.02]"
        />
        {asset.description && (
          <figcaption className="text-sm tracking-wide text-gray-400 text-center py-2 mb-4">
            {asset.description}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}

export default function Markdown({ content }: { content: Content }) {
  const findInlineEntry = (id: number) =>
    content.links.entries.inline.find((item) => item.sys.id === id);
  const findBlock = (id: number) =>
    content.links?.entries.block.find((item) => item.sys.id === id);

  return documentToReactComponents(content.json, {
    renderText: (text) => {
      if (text === "") return;
      return text
        .split("\n")
        .reduce((children: ReactNode[], textSegment, index: number) => {
          return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
    },
    renderMark: {
      [MARKS.BOLD]: (text) => {
        return <span className="font-semibold">{text}</span>;
      },
      [MARKS.CODE]: (text) => {
        if (!text) return null;
        return (
          <code className="bg-[#e8e8e8] px-1 py-0.5 rounded text-[14.75px]">
            {text}
          </code>
        );
      },
      [MARKS.ITALIC]: (text) => {
        return <em className="italic pr-1">{text}</em>;
      },
      [MARKS.STRIKETHROUGH]: (text) => {
        return <span className="line-through">{text}</span>;
      },
      [MARKS.UNDERLINE]: (text) => {
        return <span className="underline">{text}</span>;
      },
      [MARKS.SUPERSCRIPT]: (text) => {
        return <code className={`rounded`}>{text}</code>;
      },
      [MARKS.SUBSCRIPT]: (text) => {
        return <span className="align-sub">{text}</span>;
      },
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
      [BLOCKS.PARAGRAPH]: (_, children: ReactNode[]) => {
        return (
          <div className="paragraph w-[96%] lg:w-full  mx-auto py-1.5 lg:py-2 leading-6 text-text">
            {children}
          </div>
        );
      },
      [BLOCKS.HEADING_1]: (_, children: ReactNode[]) => {
        return (
          <h1 className="w-[96%] lg:w-full  mx-auto text-3xl font-semibold leading-8 py-2 pt-8 lg:pt-6">
            {children}
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (_, children: ReactNode[]) => {
        return (
          <h2 className="w-[96%] lg:w-full  mx-auto text-2xl font-semibold leading-8 py-1.5 pt-8 lg:pt-6">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (_, children: ReactNode[]) => {
        return (
          <h3 className="w-[96%] lg:w-full  mx-auto text-xl leading-7 py-2 pt-8">
            {children}
          </h3>
        );
      },
      [BLOCKS.UL_LIST]: (_, children: ReactNode[]) => {
        return (
          <ul className="w-[96%] lg:w-full  mx-auto list-disc pl-5 lg:pl-7 py-1.5 lg:py-3 leading-6">
            {children}
          </ul>
        );
      },
      [BLOCKS.OL_LIST]: (_, children: ReactNode[]) => {
        return (
          <ol className="w-full  mx-auto list-decimal pl-5 lg:pl-7 py-1.5 lg:py-3 leading-6">
            {children}
          </ol>
        );
      },
      [BLOCKS.LIST_ITEM]: (_, children: ReactNode[]) => {
        return (
          <li className="w-[96%] lg:w-full  mx-auto leading-6 ">{children}</li>
        );
      },
      [BLOCKS.QUOTE]: (_, children: ReactNode[]) => {
        return (
          <blockquote className="w-[96%] lg:w-full  mx-auto my-6  bg-lightGray px-6 border-l-[3px] border-text rounded-r-md py-6 text-text text-base leading-6">
            {children}
          </blockquote>
        );
      },
      [BLOCKS.HR]: () => {
        return (
          <hr className="w-full lg:w-full  mx-auto border-lightGray bg-lightGray h-0.5 my-8" />
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const assets = findBlock(node.data.target.sys.id);

        if (!assets) return null;

        return (
          <figure className="flex w-full gap-4 mb-4 justify-center">
            {assets.imagesCollection.items.map((asset) => (
              <div key={asset.url} className="flex-grow my-1">
                <OptmzImage
                  src={asset.url}
                  width={asset.width || 800}
                  height={asset.height || 800}
                  alt={asset.description || asset.title}
                  className="max-h-[750px] w-full object-contain rounded duration-700 ease-in-out scale-100 blur-0 grayscale-0 hover:scale-[1.02]"
                />
                {assets.description && (
                  <figcaption className="text-sm tracking-wide text-gray-400 text-center pt-2">
                    {assets.description}
                  </figcaption>
                )}
              </div>
            ))}
          </figure>
        );
      },
      [BLOCKS.EMBEDDED_RESOURCE]: () => {
        alert("ddddd");
        return "ddddd\n";
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entry = findInlineEntry(node.data.target.sys.id);

        switch (entry.__typename) {
          case "Tweet": {
            return (
              <div className="mx-auto w-fit">
                <Tweet id={entry.url} />
              </div>
            );
          }
          case "Youtube": {
            return (
              <div className="youtube-embed">
                <YouTubeEmbed videoid={entry.url} params="controls=0" />
              </div>
            );
          }
          case "Code": {
            return (
              <pre className="w-[96%] lg:w-full  mx-auto text-[15px] mt-2 my-4">
                <code className={`rounded language-${entry.language}`}>
                  {entry.code}
                </code>
              </pre>
            );
          }
        }
      },
      [INLINES.EMBEDDED_RESOURCE]: () => {
        alert("eeeee");
        return "eeeee\n";
      },
      [INLINES.HYPERLINK]: (node, children: ReactNode[]) => {
        return (
          <Link
            href={node.data.uri}
            className="text-primary break-words underline underline-offset-2 font-medium"
            target={
              !node.data.uri.includes(
                typeof window !== "undefined" && window.location.origin,
              )
                ? "_blank"
                : "_self"
            }
          >
            {children}
          </Link>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: () => {
        alert("wwww");
        return "wwwww\n";
      },
      [INLINES.ASSET_HYPERLINK]: () => {
        alert("aaaa");
        return "aaaa\n";
      },
      [INLINES.RESOURCE_HYPERLINK]: () => {
        alert("vvvv");
        return "vvvvvv\n";
      },
    },
  });
}
