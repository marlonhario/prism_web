import React from 'react';
import clsx from 'classnames';

const LeveragePower = React.forwardRef(
  (
    {
      expanded,
      style = {},
      ...props
    }: { expanded: boolean } & React.HtmlHTMLAttributes<HTMLDivElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        style={{
          background:
            'linear-gradient(248.38deg, #E5E5E5 35.08%, #FDFDFD 96.48%)',
          ...style,
        }}
        {...props}
      >
        <div
          className={clsx(
            'flex',
            expanded ? 'flex-row gap-x-4' : 'flex-col py-7'
          )}
        >
          <div
            className={clsx('flex-1', expanded ? 'text-right' : 'text-left')}
          >
            <div>
              <h2>
                Leveraging the
                <br /> Power of
                <br /> Connection
              </h2>
              <p>
                <span className="font-bold">
                  Prism Leverage is a new form of natural,
                  <br /> long-term leverage.
                </span>
                <br />
                Powered by connecting two investor
                <br />
                strategies within a single underlying share,
                <br />
                Prism Leverage accelerates growth and
                <br />
                aplifies yield Without many of the inherent
                <br />
                risks of traditional, borrowed leverage.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div
              style={{ width: 280, height: 280, backgroundColor: '#97999E' }}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default LeveragePower;
