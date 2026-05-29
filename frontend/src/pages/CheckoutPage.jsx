import { Button, Form, Input, message } from "antd";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SplitHeading from "../components/venetian/SplitHeading";
import { useCart } from "../context/CartContext";
import { useVenetianReveal } from "../hooks/useVenetianReveal";
import api from "../services/api";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const rootRef = useVenetianReveal();

  const submit = async (values) => {
    if (!items.length) {
      message.warning("Add products first");
      return;
    }
    try {
      await api.post("/orders", {
        items: items.map((item) => ({
          product: item.product._id,
          productName: item.product.name,
          quantity: item.quantity,
          color: item.color
        })),
        shippingAddress: values
      });
      clear();
      message.success("Order placed successfully");
      navigate("/");
    } catch {
      message.error("Please login to place an order");
      navigate("/auth");
    }
  };

  return (
    <div ref={rootRef} className="pt-32 md:pt-36">
      <section className="ven-container pb-12">
        <div className="ven-reveal">
          <SplitHeading lines={["SHIPPING", "TRANSMISSION"]} className="ven-heading-xl" />
        </div>
        <p className="ven-reveal ven-body mt-6">Complete your destination details to send the order into the existing order API.</p>
      </section>

      <section className="ven-container grid gap-6 pb-24 lg:grid-cols-[1fr_0.48fr]">
        <Form
          layout="vertical"
          onFinish={submit}
          className="ven-reveal neo-panel grid gap-2 p-6 md:grid-cols-2 md:gap-x-6 md:p-8"
        >
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]} className="md:col-span-2">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="line1" label="Address Line 1" rules={[{ required: true }]} className="md:col-span-2">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="line2" label="Address Line 2" className="md:col-span-2">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="state" label="State" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="postalCode" label="Postal Code" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
          <div className="md:col-span-2">
            <Button htmlType="submit" className="ven-btn !mt-4 w-full md:w-auto" icon={<Send size={16} />}>
              Place Order
            </Button>
          </div>
        </Form>

        <aside className="ven-reveal neo-panel-dark h-fit p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00d1c7]">Order packet</p>
          <p className="mt-3 font-display text-5xl font-semibold">{items.length}</p>
          <p className="mt-2 text-sm text-white/56">Line items waiting for checkout.</p>
          <div className="mt-6 space-y-3">
            {items.slice(0, 4).map((item, index) => (
              <div key={`${item.product._id}-${index}`} className="rounded-[8px] border border-white/10 bg-white/[0.06] p-3">
                <p className="font-semibold">{item.product.name}</p>
                <p className="mt-1 text-xs text-white/54">Qty {item.quantity} / {item.color}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
