import { MarketsModalFilterProps } from './MarketsModalFilter.props';
import { REGIONS } from 'common/consts';
import { map } from 'lodash';
import cn from 'classnames';
import RegionCheckbox from '../RegionCheckbox';

const MarketsModalFilterView: React.FC<MarketsModalFilterProps> = (
  props: MarketsModalFilterProps
) => {
  return (
    <>
      <div
        className={cn(
          'absolute cursor-pointer w-full h-full bg-[#343741E5] block'
        )}
        onClick={() => props.setShowModal(false)}
      ></div>
      <div
        className={cn(
          'inset-x-0 absolute flex flex-col rounded-2xl mx-auto w-[70%] markets-modal py-8 items-center top-24 3xl:top-32 4xl:top-36 animate__animated animate__slideInDown'
        )}
      >
        <div className="absolute block h-full w-full rounded-2xl top-0 modal-background z-1"></div>
        <h2 className="self-center font-din2014 text-[21px] text-[#DDDDDD] mb-2">
          FILTERS
        </h2>
        <div className="flex flex-col w-3/4 items-center z-10">
          <div className="flex-flex-col w-3/4 py-3 3xl:py-5 4xl:py-8">
            <span className="flex-1 text-white">Region</span>
            <div className="flex flex-row w-full gap-x-3 mt-4">
              {map(REGIONS, (region) => {
                return (
                  <RegionCheckbox
                    region={region}
                    addToRef={props.addToRegionsRefs}
                    defaultChecked={props.selectedRegions.includes(
                      region.value
                    )}
                    key={region.name}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-full py-2 3xl:py-4 4xl:py-7 border-t border-[#A6A8AC] items-center">
            <select
              name="sector"
              className="prism-scrollbar about-scrollbar markets-new-dropdown mx-auto mb-0 w-full text-white"
              value={props.tempSector || ''}
              onChange={(e) => {
                e.target.value === ''
                  ? props.setTempSector(null)
                  : props.setTempSector(e.target.value);
              }}
            >
              <option value="">Sector</option>
              {props.sectors.map((sector) => (
                <option value={sector} key={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full py-2 3xl:py-4 4xl:py-7 border-t border-[#A6A8AC] items-center mb-5">
            <select
              name="industry"
              className="prism-scrollbar about-scrollbar markets-new-dropdown mx-auto mb-0 w-full text-white"
              value={props.tempIndustry || ''}
              onChange={(e) => {
                e.target.value === ''
                  ? props.setTempIndustry(null)
                  : props.setTempIndustry(e.target.value);
              }}
            >
              <option value="">Industry</option>
              {props.industries.map((industry) => (
                <option value={industry} key={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <button
            className="filter-btn text-white w-28 text-sm py-2 px-3 tracking-[.2em] border border-solid border-[#e5e5e530]"
            onClick={props.onFilter}
          >
            FILTER
          </button>
        </div>
      </div>
    </>
  );
};

export default MarketsModalFilterView;
