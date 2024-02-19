import { LoginModalProps } from './LoginModal.props';
import { LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import cn from 'classnames';

const LoginModalView: React.FC<LoginModalProps> = (props: LoginModalProps) => {
  const onFieldChange = (e: any) => {
    props.setPassword(e.target.value);
  };

  return (
    <>
      <div
        className="absolute cursor-pointer w-full h-full modal-backdrop block z-40 bg-[#56565663]"
        onClick={() => props.setShowLogin(false)}
      ></div>
      <div
        className={cn(
          'font-din2014 inset-x-0 relative flex flex-col rounded-2xl mx-auto bg-[#c0c1c5] py-8 px-10 items-center self-center animate__animated animate__slideInDown z-50 !w-10/12 md:!w-1/2 lg:!w-2/3',
          props.expand ? 'xl:!w-3/4' : 'xl:!w-1/3'
        )}
      >
        <h2 className="self-center text-[32px] font-extralight text-[#333333] mb-1">
          Prism Perspective
        </h2>
        <h3 className="self-center text-base font-extralight text-[#333333] mb-7">
          See the value within whole shares
        </h3>
        <div className="flex flex-col items-center w-full">
          <form onSubmit={props.handleLogin} className="w-full flex flex-col">
            <Input
              size="large"
              name="password"
              className="passowrd mb-4"
              placeholder="Enter password"
              type="password"
              value={props.password || ''}
              onChange={onFieldChange}
              prefix={<LockOutlined className="site-form-item-icon" />}
              status={props.error ? 'error' : ''}
              style={{
                borderRadius: '20px',
              }}
            />

            <button
              className="text-white text-sm py-1 px-3 self-end bg-[#999b9f] rounded-[20px] hover:bg-[#c3c5c9]"
              type="submit"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModalView;
