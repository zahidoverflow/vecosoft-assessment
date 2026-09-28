"use client";

import { useState } from "react";
import OrderTracking, { OrderState } from "@/components/OrderTracking";

export default function Home() {
  const [state, setState] = useState<OrderState>("in-progress");

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-md mx-auto mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Testing Controls (Evaluator)
          </h2>
          <div className="flex flex-wrap gap-2">
            {(["in-progress", "delayed", "not-received", "no-tracking"] as OrderState[]).map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  state === s 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <OrderTracking orderState={state} />
    </main>
  );
}
