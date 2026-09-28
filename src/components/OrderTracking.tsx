"use client";

import React from "react";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Info,
  HelpCircle,
  MapPin,
  MessageSquare
} from "lucide-react";

export type OrderState = 'in-progress' | 'delayed' | 'not-received' | 'no-tracking';

interface OrderTrackingProps {
  orderState: OrderState;
}

export default function OrderTracking({ orderState }: OrderTrackingProps) {
  const steps = [
    { id: 1, label: "Processing", icon: Package },
    { id: 2, label: "Shipped", icon: Truck },
    { id: 3, label: "Out for Delivery", icon: MapPin },
    { id: 4, label: "Delivered", icon: CheckCircle },
  ];

  let currentStep = 2; // Default for in-progress/delayed
  if (orderState === 'no-tracking') currentStep = 1;
  if (orderState === 'not-received') currentStep = 4;

  const renderStatusAlert = () => {
    switch (orderState) {
      case 'delayed':
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-amber-800 font-semibold text-sm">Delivery Delayed</h4>
              <p className="text-amber-700 text-sm mt-1">
                Your package has been delayed in transit. We apologize for the inconvenience. Our new estimated delivery is Oct 2, 2026.
              </p>
            </div>
          </div>
        );
      case 'not-received':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <HelpCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-red-800 font-semibold text-sm">Package Not Received?</h4>
              <p className="text-red-700 text-sm mt-1">
                The tracking shows delivered, but if you haven't received it, please check around your property or contact support for immediate assistance.
              </p>
            </div>
          </div>
        );
      case 'no-tracking':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-blue-800 font-semibold text-sm">Preparing to Ship</h4>
              <p className="text-blue-700 text-sm mt-1">
                Your order is confirmed and being prepared. Tracking information will be available once the carrier scans the package.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen sm:min-h-0 sm:rounded-2xl sm:shadow-xl sm:border border-gray-100 overflow-hidden text-slate-800">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 border-b border-gray-100 bg-slate-50">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Order Number</span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono font-bold text-slate-700">#ORD-99824X</span>
          <span className="text-slate-600 text-sm">Sep 28, 2026</span>
        </div>
      </div>

      <div className="p-6">
        {/* Expected Delivery block */}
        <div className="mb-8 text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {orderState === 'not-received' ? 'Delivery Status' : 'Expected Delivery'}
          </h2>
          <div className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
            {orderState === 'no-tracking' ? (
              <span className="text-xl text-slate-400 font-medium">Pending Carrier Scan</span>
            ) : orderState === 'not-received' ? (
              <span>Delivered Sep 27</span>
            ) : orderState === 'delayed' ? (
              <>
                <Clock className="text-amber-500" size={28} />
                <span className="text-amber-600">Arriving Oct 2</span>
              </>
            ) : (
              <span>Tomorrow by 8 PM</span>
            )}
          </div>
        </div>

        {renderStatusAlert()}

        {/* Timeline */}
        <div className="relative py-4">
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100" />
          
          <div className="space-y-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.id <= currentStep;
              const isCurrent = step.id === currentStep;
              const isDelayedStep = orderState === 'delayed' && step.id === 3;
              
              let dotClass = "bg-gray-100 text-gray-400 ring-4 ring-white";
              if (isCompleted) dotClass = "bg-blue-600 text-white ring-4 ring-white";
              if (isCurrent && orderState !== 'not-received' && orderState !== 'no-tracking') {
                 if (orderState === 'delayed') {
                    dotClass = "bg-amber-500 text-white ring-4 ring-white ring-offset-2 ring-offset-amber-100";
                 } else {
                    dotClass = "bg-blue-600 text-white ring-4 ring-blue-100";
                 }
              }

              return (
                <div key={step.id} className="flex items-center group">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${dotClass}`}>
                    <Icon size={20} />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`font-semibold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </h3>
                    {isCurrent && orderState === 'delayed' && (
                      <p className="text-xs text-amber-600 font-medium mt-0.5">Delayed in transit</p>
                    )}
                    {step.id === 1 && (
                      <p className={`text-xs mt-0.5 ${isCompleted ? 'text-slate-500' : 'text-slate-300'}`}>
                        Order confirmed
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 p-6 border-t border-gray-100 flex flex-col gap-3">
        {orderState === 'not-received' ? (
          <>
            <button className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-slate-200 flex justify-center items-center gap-2">
              <MessageSquare size={18} />
              Report Missing Package
            </button>
            <button className="w-full py-3.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all">
              View Order Details
            </button>
          </>
        ) : (
          <>
            <button className="w-full py-3.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all flex justify-center items-center gap-2">
              <MessageSquare size={18} />
              Contact Support
            </button>
          </>
        )}
      </div>
    </div>
  );
}
