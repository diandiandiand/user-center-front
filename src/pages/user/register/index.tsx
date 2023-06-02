import type {FC} from 'react';
import React, {useState} from 'react';
import {Alert, message, Tabs} from 'antd';
// import type { Store } from 'antd/es/form/interface';
import {history} from 'umi';
// import type { StateType } from './service';
// import { fakeRegister } from './service';
import styles from './style.less';
import Footer from "@/components/Footer";
// import {useModel} from "@@/plugin-model/useModel";
import {register} from "@/services/ant-design-pro/api";
import {LoginForm, ProFormText} from "@ant-design/pro-form";
import {SYSTEM_LOGO, YAOYUN_LINK} from "@/constants";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

// import { getFakeCaptcha } from '@/services/ant-design-pro/login';


// const FormItem = Form.Item;
// const { Option } = Select;
// const InputGroup = Input.Group;
//
// const passwordStatusMap = {
//   ok: (
//     <div className={styles.success}>
//       <span>强度：强</span>
//     </div>
//   ),
//   pass: (
//     <div className={styles.warning}>
//       <span>强度：中</span>
//     </div>
//   ),
//   poor: (
//     <div className={styles.error}>
//       <span>强度：太短</span>
//     </div>
//   ),
// };
//
// const passwordProgressMap: {
//   ok: 'success';
//   pass: 'normal';
//   poor: 'exception';
// } = {
//   ok: 'success',
//   pass: 'normal',
//   poor: 'exception',
// };

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Register: FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');


  //表单提交方法
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword,checkPassword}=values;
    //校验
if (userPassword!==checkPassword){
  message.error("两次输入的密码不一致");
  return;
}

    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname:"/user/login",
          query,
        });
        return;
      }

    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error( defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig:{
              submitText:"注册"
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}

          title="点点星球"
          subTitle={<a href={YAOYUN_LINK} target="_blank" rel="noreferrer" >  liyaoyun的第一个宇宙无敌最强项目</a>}
          initialValues={{
            autoLogin: true,
          }}
//点击就会执行提交表单方法
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'} />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            // eslint-disable-next-line react/jsx-no-undef
            <LoginMessage content={'错误的账号和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}  //账号是admin
                //输入框里的提示信息
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码 '}   //ant.design
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "密码最小长度为8"
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码 '}   //ant.design
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "密码最小长度为8"
                  }
                ]}
              />
            {/*  输入框结束*/}
            </>
          )}


        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
