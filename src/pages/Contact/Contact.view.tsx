import LeftHandSide from 'components/layouts/LeftHandSide';
import RightHandSide from 'components/layouts/RightHandSide';
import EducationTabs from 'components/fragments/EducationTabs';
import { ContactView } from 'components/subpages';
import { motion } from 'framer-motion';
import { MapContainer } from 'components/subpages/map';

const ContactPageView: React.FC = () => {
  return (
    <>
      <LeftHandSide>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ bounce: 0 }}
          className={'absolute top-0 right-0 bottom-0 left-0'}
        >
          <EducationTabs>
            <ContactView />
          </EducationTabs>
        </motion.div>
      </LeftHandSide>
      <RightHandSide className='hidden lg:block'>
        <MapContainer />
      </RightHandSide>
    </>
  );
};

export default ContactPageView;
