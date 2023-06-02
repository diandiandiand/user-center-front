import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
const Footer: React.FC = () => {
  const defaultMessage = '李耀雲出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'DianDian',
          href: 'YAOYUN_LINK',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/diandiandiand',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'liyaoyun',
          href: 'YAOYUN_LINK',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
