import { MapPin, Clock, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function AddressHoursBlock() {
  const { address, hours, phone } = CONTACT;

  return (
    <section className="bg-off-white py-6 border-y border-[#E5E5E5]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:divide-x md:divide-[#E0E0E0] justify-center items-center">
          <div className="flex items-center gap-3 text-text-body md:px-8">
            <div className="bg-primary-dark/10 rounded-full p-2">
              <MapPin className="h-4 w-4 text-primary-dark" />
            </div>
            <span className="text-sm font-medium">
              {address.street}, {address.city}, {address.state} {address.zip}
            </span>
          </div>
          <div className="flex items-center gap-3 text-text-body md:px-8">
            <div className="bg-primary-dark/10 rounded-full p-2">
              <Clock className="h-4 w-4 text-primary-dark" />
            </div>
            <span className="text-sm font-medium">{hours.weekdays}</span>
          </div>
          <div className="flex items-center gap-3 text-text-body md:px-8">
            <div className="bg-primary-dark/10 rounded-full p-2">
              <Phone className="h-4 w-4 text-primary-dark" />
            </div>
            <a href={`tel:${phone}`} className="text-sm font-medium text-primary-dark hover:text-accent transition-colors no-underline">
              {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
