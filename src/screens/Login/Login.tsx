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
    localStorage.setItem('role', 'admin')
    navigate('/admin')

  }

  const handleUserSubmit = async () => {
    const response = await axios.post('https://motivation-cards-backend.herokuapp.com/api/v1/user/login', {
      email
    })

    const apiToken = response.data.api_token
    localStorage.setItem('api_token', apiToken)
    localStorage.setItem('role', 'user')
    navigate('/user')
  }
  return (
    <main>
      <div style={{ width: "400px", margin: "50px auto" }}>
        <Input onChange={handleChange} style={{ marginBottom: "30px"}} />
        <Button style={{ marginRight: 40 }} onClick={handleAdminSubmit}>Admin</Button>
        <Button onClick={handleUserSubmit}>User</Button>
      </div>
    </main>
  );
};

export default Login;
