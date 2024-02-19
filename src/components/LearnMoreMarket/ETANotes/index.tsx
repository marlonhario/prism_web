import { useState } from 'react';
import classNames from 'classnames';

import './index.scss';

interface Props {
  selectedIndex: number;
  onSelectedIndexChange(index: number): void;
}

export function LearnMoreMarketETANotes({
  selectedIndex,
  onSelectedIndexChange
}: Props) {
  return (
    <div className={'learnmore-market-eta-notes'}>
      <div className={'learnmore-market-eta-notes-titles'}>
        <span
          className={classNames({
            active: selectedIndex === 0
          })}
          onClick={() => onSelectedIndexChange(0)}
        >
          OVERVIEW
        </span>

        <span
          className={classNames({
            active: selectedIndex === 1
          })}
          onClick={() => onSelectedIndexChange(1)}
        >
          TERM SHEET
        </span>

        <span
          className={classNames({
            active: selectedIndex === 2
          })}
          onClick={() => onSelectedIndexChange(2)}
        >
          PDS
        </span>

        <span
          className={classNames({
            active: selectedIndex === 3
          })}
          onClick={() => onSelectedIndexChange(3)}
        >
          HOW TO BUY
        </span>
      </div>

      <div className={'learnmore-market-eta-notes-panels'}>
        <div className={'learnmore-market-eta-notes-panel'}>
          <p>MaxGrowth ETAs are entitled to the capital appreciation of the underlying share during the term of the ETA, however do not receive any dividends distributions.</p>

          <br />

          <p>MaxGrowth ETAs have full capital exposure if the market price of the underlying share has fallen at maturity. This full capital exposure results from the pairing with the DivGuard ETA which benefits from a guarded 2nd capital exposure.</p>
        </div>
      </div>
    </div>
  );
}