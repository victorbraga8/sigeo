import BodyTitle from "@/components/home/body-title";
import { TableData } from "@/components/home/table";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/map/map"), {
  ssr: false,
});

export default function Home() {
  const geojsonUrl = "/data/data.geojson";
  return (
    <div className="grid justify-items-center min-h-screen p-8 font-[family-name: var(--font-geist-sans)]">
      <main className="flex flex-col justify-center text-center gap-8 row-start-2 items-center mb-auto">
        <BodyTitle />
        <TableData />

        <MapComponent geojsonUrl={geojsonUrl} />
      </main>
    </div>
  );
}
