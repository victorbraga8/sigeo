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

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { Trash2, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "../loading/loading";

export function TableData() {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3003/features");
        setInfo(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSendToCloud = (item: any) => {
    console.log("Enviando para a nuvem:", item);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = filteredData.filter(
      (item: any) =>
        item.properties.tx_nome?.toLowerCase().includes(value) ||
        item.properties.tx_status?.toLowerCase().includes(value) ||
        item.properties.tx_bairro?.toLowerCase().includes(value) ||
        item.properties.tx_equipamentos?.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredData(info);
  };

  return (
    <div className="relative">
      {/* Loader com fade no fundo */}
      {loading && <Loading />}

      {/* Conteúdo da Tabela - Mostra apenas quando o carregamento terminar */}
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
              {filteredData.length > 0 ? (
                filteredData.map((item: any) => (
                  <TableRow key={item.id} className="hover:bg-gray-100">
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
                  Total de Praças - {filteredData.length || 0}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
}
