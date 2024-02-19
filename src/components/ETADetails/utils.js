// import playIcon from '../../images/playIcon.png';

export const PureDiv = <div className="px-8 py-8">
<p>PureDiv  ETA  investors  are  entitled  to  receive  all  dividend  distributions  from  the  underlying  share during the term of the ETA, however do not participate in any capital appreciation.</p>
<p>PureDiv  ETAs  share  the  same  capital  risk  profile  with  that  of  the  PureGrowth  ETA  and  participate equally if the market price of the underlying share has fallen at maturity.</p>
<p>PureDiv ETAs can be deployed across single stock or Index strategies.</p>
<p>Bought like a share and traded like a share, PureDiv ETAs can be traded on the stock exchange at any time throughout their 10-year duration.</p>
<p>At maturity, PureDiv ETAs can be converted to the underlying stock or elect to receive a return of capital.</p>
</div>

export const PureGrowth = <div className="px-8 py-8">
<p>PureGrowth ETAs are entitled to the capital appreciation of the underlying security during the term of the ETA, however do not receive any dividends distributions.</p>
<p>PureGrowth  ETAs  share  the  same  capital  risk  profile  with  that  of  the  PureDiv  ETA  and  participate equally if the market price of the underlying share has fallen at maturity.</p>
<p>PureGrowth ETAs can be deployed across single stock or Index strategies.</p>
<p>Bought like a share and traded like a share, PureGrowth ETAs can be traded on the stock exchange at any time throughout their 10-year duration.</p>
<p>At maturity, PureGrowth ETAs can be converted to the underlying stock or elect to receive a capital return.</p>
</div>

export const MaxDiv = <div className="px-8 py-8">
<p>MaxDiv  ETAs  are  entitled  to  receive  all  dividend  distributions  from  the  underlying  share  during  the term of the ETA, however do not participate in any capital appreciation.</p>
<p>MaxDiv  ETAs  have  full  capital  exposure  if  the  market  price  of  the  underlying  share  has  fallen  at maturity. This full capital exposure results from the pairing with the GrowthGuard ETA which benefits from a guarded 2nd capital exposure.</p>
<p>MaxDiv ETAs can be deployed across single stock or Index strategies.</p>
<p>Bought like a share and traded like a share, MaxDiv ETAs can be traded on the stock exchange at any time throughout their 10-year duration.</p>
<p>At maturity, MaxDiv ETAs can be converted to the underlying stock or elect to receive a return of capital.</p>
</div>

export const MaxGrowth = <div className="px-8 py-8">
<p>MaxGrowth ETAs are entitled to the capital appreciation of the underlying share during the term of the ETA, however do not receive any dividends distributions.</p>
<p>MaxGrowth ETAs have full capital exposure if the market price of the underlying share has fallen at maturity. This full capital exposure results from the pairing with the DivGuard ETA which benefits from a guarded 2nd capital exposure.</p>
<p>MaxGrowth ETAs can be deployed across single stock or Index strategies.</p>
<p>Bought like a share and traded like a share, MaxGrowth ETAs can be traded on the stock exchange at any time throughout their 10-year duration.</p>
<p>At maturity, MaxGrowth ETAs can be converted to the underlying stock or elect to receive a capital return.</p>
</div>

export const GrowthGuard = <div className="px-8 py-8">
<p>GrowthGuard ETAs are entitled to the capital appreciation of the underlying share during the term of the ETA, however do not receive any dividends distributions.</p>
<p>GrowthGuard  ETAs  have  a  portion  of  their  capital  guarded  against  a  fall  in  the  market  price  of  the underlying share at maturity. This 2nd capital exposure results from the pairing with the MaxDiv ETA which undertakes full capital exposure.</p>
<p>GrowthGuard ETAs can be deployed across single stock or Index strategies.</p>
<p>Bought like a share and traded like a share, GrowthGuard ETAs can be traded on the stock exchange at any time throughout their 10-year duration.</p>
<p>At maturity, GrowthGuard ETAs can be converted to the underlying stock or elect to receive a capital return.</p>
</div>

export const DivGuard = <div className="px-8 py-8">
<p>DivGuard ETAs receive all dividend distributions from the underlying listed security during the term of the ETA, however do not participate in any capital appreciation.</p>
<p>As a result of pairing with the MaxGrowth ETA, which undertakes full capital exposure, DivGuard ETAs have  a  portion  of  their  capital  guarded  against  a  fall  in  the  market  price  of  the  underlying  share  at maturity.</p>
<p>DivGuard ETAs can be deployed across single stock or Index strategies.</p>
<p>Bought like a share and traded like a share, DivGuard ETAs can be traded on the stock exchange at any time throughout their 10-year duration.</p>
<p>At maturity, DivGuard ETAs can be converted to the underlying stock or elect to receive a return of capital.</p>
</div>

/* Helps to show fields in ETA details for ETA type - growth */
export const growthEtaProfile = [
    {
        label: 'MaxGrowth',
        valueAllocation: 'Price growth only',
        capitalExposure: '1st capital exposure',
        type: 'blue spectrum',
        etaPartner: 'DivGuard'
    },
    {
        label: 'PureGrowth',
        valueAllocation: 'Price growth only',
        capitalExposure: 'Shared',
        type: 'green spectrum',
        etaPartner: 'PureDiv'
    },
    {
        label: 'GrowthGuard',
        valueAllocation: 'Price growth only',
        capitalExposure: '2nd capital exposure',
        type: 'red spectrum',
        etaPartner: 'MaxDiv'
    }
]

/* Help to show fields in ETA details for ETA type - income */
export const incomeEtaProfile = [
    {
        label: 'MaxDiv',
        valueAllocation: 'Dividends only',
        capitalExposure: '1st capital exposure',
        type: 'red spectrum',
        etaPartner: 'GrowthGuard'
    },
    {
        label: 'PureDiv',
        valueAllocation: 'Dividends only',
      capitalExposure: 'shared',
        type: 'green spectrum',
        etaPartner: 'PureGrowth'
    },
    {
        label: 'DivGuard',
        valueAllocation: 'Dividends only',
        capitalExposure: '2nd capital exposure',
        type: 'blue spectrum',
        etaPartner: 'MaxGrowth'
    }
]

/* helps to retrieve active ETA profile for ETA details page*/
export const activeEtaProfile = (etaType , etalabel) =>{
    let activeEtaContent = '';
    const profileContent = etalabel.toLowerCase() === 'growth' ? growthEtaProfile : incomeEtaProfile ;
    profileContent.forEach(function (item) {
        if (item.label.toLowerCase() === etaType.toLowerCase()) {
            activeEtaContent= item;
            return ;
        }
    })
    return activeEtaContent;
}

export const newActiveEtaProfile = (etaType , etalabel) =>{
    let activeEtaContent = '';
    const profileContent = etalabel.toLowerCase() === 'growth' ? growthEtaProfile : incomeEtaProfile ;
    profileContent.forEach(function (item) {
        if (item.label.toLowerCase() === etaType.toLowerCase()) {
            activeEtaContent= item;
            return ;
        }
    })
    return activeEtaContent;
}