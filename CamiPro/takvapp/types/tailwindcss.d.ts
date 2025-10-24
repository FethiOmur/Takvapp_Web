declare module "tailwindcss/lib/util/flattenColorPalette" {
  import type { ResolvedColorValue } from "tailwindcss/types/config";

  function flattenColorPalette(
    colors: Record<string, string | Record<string, string>>,
  ): Record<string, ResolvedColorValue>;

  export default flattenColorPalette;
}
