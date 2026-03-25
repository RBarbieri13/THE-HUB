import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function LoginPromptBanner() {
  return (
    <Card className="bg-dark border-none">
      <CardContent className="p-8 md:p-12 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
          See Full Inventory Details
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Create a free account or log in to view detailed equipment
          information, check availability in real time, and express interest in
          items you need.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center bg-accent text-white px-[30px] py-[14px] font-heading font-semibold rounded-none hover:bg-[#D45F1F] transition-all"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center border-2 border-white text-white px-[30px] py-[14px] font-heading font-semibold rounded-none hover:bg-white hover:text-dark transition-all"
          >
            Log In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
