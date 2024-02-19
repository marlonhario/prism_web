import React, { ReactNode } from "react";
import { Checkbox } from "antd";

const FilterListView: React.FC<
  {
    items: { text: string; value: string | number }[];
    selectAll?: boolean;
    title: string;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ items, selectAll = false, title, ...props }) => {
  return (
    <div {...props}>
      <p className="mb-1">{title}</p>
      <div className="flex flex-col">
        {items.map((item, i) => {
          const isString = typeof item === "string";
          const value = isString ? item : item?.value;
          // const name = isString ? item : item?.name;
          return (
            <button className="market-check-option font-extrabold" key={i}>
              <div dangerouslySetInnerHTML={{ __html: item.text }} />
              <Checkbox
                key={value}
                value={value}
                checked
                style={{ marginLeft: 0 }}
                className="rounded "
                disabled
                // onChange={(e) => onChangeCheckBox(e, "DIVIDEND")}
              />
            </button>
          );
        })}
      </div>
      {selectAll && (
        <button
          type="button"
          className="mt-2 py-1 px-2 rounded bg-gray-700 text-white text-xs"
        >
          Select All
        </button>
      )}
    </div>
  );
};

export default FilterListView;
