import React, { useRef } from "react";
import clsx from "classnames";

import AccelerateGrowth from "./AccelerateGrowth.article";
import AmplifiedYield from "./AmplifiedYield.article";
import ShareCapitalRelease from "./ShareCapitalRelease.article";
import BearMarketOutlook from "./BearMarketOutlook.article";
import BullMarketStrategy from "./BullMarketStrategy.article";
import EstatePlanning from "./EstatePlanning.article";
import NextGenInvestors from "./NextGenInvestors.article";
import OverseasInvestors from "./OverseasInvestors.article";
import RiskMitigation from "./RiskMitigation.article";
import StrategicAdvantage from "./StrategicAdvantage.article";
import AccessLiquidity from "./AccessLiquidity.article";
import Fees from "./Fees.article";

const PAGE_CONTENTS = [
  {
    name: "Core Strategies",
    articles: [
      { name: "Accelerate Growth", element: AccelerateGrowth },
      { name: "Amplified Yield", element: AmplifiedYield },
      { name: "Share Capital Release", element: ShareCapitalRelease },
    ],
  },
  {
    name: "Bear & Bull",
    articles: [
      { name: "Bear Market Outlook", element: BearMarketOutlook },
      { name: "Bull Market Strategy", element: BullMarketStrategy },
    ],
  },
  {
    name: "Use Cases",
    articles: [
      { name: "Estate Planning", element: EstatePlanning },
      { name: "Next Gen Investors", element: NextGenInvestors },
      { name: "Overseas Investors", element: OverseasInvestors },
      { name: "Risk Mitigation", element: RiskMitigation },
      { name: "Institutional Investor", element: StrategicAdvantage },
      { name: "Access To Liquidity", element: AccessLiquidity },
    ],
  },
];

const StrategiesView: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pageContents = PAGE_CONTENTS.map((p: any) => ({
    ...p,
    className: p.name?.replace(/\s/g, '').toLowerCase(),
    articles: p.articles.map((a: any) => ({
      ...a,
      className: a.name?.replace(/\s/g, '').toLowerCase(),
    })),
  }));

  const handleScrollIntoView =
    (name: string) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();

      if (parentRef && parentRef.current) {
        const articles = parentRef.current?.getElementsByClassName(name);
        if (articles) {
          articles[0].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }
    };

  const handleMouseOver = (name: string, article: string) => () => {
    const p = menuRef.current?.getElementsByClassName(name);
    if (p) p[0].textContent = article;
  }

  const handleMouseOut = (name: string) => () => {
    const p = menuRef.current?.getElementsByClassName(name);
    if (p) p[0].textContent = '';
  }

  return (
    <div ref={parentRef} className={clsx('strategies-article flex flex-col h-full font-din2014', className)}>
      <div className="mt-9">
        <div className="mx-10">
          <h2>Strategies</h2>
          <div className="faded-divider mt-5 mb-4 mx-auto" />
        </div>
        <div ref={menuRef} className="m-auto flex w-auto justify-center max-w-2xl">
          {pageContents.map((page, index: number) => {
            const lastIndex = (index + 1) < pageContents.length;
            return (
              <div key={page.name} className="relative h-15 flex flex-col justify-center">
                <p className="mb-1 text-xxs font-semibold text-center uppercase">{page?.name}</p>
                <div className="px-2 border-gray-300" style={{ borderRightWidth: lastIndex ? '1px' : 0 }}>
                  <div className="pt-1 pb-2 flex justify-center gap-x-1">
                    {page.articles.map((article: any) => (
                      // eslint-disable-next-line jsx-a11y/anchor-has-content
                      <a
                        key={`${article.className}-scroll`}
                        href={article.className}
                        className="block rounded-full bg-gray-300 border-2 border-gray-300 hover:border-gray-400"
                        style={{ minWidth: 36, minHeight: 36 }}
                        onClick={handleScrollIntoView(article.className)}
                        onMouseOver={handleMouseOver(page.className, article.name)}
                        onMouseOut={handleMouseOut(page.className)}
                      />
                    ))}
                  </div>
                </div>
                <p className={clsx('absolute top-14 pt-2 w-full text-xxs font-semibold leading-3 text-center uppercase', page.className)} />
              </div>
            )
          })}
        </div>
      </div>
      <div
        className="flex-grow mt-10 mb-4 mx-6 px-8 overflow-y-auto prism-scrollbar rtl"
      >
        <article className="w-full ltr">
          {pageContents.map((page) => {
            return page.articles.map((article: any) =>
              React.createElement(article.element, {
                key: article.name,
                className: `${article.className} mb-10`,
              })
            );
          })}
          <Fees />
        </article>
      </div>
    </div>
  );
};

export default StrategiesView;
