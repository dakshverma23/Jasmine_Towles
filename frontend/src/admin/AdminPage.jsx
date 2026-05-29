import { AppstoreOutlined, BarChartOutlined, ShoppingCartOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import CategoriesTab from "./tabs/CategoriesTab";
import DashboardTab from "./tabs/DashboardTab";
import OrdersTab from "./tabs/OrdersTab";
import ProductsTab from "./tabs/ProductsTab";
import UsersTab from "./tabs/UsersTab";
import Scene3D from "../components/Scene3D";

const { Sider, Content } = Layout;

const menuItems = [
  { key: "dashboard", icon: <BarChartOutlined />, label: "Dashboard" },
  { key: "products", icon: <AppstoreOutlined />, label: "Products" },
  { key: "orders", icon: <ShoppingCartOutlined />, label: "Orders" },
  { key: "users", icon: <UserOutlined />, label: "Users" },
  { key: "categories", icon: <TagsOutlined />, label: "Categories" }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "products":
        return <ProductsTab />;
      case "orders":
        return <OrdersTab />;
      case "users":
        return <UsersTab />;
      case "categories":
        return <CategoriesTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <Layout className="ven-container !bg-transparent pb-12">
        <div className="neo-panel relative flex min-h-[calc(100vh-9rem)] w-full overflow-hidden">
          <Scene3D variant="admin" className="left-0 top-0 h-64 opacity-20" />
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint="lg"
            theme="light"
            width={250}
            className="relative z-10 !bg-[#101314] !text-white"
          >
            <div className="border-b border-white/10 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00d1c7]">Jasmine OS</p>
              <h2 className={`mt-2 font-display font-semibold text-white transition-all ${collapsed ? "text-xl" : "text-3xl"}`}>
                {collapsed ? "JT" : "Admin"}
              </h2>
            </div>
            <Menu
              mode="inline"
              selectedKeys={[activeTab]}
              onClick={({ key }) => setActiveTab(key)}
              items={menuItems}
              className="admin-menu !border-none !bg-transparent !pt-3"
            />
          </Sider>
          <Content className="relative z-10 min-w-0 flex-1 p-4 md:p-7 lg:p-8">
            {renderTab()}
          </Content>
        </div>
      </Layout>
    </div>
  );
}
