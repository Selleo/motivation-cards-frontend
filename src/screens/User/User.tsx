import Layout from '../../components/Layout'
import { Select } from 'antd';

const User = () => {
  return (
    <Layout>
      <Select placeholder="Choose your team">
        <Select.Option value="tgn">
          TGN
        </Select.Option>
      </Select>
    </Layout>
  );
};

export default User;
