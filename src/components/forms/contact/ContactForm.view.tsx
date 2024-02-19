import { useState } from 'react';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { ReactComponent as ArrowDown } from 'assets/svg/arrow-down.svg';
import apiFetch from 'services/apiFetch';
import { PostEnquiry } from 'services/apiEndpoints';
import { enquiryTypeList } from './contactform.data';
import './styles.scss';

const { Option } = Select;
const { TextArea } = Input;

export const ContactForm = () => {
  const [form] = Form.useForm();
  const [formStatus, setFormStatus] = useState<string>('idle');
  const [formError, setFormError] = useState<string>('');

  const animation = {
    initial: { opacity: 0, width: 0, height: 0, marginLeft: 0 },
    animate: { opacity: 1, width: '8em', height: '8em', marginLeft: 0 },
    exit: { opacity: 0, width: '8em', height: '8em', marginLeft: -20 },
    transition: { type: 'tween' }
  };

  /**
   * @description  handles the submission of the contact us  form. It will be sent to the enquiry API
   */
  const handleFormSubmit = (values: any) => {
    setFormStatus('submitting');

    const enquiryType = enquiryTypeList
      .find(({ value }) => value === values.enquiryType)?.label || 'General Enquiry';

    const data = {
      email: values.emailAddress,
      fullName: values.fullname,
      companyName: values.companyName || '',
      enquiryType: enquiryType,
      message: values.message || ''
    };

    apiFetch(PostEnquiry(data))
      .then((res) => {
        setFormStatus('success');
      })
      .catch(() => {
        setFormStatus('error');
      })
      .finally(() => {
        setTimeout(() => {
          setFormStatus('idle');
        }, 1500);
      });
  }

  return (
    <Form
      form={form}
      className="max-w-lg w-full"
      name="contactForm"
      initialValues={{ remember: true }}
      onFinish={handleFormSubmit}
      onFinishFailed={() => ({})}
      autoComplete="off"
    >
      <h2 className="font-extralight text-4xl text-white w-fit tracking-wide mb-7">
        Contact us
      </h2>
      <Row gutter={[39, 0]}>
        <Col xs={24} xl={12}>
          <Form.Item
            style={{ marginBottom: '15px' }}
            name="fullname"
            rules={[{ required: true, message: 'Please input your fullname' }]}
          >
            <Input
              className="contact-input-base contact-input w-full"
              placeholder="Full name"
            />
          </Form.Item>
        </Col>

        <Col xs={24} xl={12}>
          <Form.Item
            style={{ marginBottom: '15px' }}
            name="emailAddress"
            rules={[
              { required: true, message: 'Please input your email address' },
            ]}
          >
            <Input
              className="contact-input-base contact-input w-full"
              placeholder="Email address"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[39, 0]}>
        <Col xs={24} xl={12}>
          <Form.Item style={{ marginBottom: '15px' }} name="companyName">
            <Input
              className="contact-input-base contact-input w-full"
              placeholder="Company name"
            />
          </Form.Item>
        </Col>

        <Col xs={24} xl={12}>
          <Form.Item
            noStyle
            style={{ marginBottom: '15px' }}
            name="enquiryType"
          >
            <Select
              className="contact-select w-full"
              style={{ marginBottom: '15px' }}
              popupClassName ="contact-select-dropdown"
              placeholder="Select enquiry type"
              suffixIcon={
                <ArrowDown width="15px" height="12px" fill="#797D82" />
              }
            >
              {enquiryTypeList.map(({ value, label }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item noStyle style={{ marginBottom: '15px' }} name="message">
            <TextArea
              className="contact-input-base contact-textarea w-full"
              autoSize={{ minRows: 5 }}
              placeholder="Your message here..."
              rows={5}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col span={24} offset={1}>
          <span className="max-w-[420px] text-xs text-white tracking-wide">
            By clicking ‘Submit’ I agree to be contacted at the point of contact
            provided with more information about Prism.
          </span>
        </Col>
      </Row>

      <Form.Item wrapperCol={{ offset: 1, span: 16 }}>

        <Button
          className="contact-button-submit flex items-center uppercase"
          type="ghost"
          htmlType="submit"
          style={{
            fontSize: '12px',
            lineHeight: '24px'
          }}
        >
          <AnimatePresence>
            {formStatus !== 'idle' && (
              <motion.div
                {...animation}
                className={classNames('status-loader', formStatus)}
              >
                <span />
              </motion.div>
            )}
          </AnimatePresence>

          Submit Enquiry
        </Button>
      </Form.Item>
    </Form>
  );
};
