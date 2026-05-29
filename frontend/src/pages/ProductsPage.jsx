import { Button, Empty, InputNumber, Select, Skeleton, message } from "antd";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scene3D from "../components/Scene3D";
import SplitHeading from "../components/venetian/SplitHeading";
import { useCart } from "../context/CartContext";
import { useVenetianReveal } from "../hooks/useVenetianReveal";
import api from "../services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [choices, setChoices] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const rootRef = useVenetianReveal([products.length]);

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const updateChoice = (id, patch) => {
    setChoices((prev) => ({ ...prev, [id]: { quantity: 100, ...prev[id], ...patch } }));
  };

  return (
    <div ref={rootRef} className="pt-32 md:pt-36">
      <section className="relative overflow-hidden pb-12 md:pb-16">
        <Scene3D variant="products" className="right-0 top-0 h-full min-h-[420px] opacity-55" />
        <div className="ven-container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="ven-reveal ven-eyebrow mb-6">Live catalog</p>
              <div className="ven-reveal">
                <SplitHeading lines={["PRODUCT", "COMMAND CENTER"]} className="ven-heading-xl max-w-5xl" />
              </div>
              <p className="ven-reveal ven-body mt-7">
                Select quantities and colors from the live product API, then send the same cart flow through checkout.
              </p>
            </div>
            <div className="ven-reveal neo-panel p-5 text-right">
              <p className="ven-eyebrow">Products loaded</p>
              <p className="mt-1 font-display text-5xl font-semibold">{loading ? "--" : products.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ven-container pb-24">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="neo-panel p-4">
                <Skeleton.Image active className="!h-60 !w-full" />
                <Skeleton active className="mt-6" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="ven-reveal neo-panel py-20 text-center">
            <Empty description="No products are live yet" />
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ven-muted">
              Add products from the admin panel and they will appear here through the existing catalog API.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const choice = choices[product._id] || {
                quantity: product.minOrderQty || 100,
                color: product.colors?.[0] || "White"
              };
              const colors = product.colors?.length ? product.colors : ["White"];

              return (
                <article key={product._id} className="ven-reveal group neo-panel flex min-h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ven-sand">
                    {product.media?.[0] ? (
                      <img
                        src={product.media[0].url}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-8 text-center font-display text-3xl font-semibold text-ven-muted">
                        {product.name}
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/82 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ven-ink backdrop-blur">
                      {product.category}
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-[8px] bg-[#101314] px-4 py-2 text-white shadow-lg">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">Unit</span>
                      <span className="font-display text-2xl font-semibold">${product.price?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-3xl font-semibold leading-tight text-ven-ink">{product.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ven-muted">{product.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(product.badges || ["Export ready"]).slice(0, 3).map((badge) => (
                        <span key={badge} className="neo-chip">{badge}</span>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div>
                        <label className="ven-eyebrow mb-2 block">Qty</label>
                        <InputNumber
                          min={product.minOrderQty || 1}
                          value={choice.quantity}
                          onChange={(v) => updateChoice(product._id, { quantity: v })}
                          className="w-full"
                          controls={{ upIcon: <Plus size={12} />, downIcon: <Minus size={12} /> }}
                        />
                      </div>
                      <div>
                        <label className="ven-eyebrow mb-2 block">Color</label>
                        <Select
                          value={choice.color}
                          onChange={(v) => updateChoice(product._id, { color: v })}
                          className="w-full"
                          options={colors.map((c) => ({ value: c, label: c }))}
                        />
                      </div>
                    </div>

                    <Button
                      className="mt-6 !h-12 !rounded-[8px] !border-ven-ink !bg-ven-ink !font-sans !text-xs !font-bold !uppercase !tracking-[0.14em] !text-ven-cream hover:!border-[#00a6a6] hover:!bg-[#00a6a6] hover:!text-white"
                      icon={<ShoppingBag size={16} />}
                      onClick={() => {
                        addToCart(product, choice.quantity, choice.color);
                        message.success("Added to order");
                      }}
                    >
                      Add to Order
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        <div className="ven-reveal mt-12 text-center">
          <Link to="/cart" className="ven-btn">
            View Order Cart
          </Link>
        </div>
      </section>
    </div>
  );
}
