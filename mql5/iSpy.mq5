//+------------------------------------------------------------------+
//|                                                         iSpy.mq5 |
//|                                            Copyright 2022, Lizar |
//|                                               lizar-2022@mail.ru |
//+------------------------------------------------------------------+
#define VERSION         "1.00"
#property copyright   "Copyright 20220, Lizar"
#property link        ""
#property version     VERSION
#property description "Индикатор iSpy - индикатор-шпион. Запускается на нужном торговом инструменте для получения тиков"
#property indicator_chart_window

input long            chart_id=0;        // идентификатор графика-получателя события
input ushort          custom_event_id=0; // идентификатор события

//---- для расчёта и отрисовки индикатора использовано ноль буферов
#property indicator_buffers 0
//---- использовано всего ноль графических построений
#property indicator_plots   0

//+------------------------------------------------------------------+
//| Custom indicator iteration function                              |
//+------------------------------------------------------------------+
int OnCalculate (const int rates_total,      // размер массива price[]
                 const int prev_calculated,  // обработано баров на предыдущем вызове
                 const int begin,            // откуда начинаются значимые данные
                 const double& price[]       // массив для расчета
   )
  {
   double price_current=price[rates_total-1];

   //--- Инициализация:
   if(prev_calculated==0) 
     { // Генерируем и отправляем событие "Инициализация"
      EventChartCustom(chart_id,0,(long)_Period,price_current,_Symbol);
      return(rates_total);
     }
   
   // При появлении нового бара генерируем пользовательское событие "новый тик", 
   // которое можно будет поймать в эксперте или индикаторе
   EventChartCustom(chart_id, (ushort)(custom_event_id+1),(long)_Period,price_current,_Symbol);
   
   //--- return value of prev_calculated for next call
   return(rates_total);
  }
//+------------------------------------------------------------------+
