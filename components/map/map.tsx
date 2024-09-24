"use client";
import { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import { SimpleRenderer } from "@arcgis/core/renderers"; // Importando o SimpleRenderer

interface MapComponentProps {
  geojsonUrl: string; // URL do arquivo GeoJSON
}

export default function MapComponent({ geojsonUrl }: MapComponentProps) {
  const mapDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        basemap: "streets",
      });

      // Carregar o GeoJSON usando fetch
      fetch(geojsonUrl)
        .then((response) => response.json())
        .then((geojsonData) => {
          const geojsonLayer = new GeoJSONLayer({
            // Usa o URL diretamente ou o arquivo GeoJSON diretamente
            url: geojsonUrl, // Se usar um URL para o GeoJSON
            // Caso queira usar dados diretamente, pode ser configurado usando um Blob
          });

          webmap.add(geojsonLayer);

          const view = new MapView({
            container: mapDiv.current as HTMLDivElement, // Certifique-se que o container é o HTMLDivElement correto
            map: webmap,
            center: [-43.1, -22.9], // Coordenadas aproximadas de Niterói
            zoom: 12,
          });

          // Limpar a view ao desmontar o componente
          return () => {
            if (view) {
              view.destroy();
            }
          };
        });
    }
  }, [geojsonUrl]);

  return <div ref={mapDiv} style={{ width: "100%", height: "500px" }}></div>;
}
