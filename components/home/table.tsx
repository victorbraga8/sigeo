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

import CloudUpload, { UploadCloud } from "lucide-react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableData() {
  const [info, setInfo] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3003/features");
        setInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSendToCloud = (item: any) => {
    console.log("Enviando para a nuvem:", item);
  };

  return (
    <div className="overflow-auto w-full">
      <Table
        className="min-w-full border-separate table-fixed h-[400px] overflow-hidden pb-8"
        style={{ borderSpacing: 0 }}
      >
        <TableHeader className="bg-gray-200 sticky top-0 shadow-md">
          <TableRow>
            <TableHead className="p-2 text-left border-b-2 border-gray-300 w-[16.7%]">
              Praça
            </TableHead>
            <TableHead className="p-2 text-left border-b-2 border-gray-300 w-[5.5%]">
              Status
            </TableHead>
            <TableHead className="p-2 text-left border-b-2 border-gray-300 w-[15%]">
              Bairro
            </TableHead>
            <TableHead className="p-2 text-left border-b-2 border-gray-300 w-[25%]">
              Equipamentos
            </TableHead>
            <TableHead className="p-2 text-center border-b-2 border-gray-300 w-[10%]">
              Enviar para Nuvem
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[40vh] w-screen overflow-y-scroll block">
          {info?.map((item: any) => (
            <TableRow key={item.id} className="hover:bg-gray-100">
              <TableCell className="p-2 font-medium border-b text-left w-[16%]">
                {item.properties.tx_nome || "N/A"}
              </TableCell>
              <TableCell className="p-2 border-b text-left w-[4.5%]">
                {item.properties.tx_status || "N/A"}
              </TableCell>
              <TableCell className="p-2 border-b text-left w-[9%]">
                {item.properties.tx_bairro || "N/A"}
              </TableCell>
              <TableCell className="p-2 border-b text-left w-[25%] max-w-[250px] whitespace-normal break-words">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{item.properties.tx_equipamentos || "N/A"}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.properties.tx_equipamentos}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>

              <TableCell className="p-2 text-center border-b w-[10%]">
                <Button
                  className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-4 px-4 rounded h-8 w-8 relative"
                  onClick={() => handleSendToCloud(item)}
                >
                  <UploadCloud className="absolute inset-0 m-auto" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="p-2 font-bold">
              Total de Praças - {info?.length || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
