import { Card, Col, Row, Statistic, Table, Tag, Spin } from "antd";
import { UserOutlined, ShoppingCartOutlined, AppstoreOutlined, ClockCircleOutlined, TagsOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../services/api";

const statusColors = {
  pending: "orange",
  confirmed: "blue",
  processing: "cyan",
  shipped: "purple",
  delivered: "green",
  cancelled: "red",
};

export default function DashboardTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats")
      .then(({ data }) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spin size="large" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Products"
              value={stats.totalProducts}
              prefix={<AppstoreOutlined className="text-purple-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Categories"
              value={stats.totalCategories}
              prefix={<TagsOutlined className="text-cyan-500" />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card size="small" className="shadow-sm border-l-4 border-orange-400">
            <Statistic
              title="Pending Orders"
              value={stats.ordersByStatus.find((s) => s._id === "pending")?.count || 0}
              prefix={<ClockCircleOutlined className="text-orange-500" />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="Recent Orders" className="shadow-sm">
            <Table
              rowKey="_id"
              dataSource={stats.recentOrders}
              pagination={false}
              size="small"
              columns={[
                {
                  title: "Customer",
                  render: (_, r) => r.user?.name || "—",
                },
                {
                  title: "Items",
                  render: (_, r) => r.items?.length || 0,
                },
                {
                  title: "Status",
                  render: (_, r) => (
                    <Tag color={statusColors[r.status]}>{r.status}</Tag>
                  ),
                },
                {
                  title: "Date",
                  render: (_, r) => new Date(r.createdAt).toLocaleDateString(),
                },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Orders by Status" className="shadow-sm mb-4">
            <div className="space-y-3">
              {stats.ordersByStatus.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <Tag color={statusColors[item._id]}>{item._id}</Tag>
                  <span className="font-semibold text-gray-700">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Products by Category" className="shadow-sm">
            <div className="space-y-3">
              {stats.productsByCategory.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <span className="text-gray-600">{item._id}</span>
                  <Tag color="blue">{item.count}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
