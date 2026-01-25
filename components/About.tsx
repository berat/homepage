"use client";

import { SOCIAL_ITEMS } from "@/constants/config";
import { messages } from "@/lib/i18n";
import Image from "next/image";
import { memo } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/lib/helpers";

const About = () => {
  const pathname = usePathname();

  const locale = getLocaleFromPath(pathname);

  const texts = messages[locale];
  return (
    <section id="about" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Image
          src="/profile.jpg"
          alt="Berat Bozkurt"
          width={60}
          height={60}
          className="rounded-full"
          quality={100}
        />
        <h1 className="text-2xl text-primary font-bold">Berat Bozkurt</h1>
      </div>
      <h2 className="text-description text-xl md:text-2xl font-semibold md:max-w-142.5" dangerouslySetInnerHTML={{__html: texts.about()}}>
      </h2>
      <div className="flex gap-5 items-center mb-2.5">
        {SOCIAL_ITEMS.map((item) => (
          <a
            key={item.value as string}
            href={item.url as string}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 flex items-center  "
          >
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default memo(About);
