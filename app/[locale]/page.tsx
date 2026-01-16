import About from "@/components/About";
import SectionTitle from "@/components/base/Title";
import ListItem from "@/components/base/List";
import Image from "next/image";
import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import Zoom from "react-medium-image-zoom";

const PHOTOS = [
  "/photos/photos-1.jpg",
  "/photos/photos-2.jpg",
  "/photos/photos-3.jpg",
];

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;

  const texts = await messages[locale];

  const LIST = [
    {
      title: texts.writings,
      caption: texts.captions.writings,
      url: "/blog",
    },
    {
      title: "Dreamary",
      caption: texts.captions.dreamary,
      url: "https://dreamary.burakbozkurt.com",
    },
    {
      title: "Memoque",
      caption: texts.captions.memoque,
      url: "https://memoque.burakbozkurt.com",
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
    <div id="home" className="max-w-[85%] md:max-w-2xl mx-auto my-16 flex flex-col gap-10">
      <About />
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
          {PHOTOS.map((item) => (
            <Zoom zoomMargin={45} key={item}>
              <Image
                src={item}
                alt="Photo"
                width={210}
                height={250}
                className="w-full md:w-[52.5] rounded-md object-cover"
              />
            </Zoom>
          ))}
        </ul>
      </section>
    </div>
  );
}
