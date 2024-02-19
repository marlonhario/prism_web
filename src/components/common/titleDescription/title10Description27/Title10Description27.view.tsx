import { FC } from 'react';
import { Title10DescriptionProps } from './Title10Description.props';

export const Title10Description27: FC<Title10DescriptionProps> = ({
  classes = '',
  title = '',
  title_class = '',
  description = '',
  description_class = ''
}) => {
  return (
    <div
      className={`Title10Description27-wrapper flex flex-col gap-2  ${classes}` }
    >
      <p className={`font-semibold text-xxs tracking-wider uppercase mb-0 ${title_class}`}>
        {title}
      </p>
      <p className={`font-light text-[27px] tracking-widest uppercase leading-none ${description_class}`}>
        {description}
      </p>
    </div>
  );
};
