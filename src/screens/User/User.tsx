import { useEffect, useState } from "react";
import { Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "../../components/Layout";

const User = () => {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        "https://motivation-cards-backend.herokuapp.com/api/v1/user/user_info",
        {
          headers: {
            Authorization: `${localStorage.getItem("api_token")}`,
          },
        }
      );
      if (response.data.team) {
        navigate("workspace");
      }
    };

    const getTeams = async () => {
      const response: any = await axios.get(
        "https://motivation-cards-backend.herokuapp.com/api/v1/user/teams",
        {
          headers: {
            Authorization: `${localStorage.getItem("api_token")}`,
          },
        }
      );

      setTeamList(response.data);
    };

    getUserInfo();
    getTeams();
  }, []);

  const handleTeamSubmit = () => {
    return axios
      .post(
        "https://motivation-cards-backend.herokuapp.com/api/v1/user/teams",
        {
          team_id: selectedTeam,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("api_token")}`,
          },
        }
      )
      .then(() => navigate("workspace"));
  };

  const handleSelectChange = (event: string) => {
    setSelectedTeam(event);
  };

  return (
    <Layout>
      {teamList.length > 0 && (
        <Select
          placeholder="Choose your team"
          onChange={(event) => handleSelectChange(event)}
        >
          {teamList.map(({ id, name }) => (
            <Select.Option value={id} key={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      )}
      <Button onClick={handleTeamSubmit}>Choose your team!</Button>
    </Layout>
  );
};

export default User;
