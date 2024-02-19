import React from "react";
import "./styles.scss";
import backArrow from '../../images/backArrow.png';
import { PureDiv, PureGrowth, MaxDiv, MaxGrowth, GrowthGuard, DivGuard } from "./utils";

const ETADetails = ({
    etaType,
    etaProfile,
    onHandleBackButtonCallback
}) => {
  return (
    <div className="learnMore">
        <nav>
            <button type="button" className="backButton" onClick={() => onHandleBackButtonCallback()}><img src={backArrow} alt={'backArrow'} /> <span className="">back</span></button>
        </nav>
        <header className={`flex flex-col py-6 eta_header text-white ${etaType}`}>
            <div className="text-5xl text-center py-4">
                {etaType}
            </div>
            <div className="w-full flex flex-row py-4 spec text-center">
                <div className="w-1/4 flex-col">
                    <div className="text-black">VALUE ALLOCATION</div>
                    <div className="uppercase">{etaProfile.valueAllocation}</div>
                </div>
                <div className="w-1/4 flex-col">
                    <div className="text-black">RISK ALLOCATION</div>
                    <div className="uppercase">{etaProfile.capitalExposure}</div>
                </div>
                <div className="w-1/4 flex-col">
                    <div className="text-black">COLOUR PERSPECTIVE</div>
                    <div className="uppercase">{etaProfile.type}</div>
                </div>
                <div className="w-1/4 flex-col">
                    <div className="text-black">ETA PARTNER</div>
                    <div className="uppercase">{etaProfile.etaPartner}</div>
                </div>
            </div>
        </header>
        <div>
            {(etaType === 'PureDiv') && PureDiv }
            {(etaType === 'PureGrowth') && PureGrowth }
            {(etaType === 'MaxDiv') && MaxDiv }
            {(etaType === 'MaxGrowth') && MaxGrowth }
            {(etaType === 'GrowthGuard') && GrowthGuard }
            {(etaType === 'DivGuard') && DivGuard }
        </div>  
    </div>
  );
}

export default ETADetails;