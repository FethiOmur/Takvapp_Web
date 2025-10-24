"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMonthlyPrayerTimes } from "@/lib/api/aladhan";
import { LocationData } from "@/types/prayer";

interface MonthlyCalendarProps {
  location: LocationData;
}

interface DayPrayerTimes {
  date: string;
  day: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export function MonthlyCalendar({ location }: MonthlyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [monthData, setMonthData] = useState<DayPrayerTimes[]>([]);
  const [loading, setLoading] = useState(false);

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  useEffect(() => {
    const fetchMonthlyData = async () => {
      if (!location.city || !location.country) return;

      setLoading(true);
      try {
        const response = await getMonthlyPrayerTimes(
          location,
          currentMonth,
          currentYear
        );

        const formattedData: DayPrayerTimes[] = response.data.map((day: any) => ({
          date: day.date.gregorian.day,
          day: day.date.gregorian.weekday.en.substring(0, 3),
          fajr: day.timings.Fajr.substring(0, 5),
          dhuhr: day.timings.Dhuhr.substring(0, 5),
          asr: day.timings.Asr.substring(0, 5),
          maghrib: day.timings.Maghrib.substring(0, 5),
          isha: day.timings.Isha.substring(0, 5),
        }));

        setMonthData(formattedData);
      } catch (error) {
        console.error("Failed to fetch monthly prayer times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, [currentMonth, currentYear, location]);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const today = new Date().getDate();
  const isCurrentMonth =
    currentMonth === new Date().getMonth() + 1 &&
    currentYear === new Date().getFullYear();

  return (
    <div className="glass-card rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {monthNames[currentMonth - 1]} {currentYear}
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={handlePrevMonth}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleNextMonth}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-foreground/60 mt-4">Yükleniyor...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-semibold">Gün</th>
                <th className="text-center py-3 px-2 font-semibold">İmsak</th>
                <th className="text-center py-3 px-2 font-semibold">Öğle</th>
                <th className="text-center py-3 px-2 font-semibold">İkindi</th>
                <th className="text-center py-3 px-2 font-semibold">Akşam</th>
                <th className="text-center py-3 px-2 font-semibold">Yatsı</th>
              </tr>
            </thead>
            <tbody>
              {monthData.map((day, index) => {
                const isToday = isCurrentMonth && parseInt(day.date) === today;

                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                      isToday ? "bg-primary/10" : ""
                    }`}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            isToday ? "text-primary" : ""
                          }`}
                        >
                          {day.date}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {day.day}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-2">{day.fajr}</td>
                    <td className="text-center py-3 px-2">{day.dhuhr}</td>
                    <td className="text-center py-3 px-2">{day.asr}</td>
                    <td className="text-center py-3 px-2">{day.maghrib}</td>
                    <td className="text-center py-3 px-2">{day.isha}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

