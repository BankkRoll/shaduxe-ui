// config/pricing.ts

const pricingConfig = {
  pricing: {
    personal: {
      title: "PRO License - Personal",
      basePrice: 9900, // $99 starting price
      maxPrice: 16900, // Max price cap ($169)
      priceIncrement: 1400, // $14 increase per template
      originalPrice: 29900, // $299 original price for comparison
      features: [
        "All current and future PRO components/blocks/templates",
        "Commercial usage for unlimited projects",
        "Perpetual license - own the templates forever",
        "Lifetime updates at no extra cost",
        "Source code with full customization rights",
        "Premium Discord Support",
        "Early access to new templates",
      ],
    },
    team: {
      title: "PRO License - Teams",
      basePrice: 22900, // $229 starting price
      maxPrice: 39900, // Max price cap ($399)
      priceIncrement: 1400, // $14 increase per template
      originalPrice: 49900, // $499 original price for comparison
      additionalFeatures: [
        "Everything in personal license",
        "20 developer licenses for your team",
        "Team license management dashboard",
        "Priority Discord Support",
      ],
    },
  },
  stats: {
    totalValue: 250000, // $2,500+ in cents
    averageTemplateMinPrice: 4900, // $49 average individual template price min
    averageTemplateMaxPrice: 6900, // $69 average individual template price max
  },
};

// Helper function to calculate current price based on template count
export function calculateCurrentPrice(
  basePrice: number,
  maxPrice: number,
  increment: number,
  templateCount: number,
): number {
  const calculatedPrice = basePrice + increment * templateCount;
  return Math.min(calculatedPrice, maxPrice);
}

// Helper function to calculate savings percentage
export function calculateSavings(
  currentPrice: number,
  totalValue: number,
): number {
  return Math.round(((totalValue - currentPrice) / totalValue) * 100);
}

export default pricingConfig;
