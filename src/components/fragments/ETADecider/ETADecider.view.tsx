import React, { useEffect, useRef, useState } from "react";
import clsx from "classnames";

import { ETAColors, ETATypes } from "common/types";
import { InvestmentType, RiskProfile } from "common/enums";

const ETA_DETAILS = {
  [RiskProfile.MARKET]: {
    [InvestmentType.INCOME]: ["PureDiv"],
    [InvestmentType.GROWTH]: ["PureGrowth"],
  },
  [RiskProfile.AGGRESSIVE]: {
    [InvestmentType.INCOME]: ["MaxDiv", "PureDiv"],
    [InvestmentType.GROWTH]: ["MaxGrowth", "PureGrowth"],
  },
  [RiskProfile.CONSERVATIVE]: {
    [InvestmentType.INCOME]: ["DivGuard", "PureDiv"],
    [InvestmentType.GROWTH]: ["GrowthGuard", "PureGrowth"],
  },
};

const Button = ({
  active = null,
  children,
  className,
  eta = null,
  value = null,
  onSelect,
}: {
  active?: InvestmentType|RiskProfile|null,
  children: React.ReactChild;
  className?: string;
  eta?: ETATypes | null,
  value?: any;
  onSelect?: (num: number) => void;
}) => {
  const isActive = active !== null && value === active;
  const bgColor: ETAColors | null = eta ? `bg-${eta}` : null;
  return (
    <button
      className={clsx(
        "w-1/2 h-10 text-sm rounded",
        isActive ? 'border-2 border-gray-900 font-extrabold' : 'border border-gray-500',
        className || null,
        bgColor
      )}
      onClick={() => onSelect && onSelect(value || 0)}
    >
      {children}
    </button>
  );
};

const ETADeciderView: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [investmentType, setInvestmentType] = useState<InvestmentType | null>(
    null
  );
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [etaTypes, setEtaTypes] = useState<string[]>([]);

  const onChangeInvestment = (num: number) => {
    setInvestmentType(num as InvestmentType);
  };

  const onChangRisk = (num: number) => {
    setRiskProfile(num as RiskProfile);
  };

  const scrollToEtasResult = () => {
    if (parentRef && parentRef.current) {
      const elements = parentRef.current?.getElementsByClassName('etas-result');

      if (elements) {
        elements[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      }
    }
  }

  useEffect(() => {
    if (investmentType !== null && riskProfile !== null) {
      setEtaTypes(ETA_DETAILS[riskProfile][investmentType]);
      setTimeout(() => scrollToEtasResult(), 100);
    }
  }, [investmentType, riskProfile]);

  return (
    <div ref={parentRef} className={className}>
      <h3 className="mb-0 uppercase">ETA Decider</h3>
      <h4 className="mb-2 font-normal">
        Do you invest primarily for income or for growth?
      </h4>
      <p>
        Consider the purpose of your investment strategy <br />
        Is income essential to your ongoing cashflow requirements, or are you
        investing for the future?
      </p>
      <div className="max-w-xl m-auto">
        <div className="my-8 flex justify-between gap-x-8">
          <Button active={investmentType} value={InvestmentType.INCOME} onSelect={onChangeInvestment}>
            INCOME
          </Button>
          <Button active={investmentType} value={InvestmentType.GROWTH} onSelect={onChangeInvestment}>
            GROWTH
          </Button>
        </div>
      </div>
      <h4 className="mb-4 font-normal">
        How would you categorise your appetite to risk?
      </h4>
      <p className="mb-8">
        Consider the purpose of your investment strategy <br />
        Is income essential to your ongoing cashflow requirements, or are you
        investing for the future?
      </p>
      <div className="max-w-xl m-auto">
        <div className="my-4 flex justify-between items-center gap-x-4">
          <Button active={riskProfile} value={RiskProfile.MARKET} onSelect={onChangRisk}>
            MARKET
          </Button>
          <p className="mb-0">I only want to be exposed to market risk</p>
        </div>
        <div className="my-4 flex justify-between items-center gap-x-4">
          <Button active={riskProfile} value={RiskProfile.AGGRESSIVE} onSelect={onChangRisk}>
            AGGRESSIVE
          </Button>
          <p className="mb-0">I only want to be exposed to market risk</p>
        </div>
        <div className="my-4 flex justify-between items-center gap-x-4">
          <Button active={riskProfile} value={RiskProfile.CONSERVATIVE} onSelect={onChangRisk}>
            CONSERVATIVE
          </Button>
          <p className="mb-0">I only want to be exposed to market risk</p>
        </div>
      </div>
      <h4 className="mt-10 mb-4 font-normal">
        ETAs that may suit your investment strategy
      </h4>
      <div className="max-w-xl m-auto mb-4">
        <div className="flex justify-between items-center gap-x-4">
          {etaTypes.map((eta) => (
            <Button
              key={eta}
              className={clsx("border-none", "text-white")}
              eta={eta as ETATypes}
            >
              {`${eta} ETA`}
            </Button>
          ))}
          <div className="etas-result" />
        </div>
      </div>
    </div>
  );
};

export default ETADeciderView;
