import React from 'react';
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { FileText, Printer, ArrowLeft } from "lucide-react";
import useSound from "../hooks/use-sound";

const OrderDetails = ({ orderDetails, onNewOrder }) => {
  const { playButtonClick, playPigGrunt } = useSound();

  const handlePrint = () => {
    playButtonClick();
    window.print();
  };

  const handleNewOrder = () => {
    playButtonClick();
    onNewOrder();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--primary-color)] font-[var(--header-font)]">Potwierdzenie zamówienia</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="flex items-center gap-2"
            onMouseEnter={playButtonClick}
          >
            <Printer className="h-4 w-4" />
            Drukuj
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              playPigGrunt();
              // W rzeczywistej aplikacji tutaj byłoby pobieranie PDF
              alert("Funkcja eksportu do PDF zostanie zaimplementowana w przyszłości.");
            }}
            className="flex items-center gap-2"
            onMouseEnter={playButtonClick}
          >
            <FileText className="h-4 w-4" />
            Eksportuj PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border rounded-lg bg-[var(--background-color)]">
        <div>
          <h3 className="text-lg font-semibold mb-4">Dane zamawiającego</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Firma:</span> {orderDetails.customerName}</p>
            <p><span className="font-medium">Email:</span> {orderDetails.customerEmail}</p>
            <p><span className="font-medium">Telefon:</span> {orderDetails.customerPhone}</p>
            <p><span className="font-medium">Adres dostawy:</span> {orderDetails.deliveryAddress}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Szczegóły zamówienia</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Numer zamówienia:</span>{' '}
              {`ZAM-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`}
            </p>
            <p>
              <span className="font-medium">Data złożenia:</span>{' '}
              {format(new Date(), "PPP", { locale: pl })}
            </p>
            <p>
              <span className="font-medium">Data dostawy:</span>{' '}
              {format(orderDetails.deliveryDate, "PPP", { locale: pl })}
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">
                Oczekujące na potwierdzenie
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--primary-color)]/10">
            <TableRow>
              <TableHead>Produkt</TableHead>
              <TableHead className="text-center">Ilość</TableHead>
              <TableHead className="text-right">Cena jedn.</TableHead>
              <TableHead className="text-right">Wartość</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetails.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                </TableCell>
                <TableCell className="text-center">
                  {product.quantity} {product.unit}
                </TableCell>
                <TableCell className="text-right">{product.price.toFixed(2)} zł</TableCell>
                <TableCell className="text-right font-medium">
                  {(product.price * product.quantity).toFixed(2)} zł
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-[var(--background-color)]">
              <TableCell colSpan={3} className="text-right font-bold">
                Suma:
              </TableCell>
              <TableCell className="text-right font-bold text-[var(--primary-color)]">
                {orderDetails.totalAmount.toFixed(2)} zł
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {orderDetails.notes && (
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-semibold mb-2">Uwagi do zamówienia</h3>
          <p className="whitespace-pre-wrap">{orderDetails.notes}</p>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleNewOrder}
          className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
          onMouseEnter={playButtonClick}
        >
          <ArrowLeft className="h-4 w-4" />
          Złóż nowe zamówienie
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
