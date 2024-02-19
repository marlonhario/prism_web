/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { isEmpty, map, includes, find } from 'lodash';
import { Select } from 'antd';
import { etaTypes, strategyList, strategyDescriptions } from './Constant';
import './Styles.scss';
const { Option } = Select;

const SelectStrategy = (props) => {
  const { selectedStrategyTypeCallback, selectedEtaTypeCallback } = props;
  const [description, setDescription] = useState('');
  const [selectedEtaObj, setSelectedEtaObj] = useState('');
  const [selectedStrategyType, setSelectedStrategyType] = useState('');

  /**
   * function to handle eta type selection
   */
  const onChangeEtaType = (selectedEta) => {
    /* Finding selected eta type details in eta type list */
    const selectedEtadetails = find(etaTypes, list => list.etaType === selectedEta);
    setSelectedEtaObj(selectedEtadetails);
  };

  /**
   * function to handle strategy selection
   */
  const onChangeStrategy = (selectedStrategyName) => {
    setSelectedStrategyType(selectedStrategyName);
  }

  /**
   * function to set description based on selected eta type and strategy type
   * Also set callback for startagy type and eta type
   */
  useEffect(() => {
    if (!isEmpty(selectedStrategyType) && !isEmpty(selectedEtaObj.etaType)) {
      selectedStrategyTypeCallback(selectedStrategyType);
      selectedEtaTypeCallback(selectedEtaObj);
      map(strategyDescriptions, (value) => {
        if (includes(Object.keys(value), selectedEtaObj.etaType)) {
          const matchedStrategyObj = find(value[selectedEtaObj.etaType], eta => eta.etaName === selectedStrategyType);
          setDescription(matchedStrategyObj.textDescription || '');
        }
      });
    }
  }, [selectedEtaObj.etaType, selectedStrategyType])

  return (
    <div className='py-4 px-6 border border-solid border-gray-300 boxStyle selectStrategy'>
      <div className='flex font-medium text-lg py-1 border-b border-gray-300'>Select Strategy</div>
      <div className='flex flex-row space-x-8'>
        <div className='w-1/2'>
          <div className="w-full py-8">
            <label>
              ETA Type
            </label>
            <Select className='boxShadow ant-col-20' size='large' onChange={(e) => onChangeEtaType(e)}>
              {etaTypes.map(etaList => (
                <Option key={etaList.etaType} value={etaList.etaType}>
                  <div className='grid-rows-2'>
                    <div className='font-bold text-sm'>{etaList.etaType}</div>
                    <div className='text-xs'>{etaList.description}</div>
                  </div>
                </Option>
              ))}
            </Select>
          </div>

          <div className='w-full py-8'>
            <label>Strategy</label>
            <Select className='boxShadow ant-col-20' size='large' onChange={(e) => onChangeStrategy(e)}>
              {strategyList.map(list => (
                <Option key={list.strategyName} value={list.strategyName}>
                    <div className='font-bold text-sm'>{list.strategyName}</div>
                    <div className='text-xs'>{list.shortDescription}</div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className='w-1/2 my-8 description'>
          <label>
            <p className='p-2'>{description}</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SelectStrategy;