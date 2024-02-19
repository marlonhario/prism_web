import React from 'react';

const Introduction: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (
  props
) => (
  <div {...props}>
    <div className="w-full max-w-lg">
      <div className="text-base text-white">Introducing</div>
      <h1 className="mt-2 mb-0 font-light text-white">
        Exchange Traded<br />
        Allocations <span className="font-bold">ETAs</span>
      </h1>
      <h3 className="font-light mb-8 text-white">The Next Evolution of Investing</h3>
    </div>
  </div>
);

export default Introduction;
