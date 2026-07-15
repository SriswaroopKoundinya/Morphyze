import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

{/* Navigation */}
<nav className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md fixed w-full z-50">
  <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
    <h1 className="text-3xl font-bold tracking-tighter text-cyan-400">morphyze</h1>
    
    <div className="hidden md:flex gap-8 text-sm font-medium">
      <a href="#" className="hover:text-cyan-400 transition-colors">Analysis</a>
      <a href="/shop" className="hover:text-cyan-400 transition-colors">Shop</a>
      <a href="#" className="hover:text-cyan-400 transition-colors">Wiki</a>
      <a href="#" className="hover:text-cyan-400 transition-colors">Guides</a>
    </div>

<div className="flex items-center gap-4">
  <SignInButton mode="modal">
    <Button variant="outline" size="sm" className="bg-cyan-400 text-black hover:bg-cyan-300">Sign In</Button>
  </SignInButton>
  <SignUpButton mode="modal">
    <Button size="sm" className = "border-2 border-zinc-700 hover:bg-zinc-600" >Sign Up</Button>
  </SignUpButton>
  <UserButton afterSignOutUrl="/" />
</div>
  </div>
</nav>

      {/* Hero - Strong E-commerce Focus */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">🔥 Official Looksmaxxing Store</Badge>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
            Level Up Your Looks.<br />
            Shop The Tools That Work.
          </h1>

          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-10">
            Get your face & body analyzed → Receive personalized product recommendations → Transform faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-12 py-7 bg-white text-black hover:bg-white/90 font-semibold rounded-2xl text-xl">
              Start Free Face Analysis
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-12 py-7 border-2 border-white/30 hover:bg-white/10 rounded-2xl text-xl text-black" asChild>
              <a href="/shop">Browse All Products</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-zinc-800 py-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto px-6 flex justify-center gap-12 md:gap-20 text-center">
          <div>
            <div className="text-3xl font-bold">15k+</div>
            <div className="text-zinc-400">Maxxers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">4.9</div>
            <div className="text-zinc-400">Avg Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Fast US Shipping</div>
            <div className="text-zinc-400">2-5 Days</div>
          </div>
        </div>
      </div>

      {/* Featured Products Teaser */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-bold">Best Sellers</h2>
          <a href="/shop" className="text-cyan-400 hover:underline">View all products →</a>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Fake product cards - replace with real ones later */}
          {[
            { name: "Posture Shoulder Pads", price: "$49" },
            { name: "Advanced Teeth Whitening Kit", price: "$39" },
            { name: "Mewing Appliance + Guide", price: "$29" },
            { name: "Frame Maxxing Hoodie", price: "$59" },
          ].map((product, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800 hover:border-cyan-400 transition-all group">
              <CardContent className="p-6">
                <div className="h-48 bg-zinc-800 rounded-xl mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                  🛠️
                </div>
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-cyan-400 font-bold">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Analysis Lead Magnet */}
      <div className="bg-zinc-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">See Your Flaws. Fix Them Faster.</h2>
          <p className="text-xl text-zinc-400 mb-10">
            Our analysis tool scans your face and body, then recommends exact products from our store to fix your weak points.
          </p>
          <Button size="lg" className="text-lg px-12 py-7">Start Analysis Now →</Button>
        </div>
      </div>
	  
	        {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-cyan-400 font-bold text-xl mb-4">morphyze</h3>
            <p className="text-zinc-400 text-sm">The ultimate looksmaxxing destination.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="/shop" className="hover:text-white">All Products</a></li>
              <li><a href="#" className="hover:text-white">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white">Bundles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white">Wiki</a></li>
              <li><a href="#" className="hover:text-white">Guides</a></li>
              <li><a href="#" className="hover:text-white">Analysis Tool</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Disclaimers</a></li>
              <li><a href="#" className="hover:text-white">Refunds</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800 text-center text-xs text-zinc-500">
          © 2026 Morphyze. All rights reserved. • This is not medical advice. Consult a doctor before using any products. Results not guaranteed.
        </div>
      </footer>
	  
    </main>
  );
}