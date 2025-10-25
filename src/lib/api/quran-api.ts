import type { SurahDetail, Ayah } from '@/types/quran';

// This is a dummy implementation to fix the build.
// TODO: Replace with actual API call to fetch surah details.
export const getSurahDetail = async (surahNumber: number): Promise<SurahDetail> => {

  // Dummy data that matches the SurahDetail interface
  const dummyAyah: Ayah = {
    number: 1,
    text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    numberInSurah: 1,
    juz: 1,
    page: 1,
  };

  const dummySurahDetail: SurahDetail = {
    number: surahNumber,
    name: "Al-Fatiha",
    englishName: "The Opening",
    englishNameTranslation: "The Opening",
    revelationType: "Meccan",
    numberOfAyahs: 7,
    ayahs: [dummyAyah],
  };

  return Promise.resolve(dummySurahDetail);
};
