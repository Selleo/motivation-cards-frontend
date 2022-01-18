import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const User = () => {
  const navigate = useNavigate()
  const [teamList, setTeamList] = useState([])
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get('https://motivation-cards-backend.herokuapp.com/api/v1/user/user_info', {
        headers: {
          'Authorization': `${localStorage.getItem('api_token')}`
        }
      })
      if (response.data.team) {
        navigate('user-motivators')
      }
    }

    const getTeams = async () => {
      const response:any = await axios.get('https://motivation-cards-backend.herokuapp.com/api/v1/user/teams', {
        headers: {
          'Authorization': `${localStorage.getItem('api_token')}`
        }
      })

      setTeamList(response.data)
    }

    getUserInfo()
    getTeams()
  }, [])

  const handleTeamSubmit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const team = event.target.value
    navigate('/user-motivators')
  }

  console.log(`team`, teamList)

  return (
    <Layout>
      {teamList.length > 0 && (
        <Select placeholder="Choose your team" onChange={(event) => handleTeamSubmit(event)}>
          {teamList.map(({ id, name }) => (
            <Select.Option value={id} key={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Layout>
  );
};

export default User;
