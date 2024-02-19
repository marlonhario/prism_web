import cn from 'classnames';

export const setStrategyTitle = (growthTitleName) => {
  return (
    <>
      <label>{growthTitleName}</label>
      <span className={cn("inline-flex items-center ml-1.5 justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded", [growthTitleName])}>ETA</span>
    </>
  )
}