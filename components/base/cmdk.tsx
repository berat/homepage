"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  useKBar,
  useMatches,
} from "kbar";

import ArrowRight from "@/public/icons/arrow-right.svg";

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        const className = classNames({
          "cmdk-item": true,
          "cmdk-item-active": active,
        });
        return typeof item === "string" ? (
          <div className="cmdk-group-name">{item}</div>
        ) : (
          <div className={`cmdk-item-wrapper`}>
            <div className={className}>
              {item.icon && item.icon}
              <div className="cmdk-item-name">
                <span>{item.name}</span>
                {active && (
                  <Image src={ArrowRight} alt="back" width={21} height={21} />
                )}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

const CommandMenu = () => {
  const { visualState } = useKBar((state) => state);

  useEffect(() => {
    if (visualState === "showing") {
      document.querySelector("html").style.overflow = "hidden";
    }
    if (visualState === "hidden") {
      document.querySelector("html").style.overflow = "auto";
    }
  }, [visualState]);

  return (
    <KBarPortal>
      <KBarPositioner className="cmdk-positioner">
        <KBarAnimator className="cmdk-animator">
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default CommandMenu;
