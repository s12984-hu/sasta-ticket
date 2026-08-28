import React from 'react';
import { Plane, ShieldCheck, Headphones, Award, CreditCard, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00224f] text-slate-300 pt-14 pb-8 border-t border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top 4 Trust Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-blue-900/60 text-white">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">Sasta Price Guarantee</h5>
              <p className="text-xs text-blue-200/70 mt-0.5">Real-time cheapest flight, hotel & bus fares with zero hidden charges.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">100% SECP & IATA Certified</h5>
              <p className="text-xs text-blue-200/70 mt-0.5">Official licensed ticketing portal with bank-grade 256-bit encryption.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">24/7 Priority Helpline</h5>
              <p className="text-xs text-blue-200/70 mt-0.5">Round-the-clock live travel agents ready to assist your journey.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">Instant E-Ticket Delivery</h5>
              <p className="text-xs text-blue-200/70 mt-0.5">Receive your official PNR and boarding pass via SMS & Email instantly.</p>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Plane className="w-4 h-4 transform -rotate-45" />
              </div>
              <span className="text-lg font-black text-white">SASTATICKET</span>
            </div>
            <p className="text-blue-200/70 leading-relaxed">
              Pakistan's favorite online travel booking destination. Offering seamless domestic & international flights, verified hotel stays, and intercity express buses.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">Popular Domestic Flights</h5>
            <ul className="space-y-2 text-blue-200/80">
              <li><a href="#" className="hover:text-orange-400 transition">Karachi to Lahore Flights</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Karachi to Islamabad Flights</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Lahore to Dubai Flights</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Islamabad to Jeddah Umrah Flights</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Islamabad to Skardu Direct</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">Top Bus Routes & Hotels</h5>
            <ul className="space-y-2 text-blue-200/80">
              <li><a href="#" className="hover:text-orange-400 transition">Faisal Movers Lahore to Islamabad</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Daewoo Express Lahore to Karachi Sleeper</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Pearl Continental Hotel Lahore</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Serena Hotel Islamabad</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Shangrila Resort Skardu Chalets</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">Customer Support</h5>
            <div className="space-y-2 text-blue-200/80">
              <p>📞 Phone: <strong>+92 21 111-1-SASTA (72782)</strong></p>
              <p>💬 WhatsApp: <strong>+92 300 0727821</strong></p>
              <p>✉️ Email: <strong>support@sastaticket.pk</strong></p>
              <p>🏢 Office: Suite 402, Business Avenue, Shahrah-e-Faisal, Karachi</p>
            </div>
          </div>
        </div>

        {/* Payment Partners & Copyright */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <p className="text-blue-300/70">
            © 2026 SastaTicket Pakistan (Pvt.) Ltd. All Rights Reserved. Designed with Sasta & Luxury Travel Engine.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <span className="text-[11px] font-bold text-blue-200">Supported Payment Methods:</span>
            <span className="bg-white/10 px-2 py-1 rounded text-white font-bold">VISA</span>
            <span className="bg-white/10 px-2 py-1 rounded text-white font-bold">Mastercard</span>
            <span className="bg-emerald-600/30 text-emerald-300 px-2 py-1 rounded font-bold border border-emerald-500/30">Easypaisa</span>
            <span className="bg-red-600/30 text-red-300 px-2 py-1 rounded font-bold border border-red-500/30">JazzCash</span>
            <span className="bg-white/10 px-2 py-1 rounded text-white font-bold">1LINK</span>
            <span className="bg-white/10 px-2 py-1 rounded text-white font-bold">PayPak</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
