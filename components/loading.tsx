// components/Loading.tsx

import { Loader } from "lucide-react";
import React from "react";

const Loading = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="text-center">
      <Loader className="h-10 w-10 animate-spin"></Loader>
      <p className="mt-2">Loading...</p>
    </div>
  </div>
);

export default Loading;
