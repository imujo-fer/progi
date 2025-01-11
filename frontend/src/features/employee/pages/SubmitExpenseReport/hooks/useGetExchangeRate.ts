import { ExpenseReportItemDTOCurrencyEnum } from "@/api_gen";
import { exchangeRateApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

type UseGetExchangeRateProps = {
  currency: ExpenseReportItemDTOCurrencyEnum;
  currencyValue: number;
};

export type ExchangeRateResponse = {
  broj_tecajnice: string;
  datum_primjene: string;
  drzava: string;
  drzava_iso: string;
  kupovni_tecaj: string;
  prodajni_tecaj: string;
  sifra_valute: string;
  srednji_tecaj: string;
  valuta: string;
};

export type ExchangeRate = {
  broj_tecajnice: string;
  datum_primjene: string;
  drzava: string;
  drzava_iso: string;
  kupovni_tecaj: number;
  prodajni_tecaj: number;
  sifra_valute: string;
  srednji_tecaj: number;
  valuta: string;
};

export default function useGetExchangeRate({
  currency,
  currencyValue,
}: UseGetExchangeRateProps) {
  const { data } = useQuery({
    queryKey: ["exchange_rate", currency],
    queryFn: async () => {
      const response = await exchangeRateApi.getExchangeRates({ currency });

      const data = response.data as unknown as ExchangeRateResponse[];
      const firstExchangeRate = data[0];
      if (!firstExchangeRate) throw new Error("No exchange rates found");

      const exchangeRate: ExchangeRate = {
        ...firstExchangeRate,
        kupovni_tecaj: parseFloat(
          firstExchangeRate.kupovni_tecaj.replace(",", ".")
        ),
        prodajni_tecaj: parseFloat(
          firstExchangeRate.prodajni_tecaj.replace(",", ".")
        ),
        srednji_tecaj: parseFloat(
          firstExchangeRate.srednji_tecaj.replace(",", ".")
        ),
      };

      return exchangeRate;
    },
    enabled: currency !== ExpenseReportItemDTOCurrencyEnum.Eur,
  });

  if (currency === ExpenseReportItemDTOCurrencyEnum.Eur)
    return { eurValue: currencyValue };

  const eurValue = data ? currencyValue / data?.srednji_tecaj : 0;
  return { eurValue };
}
