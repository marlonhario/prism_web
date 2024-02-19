import { ContactForm } from 'components/forms';
import { MapContainer } from '../map';
import './styles.scss';

export const ContactView: React.FC = () => {
  return (
    <section className="container py-[51px] px-4 h-full prism-scrollbar overflow-y-auto overflow-x-hidden bg-radial-gradient">
      <div className="px-[41px]">
        <h2 className="font-extralight text-4xl text-white w-fit tracking-wide mb-4">
          Office Locations
        </h2>
        <p className="font-light text-base tracking-wide text-white mb-16">
          To speak with a Prism representative, please fill out the form below.
        </p>
        <ContactForm />
      </div>

      <div className="flex sm:hidden justify-center mt-28 map-parent-container">
        <MapContainer />
      </div>
    </section>
  );
};
