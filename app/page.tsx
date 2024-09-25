"use client";
import BodyTitle from "@/components/home/body-title";
import { TableData } from "@/components/home/table";
import MapComponent from "@/components/map/map";
import { SearchProvider } from "@/context/SearchContext";

export default function Home() {
  const geojsonUrl = "/data/data.geojson";
  return (
    <div className="grid justify-items-center min-h-screen p-8 font-[family-name: var(--font-geist-sans)]">
      <main className="flex flex-col justify-center text-center gap-8 row-start-2 items-center mb-auto">
        <BodyTitle />
        <SearchProvider>
          <TableData />
          <div className="w-full">
            <MapComponent geojsonUrl={geojsonUrl} />
          </div>
        </SearchProvider>
      </main>
    </div>
  );
}
