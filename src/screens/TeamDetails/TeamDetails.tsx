import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Space } from "antd";

import { Card, Layout } from "../../components";

const TeamDetails = () => {
  const [loading, setLoading] = useState(true);
  const [topMotivators, setTopMotivators] = useState([]);

  useEffect(() => {
    const getTopMotivators = async () => {
      try {
        const response = await axios.get(
          "https://motivation-cards-backend.herokuapp.com/api/v1/admin/top_motivations",
          {
            headers: {
              Authorization: `${localStorage.getItem("api_token")}`,
            },
          }
        );
        setTopMotivators(response.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    getTopMotivators();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    );
  }

  if (!topMotivators.length) {
    return <div>Your team has no motivators</div>;
  }

  return (
    <Layout>
      {topMotivators.map((motivator, index) => (
        <Card key={index} card={motivator} />
      ))}
    </Layout>
  );
};

export default TeamDetails;
