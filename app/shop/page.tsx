import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Premium Silicone Shoulder Pads",
    price: 49,
    category: "Frame",
    description: "Instant wide shoulders. Invisible under clothes.",
    image: "🛡️",
    rating: "4.9",
    sold: "1.2k",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Advanced Teeth Whitening Kit",
    price: 39,
    category: "Smile",
    description: "Professional results at home. 7-day visible difference.",
    image: "✨",
    rating: "4.8",
    sold: "890",
    badge: "New",
  },
  {
    id: 3,
    name: "Mewing Appliance Pro + Guide",
    price: 34,
    category: "Jawline",
    description: "Train proper tongue posture. Harder jawline.",
    image: "🦷",
    rating: "4.7",
    sold: "670",
  },
  {
    id: 4,
    name: "Posture Corrector + Shoulder Support",
    price: 45,
    category: "Posture",
    description: "Fix rounded shoulders. Better frame instantly.",
    image: "📏",
    rating: "4.9",
    sold: "540",
    badge: "Staff Pick",
  },
];

export default function Shop() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter">Shop</h1>
            <p className="text-zinc-400 text-xl mt-2">Tools that deliver real results</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">Frame</Button>
            <Button variant="outline">Jawline</Button>
            <Button variant="outline">Skin</Button>
            <Button variant="outline">Posture</Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="bg-zinc-900 border border-zinc-800 hover:border-cyan-400 transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 bg-zinc-800 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                  {product.image}
                </div>

                <div className="p-6">
                  {product.badge && (
                    <Badge className="mb-3 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                      {product.badge}
                    </Badge>
                  )}

                  <h3 className="font-semibold text-xl mb-1">{product.name}</h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold">${product.price}</span>
                    </div>
                    <Button className="bg-white text-black hover:bg-white/90">
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-sm text-zinc-400">
                    <span>{product.rating} ★</span>
                    <span>•</span>
                    <span>{product.sold} sold</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-20 py-8 border-t border-zinc-800 flex flex-wrap justify-center gap-x-12 gap-y-6 text-center text-sm">
          <div>✅ Free Shipping on orders $75+</div>
          <div>✅ 30-Day Money Back Guarantee</div>
          <div>✅ Lab Tested • High Quality</div>
          <div>✅ Trusted by the looksmax community</div>
        </div>
      </div>
    </main>
  );
}