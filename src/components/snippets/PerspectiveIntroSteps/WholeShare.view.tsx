import { FC, useContext } from 'react';
import { Button, Col, Row } from 'antd';
import { motion } from 'framer-motion';

import PerspectiveIntroCube from '../PerspectiveIntroCube';
import { MainContext } from 'context/MainContext';

interface Props {
  setIsLastView: (isShow: boolean) => void;
}

const WholeShare: FC<Props> = ({ setIsLastView }) => {
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
  const commonClass = {
    wholeShare: 'font-light text-5xl tracking-widest text-white uppercase mb-0',
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
  const yetTextVariant = inVariant(3);
  const buttonVariant = inVariant(4);

  return (
    <div className="perspective-wholeshare h-full mt-[42px]">
      <Row>
        <Col span={24}>
          <p className="font-bold text-3xl text-center text-[#C0C1C6] mb-[45px]">
            Whole shares offer investors exposure to:
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={isEducationPanelExpanded ? 0 : 8} className="m-auto">
          <p
            style={styles.wholeShare}
            className={`${commonClass.wholeShare} text-right mr-6`}
          >
            WHOLE
          </p>
        </Col>
        <Col span={isEducationPanelExpanded ? 24 : 8}>
          <PerspectiveIntroCube showLast={false} />
        </Col>
        <Col span={isEducationPanelExpanded ? 0 : 8} className="m-auto">
          <p
            style={styles.wholeShare}
            className={`${commonClass.wholeShare} ml-14`}
          >
            SHARE
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <motion.p
            variants={yetTextVariant}
            initial="hidden"
            animate="show"
            className={`italic leading-8 text-center text-[#C0C1C6] mb-0 ${
              isEducationPanelExpanded
                ? 'text-[21px] mt-[24px]'
                : 'text-[33px] mt-[42px]'
            }`}
          >
            <span className="font-semibold">Yet few investors prioritise</span>{' '}
            growth, dividends and risk equally
          </motion.p>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={styles.centerAntd}>
          <motion.div variants={buttonVariant} initial="hidden" animate="show">
            <Button
              className={`highlight-hover ${
                isEducationPanelExpanded ? 'mt-[15px]' : 'mt-[30px]'
              }`}
              style={styles.buttonAntd}
              onClick={() => setIsLastView(true)}
            >
              <span className="font-bold mr-6 align-text-top">→</span> Reveal
              New Opportunites
            </Button>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default WholeShare;
