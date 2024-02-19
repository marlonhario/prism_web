import AlevDover from 'assets/images/alev-dover.png';
import BillIreland from 'assets/images/bill-ireland.png';
import ChristopherIreland from 'assets/images/christopher-ireland.png';
import { Director } from 'common/interfaces';

const DIRECTORS: Director[] = [
  {
    name: 'Alev Dover',
    position: 'CEO',
    imageSource: AlevDover,
    zIndex: 3,
    summary: (
      <>
        <p className="font-light mb-4">
          <span className="font-semibold">
            Previously, Head of Equity Finance at FinClear. Alev created a new paradigm in the way institutions, SMSFs and sophisticated investors interact with each other, allowing wholesale holders of equities to lend directly to other wholesale investors.
          </span>{' '}
          This bypassed traditional barriers, opening the market to more participants and a much wider universe of equities. Prior to this Alev was Vice President at Citigroup. Alev has worked in financial markets for over 25 years and was recently a Finalist in "Innovator of the Year Award 2020" and "Women in Finance – Investment Professional of the Year Award 2019". Alev became CEO of Prism in 2021.
        </p>
        {/* <p className="font-light mb-0">
          Alev was recognised for her achievements and became a finalist in the
          2020 Australian Business Awards “Innovator of the Year” and named
          Australian Women In Finance “Investment Professional Of The Year” in
          2019. Alev, together with Bill Ireland, have been instrumental in
          raising AUD $40 million to fund the current Prism Global Group
          concept.
        </p> */}
      </>
    ),
  },
  {
    name: 'Bill Ireland',
    position: 'Chairman',
    imageSource: BillIreland,
    zIndex: 2,
    summary: (
      <>
        <p className="font-light mb-4">
          <span className="font-semibold">
            Bill has over 50 years’ experience in financial markets. Launching Challenger International (“Challenger”) in 1986, Bill was the Chief Executive Officer of Challenger for over 16 years and created an array of innovative financial products across equity and property markets.
          </span>{' '}
          In 2003 Challenger merged with a Consolidated Press Holdings Group. Bill subsequently became Managing Director of Mariner Corporation Limited (“Mariner”). Mariner established a number of funds specifically targeting renewable, pipeline and property assets. Bill subsequently founded Prism in 2018. The genesis of the Prism concept was a series of institutional OTC transactions successfully undertaken by Challenger during the 1990’s.
        </p>
        {/* <p className="font-light mb-4">
          Challenger’s portfolio grew further with the development of the Howard
          Mortgage Trust, the largest mortgage fund in Australia, which raised
          over AUD $2.1 billion in subscriptions. In 2002, Challenger was
          recognised as the fastest growing ASX-listed company for the decade
          1990-2000, with compound growth in market capitalisation of almost 60
          per cent. per annum, and in 2003 merged with a Consolidated Press
          Holdings Group (“CPH”) subsidiary, with a market capitalisation of AUD
          $930 million. Bill subsequently became Managing Director of Mariner
          Corporation Limited (“Mariner”), an ASX listed business from 2003 to
          2010. Mariner established a number of funds specifically targeting
          renewable, pipeline and property assets with significant levels of
          AUM.
        </p>
        <p className="font-light mb-0">
          Bill subsequently founded Prism Global Group and was appointed to the
          board in 2018. The genesis of the Prism Global Group concept was a
          series of institutional transactions successfully undertaken by
          Challenger during the 1990’s. Bill, together with Alev Dover, have
          been instrumental in raising AUD $40 million to fund the current Prism
          Global Group concept.
        </p> */}
      </>
    ),
  },
  {
    name: 'Christopher Ireland',
    position: 'Executive Director',
    imageSource: ChristopherIreland,
    zIndex: 1,
    summary: (
      <>
        <p className="font-semibold mb-4">
          14 years financial market experience with a background in structured products. Christopher began his career as an intern at Mariner Corporation in late 2008, during the midst of the global financial crisis.
        </p>
        <p className="font-light mb-4">
          Following his departure from Mariner, Christopher consulted to the Australian Corporate Bond Company, a retail fixed income platform. Christopher then joined Voyager Partners, a boutique financial consultant structuring bespoke financing solutions for infrastructure and property projects, before establishing Prism.
        </p>
        {/* <p className="font-light mb-0">
          Christopher has a keen interest in economics and natural system
          design.
        </p> */}
      </>
    ),
  },
];

export default DIRECTORS;
