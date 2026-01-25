import About from "@/components/About";
import SectionTitle from "@/components/base/Title";
import ListItem from "@/components/base/List";
import Image from "next/image";
import { getWritingDatabaseItems, Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import Zoom from "react-medium-image-zoom";
import { getPhotos } from "@/lib/unsplash";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";
import { getAllWritingPosts } from "@/lib/blog";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;
  const photoData = await getPhotos(3);
  const { items: posts } = await getWritingDatabaseItems(locale, undefined, 5);

  const texts = await messages[locale];

  const LIST = [
    {
      title: texts.writings,
      caption: texts.captions.writings,
      url: "/blog",
    },
    {
      title: "Photos",
      caption: texts.captions.photos,
      url: "/photos",
    },
    {
      title: "Dreamary",
      caption: texts.captions.dreamary,
      url: "https://dreamary.netlify.app",
    },
    {
      title: "Memoque",
      caption: texts.captions.memoque,
      url: "https://memoque.netlify.app",
    },
    // {
    //   title: "Tools",
    //   caption: "My daily digital and professional tools list",
    //   url: "/tools",
    // },
  ];

  const WORKS = [
    {
      title: "OSF Digital",
      caption: "Lead Frontend Developer",
      date: texts.dates.osf,
      image: "/works/osf.png",
    },
    {
      title: "Bigdata Technology",
      caption: "Frontend Developer",
      date: texts.dates.bigdata,
      image: "/works/bigdata.png",
    },
    {
      title: "Davetiyem",
      caption: "Founder",
      date: texts.dates.davetiyem,
      image: "/works/davetiyem.png",
    },
  ];

  return (
    <div
      id="home"
      className="max-w-[85%] md:max-w-2xl mx-auto my-16 flex flex-col gap-10"
    >
      <About />
      <section id="writings" className="flex flex-col gap-3.5">
        <SectionTitle title={texts.writings} path={`/${locale}/blog`} />
        <ul className="flex flex-col gap-2.5">
          {posts.map((post) => {
            return (
              <ListItem
                key={post.id}
                title={post.title}
                url={`/${locale}/blog/${post.slug}`}
              />
            );
          })}
        </ul>
      </section>
      <section id="projects" className="flex flex-col gap-3.5">
        <SectionTitle title={texts.projects} />
        <ul className="flex flex-col gap-2.5">
          {LIST.map((item) => {
            return (
              <ListItem
                key={item.title}
                title={item.title}
                caption={item.caption}
                url={
                  item.url.startsWith("http")
                    ? item.url
                    : "/" + locale + item.url
                }
              />
            );
          })}
        </ul>
      </section>
      <section id="works" className="flex flex-col gap-3.5">
        <SectionTitle title={texts.works} />
        <ul className="flex flex-col gap-2.5">
          {WORKS.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              isProject
              caption={item.caption}
              image={item.image}
              date={item.date}
            />
          ))}
        </ul>
      </section>
      <section id="photos" className="flex flex-col gap-3.5">
        <SectionTitle title={texts.photos} />
        <ul className="flex md:flex-row flex-col gap-[20.5px]">
          {photoData.map(
            (data: {
              id: Key | null | undefined;
              urls: { full: string | StaticImport };
              alt_description: string;
            }) => (
              <Zoom zoomMargin={45} key={data.id}>
                <Image
                  src={data.urls.full}
                  alt={data.alt_description ?? ""}
                  width={210}
                  height={250}
                  className="w-full md:min-w-52 rounded-md object-cover"
                />
              </Zoom>
            ),
          )}
        </ul>
      </section>
    </div>
  );
}
