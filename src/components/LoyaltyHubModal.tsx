import React from 'react';
import { X, Crown, Sparkles, Award, Gift, ArrowUpRight, ArrowDownLeft, CheckCircle2, Zap } from 'lucide-react';
import { LoyaltyProfile, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';

interface LoyaltyHubModalProps {
  loyaltyProfile: LoyaltyProfile;
  currency: Currency;
  onClose: () => void;
  onRedeemReward: (rewardName: string, pointsCost: number) => void;
}

export const LoyaltyHubModal: React.FC<LoyaltyHubModalProps> = ({
  loyaltyProfile,
  currency,
  onClose,
  onRedeemReward,
}) => {
  const REWARD_STORE = [
    {
      id: 'r-1',
      title: 'PKR 1,000 Sasta Travel Voucher',
      pointsCost: 2000,
      description: 'Instant PKR 1,000 credit on any domestic or international booking',
      badge: 'POPULAR'
    },
    {
      id: 'r-2',
      title: 'Free CIP Executive Airport Lounge Pass',
      pointsCost: 3500,
      description: 'Single-entry pass to CIP Lounges in Karachi, Lahore, or Islamabad',
      badge: 'VIP PERK'
    },
    {
      id: 'r-3',
      title: '+10kg Free Domestic Luggage Voucher',
      pointsCost: 1800,
      description: 'Applicable on PIA, AirSial, and Serene Air domestic flights',
      badge: 'SAVER'
    },
    {
      id: 'r-4',
      title: 'Free 5-Star Hotel Buffet Breakfast',
      pointsCost: 1200,
      description: 'Complimentary morning buffet upgrade at partner luxury hotels',
      badge: 'DINING'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 my-6">
        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-[#003580] via-blue-900 to-indigo-950 text-white p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                    Sasta Rewards Club
                  </span>
                  <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                    {loyaltyProfile.tier}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  {loyaltyProfile.pointsBalance.toLocaleString()} <span className="text-sm font-medium text-blue-200">Available Points</span>
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              id="close-loyalty-modal-btn"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tier Progress Bar */}
          <div className="mt-5 bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10 space-y-1.5 relative z-10">
            <div className="flex justify-between text-xs font-bold text-blue-100">
              <span>Current: Gold Tier (2x Points multiplier)</span>
              <span>Next: Platinum (5,000 Pts)</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full"
                style={{ width: `${Math.min(100, (loyaltyProfile.pointsBalance / 5000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* 1. Rewards Redemption Store */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Gift className="w-4 h-4 text-orange-500" />
                <span>Redeem Rewards Store</span>
              </h4>
              <span className="text-xs text-slate-400">Instant Digital Delivery</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REWARD_STORE.map((reward) => {
                const canAfford = loyaltyProfile.pointsBalance >= reward.pointsCost;
                return (
                  <div
                    key={reward.id}
                    className="bg-slate-50 border border-slate-200 hover:border-amber-400 rounded-2xl p-4 transition-all flex flex-col justify-between space-y-3 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                          {reward.badge}
                        </span>
                        <span className="text-xs font-black text-blue-950">
                          {reward.pointsCost.toLocaleString()} Pts
                        </span>
                      </div>
                      <h5 className="font-extrabold text-xs text-slate-900 leading-snug">
                        {reward.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {reward.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onRedeemReward(reward.title, reward.pointsCost)}
                      disabled={!canAfford}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{canAfford ? 'Redeem Voucher' : 'Need More Points'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Transaction History */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-900" />
              <span>Points Activity History</span>
            </h4>

            <div className="space-y-2">
              {loyaltyProfile.history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      item.type === 'EARNED' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.type === 'EARNED' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-800">{item.description}</p>
                      <p className="text-[10px] text-slate-400">{item.date} • Ref: {item.bookingRef}</p>
                    </div>
                  </div>

                  <span className={`font-black ${
                    item.type === 'EARNED' ? 'text-emerald-600' : 'text-orange-600'
                  }`}>
                    {item.points > 0 ? `+${item.points}` : item.points} Pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
