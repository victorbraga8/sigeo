// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

import { Trash2, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "../loading/loading";
import { useSearch } from "@/context/SearchContext";
import { db } from "@/server";
import { places } from "@/server/schema";
import { eq } from "drizzle-orm";
import { toast } from "react-toastify";

export function TableData() {
  const { searchTerm, updateSearchTerm } = useSearch();
  const [info, setInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.URL_API!);
        setInfo(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSendToCloud = useCallback(async (item: any) => {
    toast.info("Enviando para Nuvem", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    try {
      const existingRecord = await db
        .select()
        .from(places)
        .where(eq(places.tx_nome, item.properties.tx_nome));

      if (existingRecord.length > 0) {
        toast.warn("Registro já existe na base", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        return;
      }

      await db.insert(places).values({
        objectid: item.properties.objectid,
        globalid: item.properties.globalid,
        tx_nome: item.properties.tx_nome,
        tx_status: item.properties.tx_status,
        tx_reg_adm: item.properties.tx_reg_adm,
        tx_bairro: item.properties.tx_bairro,
        tx_mesapingpong: item.properties.tx_mesapingpong,
        tx_parcao: item.properties.tx_parcao,
        tx_camposociety: item.properties.tx_camposociety,
        tx_qdpoliesport: item.properties.tx_qdpoliesport,
        tx_qdvolei: item.properties.tx_qdvolei,
        tx_pistaskate: item.properties.tx_pistaskate,
        tx_churrasqueira: item.properties.tx_churrasqueira,
        tx_playg_madplastica: item.properties.tx_playg_madplastica,
        tx_banc_madei: item.properties.tx_banc_madei,
        tx_banc_concr: item.properties.tx_banc_concr,
        tx_playg_madeira: item.properties.tx_playg_madeira,
        tx_balanco: item.properties.tx_balanco,
        tx_balan_aces: item.properties.tx_balan_aces,
        tx_escorregad: item.properties.tx_escorregad,
        tx_gangorra: item.properties.tx_gangorra,
        tx_gira_gira: item.properties.tx_gira_gira,
        tx_trepa_trepa: item.properties.tx_trepa_trepa,
        tx_busto: item.properties.tx_busto,
        tx_coreto: item.properties.tx_coreto,
        tx_lixeira: item.properties.tx_lixeira,
        tx_mesa_concreto: item.properties.tx_mesa_concreto,
        tx_pergula: item.properties.tx_pergula,
        tx_apar_ginas_mad: item.properties.tx_apar_ginas_mad,
        tx_aca_terc_idade: item.properties.tx_aca_terc_idade,
        tx_apa_gina_inox: item.properties.tx_apa_gina_inox,
        tx_equipamentos: item.properties.tx_equipamentos,
        tx_paraciclos: item.properties.tx_paraciclos,
        latitude: item.geometry.coordinates[1].toString(),
        longitude: item.geometry.coordinates[0].toString(),
      });

      toast.success("Registro inserido com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error(`Erro ao enviar para a nuvem: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchTerm(e.target.value.toLowerCase());
    },
    [updateSearchTerm]
  );

  const handleClearSearch = useCallback(() => {
    updateSearchTerm("");
  }, [updateSearchTerm]);

  const filteredResults = useMemo(() => {
    if (!searchTerm) return info;

    return info.filter(
      (item: any) =>
        item.properties.tx_bairro?.toLowerCase().includes(searchTerm)
      // ||
      //   item.properties.tx_nome?.toLowerCase().includes(searchTerm) ||
      //   item.properties.tx_status?.toLowerCase().includes(searchTerm) ||
      //   item.properties.tx_equipamentos?.toLowerCase().includes(searchTerm)
    );
  }, [info, searchTerm]);

  return (
    <div className="relative">
      {loading && <Loading />}

      {!loading && (
        <div className="overflow-auto w-full">
          <div className="mb-8 w-4/12 flex flex-col ml-1" id="search">
            <label htmlFor="search" className="text-start">
              Pesquisa de Dados
            </label>
            <div className="flex justify-between gap-2">
              <Input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Digite a sua pesquisa"
              />
              {searchTerm && (
                <Button
                  onClick={handleClearSearch}
                  className="h-8 w-8 relative bg-amber-600 hover:bg-amber-800"
                >
                  <Trash2 size={20} className="absolute inset-0 m-auto" />
                </Button>
              )}
            </div>
          </div>

          <Table
            className="min-w-full border-separate table-fixed h-[400px] overflow-hidden pb-8"
            style={{ borderSpacing: 0 }}
          >
            <TableHeader className="bg-gray-200 sticky top-0 shadow-md">
              <TableRow>
                <TableHead className="p-2 text-left border-b-2 border-gray-300 w-[17.7%]">
                  Praça
                </TableHead>
                <TableHead className="p-2 text-left border-b-2 border-gray-300 w-[5.5%]">
                  Status
                </TableHead>
                <TableHead className="p-2 text-center pr-12 border-b-2 border-gray-300 w-[7%]">
                  Bairro
                </TableHead>
                <TableHead className="p-2 text-left border-b-2 border-gray-300 w-[25%]">
                  Equipamentos
                </TableHead>
                <TableHead className="p-2 text-center border-b-2 border-gray-300 w-[10%]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="max-h-[40vh] w-screen overflow-y-scroll block">
              {filteredResults.length > 0 ? (
                filteredResults.map((item: any) => (
                  <TableRow
                    key={item.properties.globalid}
                    className="hover:bg-gray-100"
                  >
                    <TableCell className="p-2 font-medium border-b text-left w-[16%]">
                      {item.properties.tx_nome || "N/A"}
                    </TableCell>
                    <TableCell className="p-2 border-b text-center w-[4.5%]">
                      {item.properties.tx_status || "N/A"}
                    </TableCell>
                    <TableCell className="p-2 border-b text-center w-[9%]">
                      {item.properties.tx_bairro || "N/A"}
                    </TableCell>
                    <TableCell className="p-2 border-b text-left w-[25%] max-w-[250px] whitespace-normal break-words">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              {item.properties.tx_equipamentos || "N/A"}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.properties.tx_equipamentos}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="p-2 text-center border-b w-[10%]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-4 px-4 rounded h-8 w-8 relative"
                              onClick={() => handleSendToCloud(item)}
                            >
                              <UploadCloud className="absolute inset-0 m-auto" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enviar para Nuvem</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="p-2 text-center">
                    Nenhuma correspondência encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="p-2 font-bold">
                  Total de Praças - {filteredResults.length || 0}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
}
