import {
  Table,
  Button,
  Card,
  BSGrid,
  BSCol
} from "@appquality/appquality-design-system";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getAllPopups from "../api/getAllPopups";

export default ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllPopups().then(res => {
      console.log(res);
      setData(
        res.map(r => ({
          id: r.id,
          title: r.title,
          action: {
            title: "Open",
            content: (
              <Link to={`/backoffice/${r.id}`}>
                <Button type="primary" flat={true}>
                  Open
                </Button>
              </Link>
            )
          }
        }))
      );

      setLoading(false);
    });
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "2ch"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10ch"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action"
    }
  ];
  return (
    <div className="aq-mt-3">
      <BSGrid>
        <BSCol size="col-12">
          <Link to="/backoffice/new">
            <Button type="primary" flat={true} size="block">
              New
            </Button>
          </Link>
        </BSCol>
        <BSCol>
          <Card>
            <Table
              dataSource={data}
              columns={columns}
              isLoading={loading}
              isStriped
            />
          </Card>
        </BSCol>
      </BSGrid>
    </div>
  );
};
