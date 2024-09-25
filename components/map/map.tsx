// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import { useSearch } from "@/context/SearchContext";
import helpers from "@/lib/helpers";

interface MapComponentProps {
  geojsonUrl: string;
}

export default function MapComponent({ geojsonUrl }: MapComponentProps) {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<MapView | null>(null);
  const geojsonLayerRef = useRef<GeoJSONLayer | null>(null);
  const { searchTerm } = useSearch();
  // const [webmap, setWebmap] = useState<WebMap | null>(null);

  const initializeMap = useCallback(() => {
    if (mapDiv.current && !viewRef.current) {
      const webmapInstance = new WebMap({
        basemap: "satellite",
      });

      fetch(geojsonUrl)
        .then((response) => response.json())
        .then(() => {
          const geojsonLayer = new GeoJSONLayer({
            url: geojsonUrl,

            popupTemplate: {
              title: "{tx_nome}",
              content: `
                <p><strong>Status:</strong> {tx_status}</p>
                <p><strong>Bairro:</strong> {tx_bairro}</p>
                <p><strong>Equipamentos:</strong> {tx_equipamentos}</p>
                <p><strong>Região Administrativa:</strong> {tx_reg_adm}</p>
                <p><strong>Quadra Poliesportiva:</strong> {tx_qdpoliesport}</p>
                <p><strong>Playground:</strong> {tx_play_madplast}</p>
                <p><strong>Pista de Skate:</strong> {tx_pistskate}</p>
                <p><strong>Churrasqueira:</strong> {tx_churrasqueira}</p>
              `,
            },
          });

          geojsonLayerRef.current = geojsonLayer;
          webmapInstance.add(geojsonLayer);

          const view = new MapView({
            container: mapDiv.current as HTMLDivElement,
            map: webmapInstance,
            center: [-43.1, -22.9],
            zoom: 12,

            navigation: {
              mouseWheelZoomEnabled: false,
              browserTouchPanEnabled: true,
            },
          });

          viewRef.current = view;
          // setWebmap(webmapInstance);
        });
    }
  }, [geojsonUrl]);

  useEffect(() => {
    initializeMap();
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [initializeMap]);

  useEffect(() => {
    if (geojsonLayerRef.current) {
      const expression = searchTerm
        ? `tx_bairro LIKE '%${helpers.toTitleCase(searchTerm)}%'`
        : "1=1";

      geojsonLayerRef.current.definitionExpression = expression;

      if (viewRef.current && !searchTerm) {
        viewRef.current.popup.clear();
        viewRef.current.graphics.removeAll();
      }

      console.log("Search term:", searchTerm);
      console.log("Expression:", expression);
    }
  }, [searchTerm]);

  return <div ref={mapDiv} style={{ width: "100%", height: "500px" }}></div>;
}
