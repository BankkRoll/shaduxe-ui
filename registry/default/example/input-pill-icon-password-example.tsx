"use client";

import { Eye, EyeOff, LockIcon } from "lucide-react";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";

const sizes = [
  { name: "xs", label: "XSmall" },
  { name: "sm", label: "Small" },
  { name: "md", label: "Medium" },
  { name: "lg", label: "Large" },
  { name: "xl", label: "XLarge" },
] as const;

export default function InputIconExample() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-4 p-2">
      {sizes.map((size) => (
        <div
          key={size.name}
          className="relative flex flex-col items-center gap-2"
        >
          <div className="relative w-full max-w-sm">
            <Input
              inputSize={size.name}
              variant="pill"
              type={showPassword ? "text" : "password"}
              placeholder={`${size.label} password input`}
              Icon={LockIcon}
              iconPlacement="left"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
