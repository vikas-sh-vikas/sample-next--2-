"use client";
import Loader from "@/components/ui/loader/loader";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const tiles = [
    { title: "Sales", value: "$30,000", route: "sale" },
    { title: "Purchase", value: "$15,000", route: "purchase" },
    { title: "Receipt", value: "$12,000", route: "receipt" },
    { title: "Payment", value: "$8,000", route: "payment" },
    { title: "Outstanding Receivable", value: "$5,000", route: "sale" },
    { title: "Outstanding Payable", value: "$7,000", route: "sale" },
  ];
  const handleRoute = (title: string) => {
    router.push(`/dashboard/${title}`);
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="">
          <h2 className="text-2xl font-semibold text-gray-700 text-end">
            {"Cash /Balance : $25,000"}
          </h2>
          {/* <p className="text-3xl font-bold text-gray-900 mt-4">{"$25,000"}</p> */}
        </div>
      </div>
      <hr className="mb-5"></hr>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor:pointer"
            onClick={() => handleRoute(tile.route)}
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              {tile.title}
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              {tile.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
