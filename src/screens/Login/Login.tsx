import { useState } from "react";
import { Button, Input } from "antd";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)

  const handleAdminSubmit = async () => {
    const response = await axios.post('https://motivation-cards-backend.herokuapp.com/api/v1/admin/login', {
      email
    })

    const apiToken = response.data.api_token
    localStorage.setItem('api_token', apiToken)
    navigate('/admin')

  }

  const handleUserSubmit = async () => {
    const response = await axios.post('https://motivation-cards-backend.herokuapp.com/api/v1/user/login', {
      email
    })

    const apiToken = response.data.api_token
    localStorage.setItem('api_token', apiToken)
    navigate('/user')
  }
  return (
    <main>
      <Input onChange={handleChange} />
      <Button onClick={handleAdminSubmit}>Admin</Button>
      <Button onClick={handleUserSubmit}>User</Button>
    </main>
  );
};

export default Login;
