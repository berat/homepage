import React from "react";
import { draftMode } from "next/headers";

import { ProjectDetailType, ProjectType } from "@/models/project";

import { getAllProjects, getProjectAndMoreProjects } from "@/actions/project";
import { updateViewAndLike } from "@/actions/viewLike";

import ProjectCard from "../cards/project";
import ProjectDetailView from "../view/project";

type Props = {
  data: ProjectType[];
  isTurkish?: boolean;
};

type GroupedData = Record<string, ProjectType[]>;
const statusDescription = {
  "Şu an": {
    turkish: {
      title: "Şu an",
      desc: "Bugünlerde çalıştığım projeler.",
    },
    english: {
      title: "Now",
      desc: "Projects I'm working on these days.",
    },
  },
  Gelecek: {
    turkish: {
      desc: "Aklımda olup ama henüz geliştirmeye zamanım olmayan projeler.",
      title: "Gelecek",
    },
    english: {
      desc: "Projects that are on my mind but I haven't had time to develop yet.",
      title: "Future",
    },
  },
  Geçmiş: {
    turkish: {
      desc: "Bir zamanlar bu projeleri yapmıştım, hey gidi günler!",
      title: "Geçmiş",
    },
    english: {
      desc: "I used to make these projects, those were the days!",
      title: "Past",
    },
  },
};

const ProjectList: React.FC<Props> = async ({ data, isTurkish = true }) => {
  const statusOrder = ["Şu an", "Gelecek", "Geçmiş"];

  const sortedGroups = data?.reduce((acc: GroupedData, item: ProjectType) => {
    const { status } = item;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(item);
    return acc;
  }, {});

  const orderedGroups = statusOrder.reduce(
    (acc: GroupedData, status: string) => {
      if (sortedGroups[status]) {
        acc[status] = sortedGroups[status];
      }
      return acc;
    },
    {},
  );

  return Object.keys(orderedGroups)
    .sort((a: string, b: string) => Number(b) - Number(a))
    .map((key: string) => (
      <ul key={key} className="w-full my-4 block">
        <h3 className="text-2xl text-black font-semibold dark:text-darkText">
          {isTurkish ? key : statusDescription[key]?.english.title}
        </h3>
        <span className="text-sm mb-3 inline-block text-slate-500 opacity-70 dark:text-darkText">
          {isTurkish
            ? statusDescription[key].turkish.desc
            : statusDescription[key]?.english.desc}
        </span>
        <div className={"flex gap-4 flex-wrap"}>
          {orderedGroups[key].map((post: ProjectType) => (
            <ProjectCard key={post.slug} post={post} isTurkish={isTurkish} />
          ))}
        </div>
      </ul>
    ));
};

const ProjectContent = async ({
  isTurkish = true,
}: {
  isTurkish?: boolean;
}) => {
  const { isEnabled } = await draftMode();
  const allProjects = await getAllProjects(100, isEnabled, isTurkish);

  await updateViewAndLike("page", isTurkish ? "" : "en/" + "projects", "views");

  return (
    <div className={"flex gap-4 flex-col pb-2 items-start "}>
      <ProjectList data={allProjects} isTurkish={isTurkish} />
    </div>
  );
};

export const ProjectDetail = async ({
  slug,
  isTurkish = true,
}: {
  isTurkish?: boolean;
  slug: string;
}) => {
  const { isEnabled } = await draftMode();
  const { project } = await getProjectAndMoreProjects(
    slug,
    isEnabled,
    isTurkish,
  );

  if (typeof project === "boolean") {
    return null;
  }

  const updateView = async () => {
    "use server";
    await updateViewAndLike(
      "project",
      (isTurkish ? "" : "en/") + slug,
      "views",
    );
  };

  return (
    <ProjectDetailView
      post={project as ProjectDetailType}
      updateView={updateView}
      isTurkish={isTurkish}
    />
  );
};

export default ProjectContent;
