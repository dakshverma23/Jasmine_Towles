import { Button, Form, Input, Select, message } from "antd";
import { Send } from "lucide-react";
import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pages";
import { useVenetianReveal } from "../hooks/useVenetianReveal";

export default function ContactPage() {
  const rootRef = useVenetianReveal();

  const onFinish = () => {
    message.success("Message sent - our team will respond shortly.");
  };

  return (
    <div ref={rootRef}>
      <PageTemplate content={pageContent.contact} />
      <section className="ven-container max-w-3xl pb-24">
        <Form layout="vertical" onFinish={onFinish} className="ven-reveal neo-panel p-6 md:p-8">
          <div className="grid gap-2 md:grid-cols-2 md:gap-x-5">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input size="large" />
            </Form.Item>
          </div>
          <Form.Item name="facility" label="Facility" rules={[{ required: true }]}>
            <Select
              size="large"
              placeholder="Choose your facility"
              options={[
                { value: "madurai", label: "Madurai - Headquarters" },
                { value: "sivagangai", label: "Sivagangai - Manufacturing" }
              ]}
            />
          </Form.Item>
          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <Input.TextArea rows={5} />
          </Form.Item>
          <Button htmlType="submit" className="ven-btn w-full md:w-auto" icon={<Send size={16} />}>
            Send Message
          </Button>
        </Form>
      </section>
    </div>
  );
}
