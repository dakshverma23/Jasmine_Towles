import { Button, Empty } from "antd";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import SplitHeading from "../components/venetian/SplitHeading";
import { useCart } from "../context/CartContext";
import { useVenetianReveal } from "../hooks/useVenetianReveal";

export default function CartPage() {
  const { items, removeItem, totalItems } = useCart();
  const rootRef = useVenetianReveal([items.length]);

  return (
    <div ref={rootRef} className="pt-32 md:pt-36">
      <section className="ven-container pb-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="ven-reveal">
            <SplitHeading lines={["YOUR", "ORDER STACK"]} className="ven-heading-xl" />
          </div>
          <div className="ven-reveal neo-panel p-5 text-right">
            <p className="ven-eyebrow">Total units</p>
            <p className="mt-1 font-display text-5xl font-semibold">{totalItems}</p>
          </div>
        </div>
      </section>

      <section className="ven-container pb-24">
        {items.length === 0 ? (
          <div className="ven-reveal neo-panel py-20 text-center">
            <Empty description="Your order is empty" />
            <Link to="/products" className="ven-btn mt-8 inline-flex">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <ul className="grid gap-3">
              {items.map((item, idx) => (
                <li key={`${item.product._id}-${idx}`} className="ven-reveal neo-panel flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-[8px] bg-ven-sand">
                      {item.product.media?.[0] ? (
                        <img src={item.product.media[0].url} alt={item.product.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full place-items-center text-xs font-bold text-ven-muted">JT</div>
                      )}
                    </div>
                    <div>
                      <p className="ven-eyebrow">{item.product.category}</p>
                      <h3 className="font-display text-2xl font-semibold text-ven-ink">{item.product.name}</h3>
                      <p className="mt-1 text-sm text-ven-muted">
                        Qty {item.quantity} / {item.color}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeItem(idx)}
                    icon={<Trash2 size={16} />}
                    className="!h-11 !rounded-[8px] !border-[#ff6f61] !bg-transparent !font-bold !text-[#c4473b] hover:!bg-[#ff6f61] hover:!text-white"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <div className="ven-reveal mt-10 flex flex-wrap gap-3">
              <Link to="/checkout" className="ven-btn">
                Proceed to Checkout
              </Link>
              <Link to="/products" className="ven-btn-outline">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
