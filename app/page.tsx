import About from "@/components/About";
import SectionTitle from "@/components/base/Title";
import ListItem from "@/components/base/List";
import Image from "next/image";

const LIST = [
  {
    title: "Writings",
    caption: "Notes and other things which are I wrote",
    url: "/blog",
  },
  {
    title: "Dreamary",
    caption: "AI dream journal with analysis",
    url: "https://dreamary.burakbozkurt.com",
  },
  {
    title: "Memoque",
    caption: "Learn vocabulary with flashcards",
    url: "https://memoque.burakbozkurt.com",
  },
  {
    title: "Tools",
    caption: "My daily digital and professional tools list",
    url: "/tools",
  },
];

const WORKS = [
  {
    title: "OSF Digital",
    caption: "Lead Frontend Developer",
    date: "Dec 2021 - Current",
    image: "/works/osf.png",
  },
  {
    title: "Bigdata Technology",
    caption: "Frontend Developer",
    date: "Sep 2020 - Nov 2021",
    image: "/works/bigdata.png",
  },
  {
    title: "Davetiyem",
    caption: "Founder",
    date: "Jan 2019 - Sep 2020",
    image: "/works/davetiyem.png",
  },
];

const PHOTOS = [
  "/photos/photos-1.jpg",
  "/photos/photos-2.jpg",
  "/photos/photos-3.jpg",
];

export default function Home() {
  return (
    <div id="home" className="max-w-2xl mx-auto my-16 flex flex-col gap-10">
      <About />
      <section id="projects" className="flex flex-col gap-3.5">
        <SectionTitle title="Projects" />
        <ul className="flex flex-col gap-2.5">
          {LIST.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              caption={item.caption}
              url={item.url}
            />
          ))}
        </ul>
      </section>
      <section id="works" className="flex flex-col gap-3.5">
        <SectionTitle title="Works" />
        <ul className="flex flex-col gap-2.5">
          {WORKS.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              caption={item.caption}
              image={item.image}
              date={item.date}
            />
          ))}
        </ul>
      </section>
      <section id="photos" className="flex flex-col gap-3.5">
        <SectionTitle title="Photos" />
        <ul className="flex gap-[20.5px]">
          {PHOTOS.map((item) => (
            <Image
              key={item}
              src={item}
              alt="Photo"
              width={210}
              height={250}
              className="rounded-md object-cover"
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
