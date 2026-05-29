import { Button, Form, Input, Tabs, message } from "antd";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SplitHeading from "../components/venetian/SplitHeading";
import { useAuth } from "../context/AuthContext";
import { useVenetianReveal } from "../hooks/useVenetianReveal";
import api from "../services/api";

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const rootRef = useVenetianReveal();

  return (
    <div ref={rootRef} className="pt-32 md:pt-36">
      <section className="ven-container pb-12">
        <div className="ven-reveal">
          <SplitHeading lines={["SECURE", "ACCESS"]} className="ven-heading-xl" />
        </div>
      </section>

      <section className="ven-container grid gap-6 pb-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="ven-reveal neo-panel-dark p-7 md:p-9">
          <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#00d1c7] text-[#101314]">
            <KeyRound size={22} />
          </div>
          <h2 className="mt-8 font-display text-4xl font-semibold">One account, same backend.</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/58">
            Login, registration, and admin bootstrap continue through the existing auth endpoints and token storage.
          </p>
        </div>

        <div className="ven-reveal neo-panel p-6 md:p-8">
          <Tabs
            items={[
              {
                key: "login",
                label: "Login",
                children: (
                  <Form
                    layout="vertical"
                    onFinish={async (v) => {
                      try {
                        await login(v.email, v.password);
                        message.success("Welcome back");
                        navigate("/");
                      } catch {
                        message.error("Invalid credentials");
                      }
                    }}
                  >
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                      <Input.Password size="large" />
                    </Form.Item>
                    <Button htmlType="submit" className="ven-btn w-full">
                      Sign In
                    </Button>
                  </Form>
                )
              },
              {
                key: "register",
                label: "Register",
                children: (
                  <Form
                    layout="vertical"
                    onFinish={async (v) => {
                      try {
                        await register(v.name, v.email, v.password);
                        navigate("/");
                      } catch {
                        message.error("Registration failed");
                      }
                    }}
                  >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
                      <Input.Password size="large" />
                    </Form.Item>
                    <Button htmlType="submit" className="ven-btn w-full">
                      Create Account
                    </Button>
                  </Form>
                )
              },
              {
                key: "admin",
                label: "Admin",
                children: (
                  <Form
                    layout="vertical"
                    onFinish={async (v) => {
                      try {
                        const { data } = await api.post("/auth/bootstrap-admin", v);
                        localStorage.setItem("jt_token", data.token);
                        navigate("/admin");
                        window.location.reload();
                      } catch {
                        message.error("Invalid setup key");
                      }
                    }}
                  >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                      <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item name="setupKey" label="Setup Key" rules={[{ required: true }]}>
                      <Input.Password size="large" />
                    </Form.Item>
                    <Button htmlType="submit" className="ven-btn w-full">
                      Create Admin
                    </Button>
                  </Form>
                )
              }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
