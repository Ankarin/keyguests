import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Cta() {
  return (
    <div className="items-center space-x-4 ">
      <Link href="/me">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Cta;
