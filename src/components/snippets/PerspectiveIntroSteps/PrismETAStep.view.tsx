import { FC, useContext } from 'react';
import { Button, Col, Row } from 'antd';
import { motion } from 'framer-motion';

import PerspectiveIntroCube from '../PerspectiveIntroCube';
import { MainContext } from 'context/MainContext';

interface Props {
  setShowIntro: (isShow: boolean) => void;
  setIsLastView: (isShow: boolean) => void;
}

const PrismETAStep: FC<Props> = ({ setShowIntro, setIsLastView }) => {
  const { expand: isEducationPanelExpanded } = useContext(MainContext);

  const styles = {
    wholeShare: {
      textShadow: '0px 0px 10px rgba(255, 255, 255, 0.65)',
    },
    centerAntd: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonAntd: {
      fontWeight: 200,
      fontSize: '33px',
      lineHeight: '2rem',
      color: '#fff',
      background: 'transparent',
      border: 'none',
    },
  };

  const inVariant = (delay: number) => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay,
        duration: 1,
      },
    },
  });

  const unlockVariant = inVariant(2);
  const introTextVariant = inVariant(3);
  const rightTextVariant = inVariant(4);

  const buttonVariant = inVariant(5);
  return (
    <div className="perspective-prismeta-step mt-[24px]">
      <Row>
        <Col span={isEducationPanelExpanded ? 0 : 24}>
          <motion.div
            variants={introTextVariant}
            initial="hidden"
            animate="show"
            className="w-[245px] mb-[24px]"
          >
            <p className="font-light text-xl tracking-wider uppercase text-white mb-0">
              INTRODUCING
            </p>
            <p className="font-light text-[43px] leading-[48px] tracking-wider uppercase text-white mb-0">
              PRISM ETAs
            </p>
          </motion.div>
        </Col>
      </Row>
      <Row>
        <Col span={isEducationPanelExpanded ? 0 : 6}>
          <motion.div
            variants={introTextVariant}
            initial="hidden"
            animate="show"
            className="w-[214px]"
          >
            <p className="font-bold text-xl text-white mb-[30px]">
              Allocating the values and risks of a share into new individually
              tradeable securities.
            </p>

            <p className="font-light text-xl text-white mb-[30px]">
              Revealing six new ways to optimise exposure to equities.
            </p>

            <p className="font-light text-xl text-white mb-[30px]">
              Each Allocation reveals a new perspective of one specific share,
              empowering greater precision over the design of investment
              strategies.
            </p>
          </motion.div>
        </Col>
        <Col span={isEducationPanelExpanded ? 24 : 12}>
          <div className="flex flex-col items-center relative bottom-[88px]">
            <motion.p
              variants={unlockVariant}
              initial="hidden"
              animate="show"
              className="w-[191px] font-bold text-3xl text-center text-[#C0C1C6] mb-[30px]"
            >
              Unlock Value
            </motion.p>
            <PerspectiveIntroCube showLast />
          </div>
        </Col>
        <Col span={isEducationPanelExpanded ? 0 : 6}>
          <motion.div
            variants={rightTextVariant}
            initial="hidden"
            animate="show"
            className="w-[214px]"
          >
            <p className="font-bold text-xl text-[#343741] mb-[15px]">
              Leveraging the Power of Connection
            </p>
            <p className="font-light text-xl text-white mb-[30px]">
              Prism Allocations offer natural, embedded leverage, powered by
              connecting two investors within a single underlying share.
            </p>
            <p className="font-light text-xl text-white mb-[30px]">
              Priced by the market, Connected by the market
            </p>
            <p className="font-light text-xl text-white mb-[30px]">
              <p className="mb-0">No Option</p> Premiums{' '}
              <p className="mb-0">No Margin Calls </p>
              <p className="mb-0">No Interest Payments</p>
            </p>
          </motion.div>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={styles.centerAntd}>
          <motion.div variants={buttonVariant} initial="hidden" animate="show">
            <Button
              onClick={() => setShowIntro(false)}
              className="highlight-hover"
              style={styles.buttonAntd}
            >
              <span className="font-bold mr-6 align-text-top">→</span> See Prism
              Perspective
            </Button>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default PrismETAStep;
