import Layout from '../../components/Layout'
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <Select placeholder="Choose your team" onChange={() => navigate('/user-motivators')}>
        <Select.Option value="tgn">
          TGN
        </Select.Option>
      </Select>
    </Layout>
  );
};

export default User;
