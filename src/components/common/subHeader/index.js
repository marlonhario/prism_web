import React from 'react';
import { Tabs } from 'antd';
import MarketList from '../../../pages/MarketList';
import './styles.scss';
import Intro from '../../fragments/EducationTabs/Intro';
import Strategies from '../../Strategies';
import EtaDecider from '../../ETADecider';
const { TabPane } = Tabs;

const SubHeader = ({onSelectedEtaTypeCallback, onSelectedCompanyHeaderCallback}) => {
    return (
        <div className='subHeader'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="INTRO" key="1">
                    <Intro />
                </TabPane>
                <TabPane tab="ETA DECIDER" key="2">
                    <EtaDecider />
                </TabPane>
                <TabPane tab="STRATEGIES" key="3">
                    <Strategies />
                </TabPane>
                <TabPane tab="MARKETS" key="4">
                    <MarketList onSelectedEtaTypeCallback={onSelectedEtaTypeCallback} onSelectedCompanyHeaderCallback={onSelectedCompanyHeaderCallback}/>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default SubHeader;