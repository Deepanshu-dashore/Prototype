// Products data for CC-Mating website
export const products = [
  {
    id: 1,
    slug: "heavy-duty",
    title: "CC HEAVY DUTY",
    subtitle: "High-Performance Flooring System",
    description:
      "CC HEAVY DUTY Mat is a high-performance flooring system that ensures 99.9% foot and wheel Bourne particulate removal over six steps and reduces electro static discharge. CC Heavy Duty should be used in areas with heavy footfall traffic, use of forklifts, motorized pallet trucks and heavy trolleys.",
    image: "/assets/products Page/heavy-duty-new.png",
    gradientColors: {
      primary: "rgb(9, 31, 208)",
      secondary: "rgb(59, 130, 246)",
      dark: "rgb(30, 58, 138)",
    },
    bglinear: "from-blue-600/30 via-blue-500/20 to-primary/30",
    colorOptions: [
      {
        name: "SOLID BLUE",
        image: "/assets/products Page/SolidBlue.png",
        description: "Classic solid blue color option",
      },
      {
        name: "GREY SPECK",
        image: "/assets/products Page/GraySpcek.png",
        description: "Elegant grey speckled finish",
      },
    ],
    benefits: [
      {
        title: "Total Particulate Removal",
        description:
          "Ensures total particulate and bacteria contamination removal before entering your clean room or critical environment with six full steps",
        icon: "CheckBadgeIcon",
      },
      {
        title: "Electro Static Proof",
        description:
          "Provides an electro static proof barrier before entering your critical work area",
        icon: "ShieldCheckIcon",
      },
      {
        title: "Long Life Cycle",
        description: "Life cycle of 4-5 years if properly maintained",
        icon: "ClockIcon",
      },
      {
        title: "2-Year Guarantee",
        description: "Full 2-year replacement guarantee",
        icon: "CheckCircleIcon",
      },
      {
        title: "Cost Effective",
        description: "Huge cost saving in comparison to peel off mats",
        icon: "CurrencyDollarIcon",
      },
      {
        title: "Aesthetic Improvement",
        description:
          "Aesthetic improvement in the appearance of your workplace",
        icon: "PaintBrushIcon",
      },
      {
        title: "Eco-Friendly",
        description:
          "CC HEAVY DUTY Mat is recyclable and environmentally friendly",
        icon: "ArrowPathIcon",
      },
    ],
    warranty: {
      title: "2 Years of Warranty",
      description:
        "All CC Matting products come with a comprehensive 2-year replacement warranty, providing you with complete peace of mind and protection for your investment.",
      additionalInfo:
        "Our warranty ensures that your contamination control mats maintain their high performance standards throughout the warranty period.",
      badgeImage: "/assets/WarentyBadge.png",
    },
  },
  {
    id: 2,
    slug: "classic-ergonomic-mat",
    title: "CC Classic Ergonomic Mat",
    subtitle: "Original Ergonomic Bubble Profile Mat",
    description:
      "The CC Classic Ergonomic Mat is the original ergonomic bubble profile mat. The Classic Mat boasts the longest warranty in the industry. Customers still have many of these original mats in service over 20 years later. Available in 2 profiles: Classic and Classic Deluxe.",
    image: "/assets/products Page/classic-ergonomic-new.jpg",
    gradientColors: {
      primary: "rgb(59, 130, 246)",
      secondary: "rgb(20, 184, 166)",
      dark: "rgb(30, 58, 138)",
    },
    bglinear: "from-blue-600/30 via-blue-500/20 to-primary/30",
    colorOptions: [
      {
        name: "Classic",
        image: "/assets/products Page/Classic Ergonomic Mat/Classic.png",
        thickness: '6" (1.5cm)',
      },
      {
        name: "Classic Deluxe",
        image: "/assets/products Page/Classic Ergonomic Mat/Classic-deluex.png",
        thickness: '6" (1.5cm)',
      },
    ],
    benefitImages: [1, 2, 3, 4],
    benefits: [
      {
        title: "ERGONOMIC",
        description:
          "Designed to stimulate circulation in feet, legs and lower back. Circulation is stimulated by the unique, patented surface profile of the mats, which forces muscular response.",
        icon: "HeartIcon",
      },
      {
        title: "BEVELED EDGES",
        description:
          "Molded w/ bevels. Yellow bevels can be added. Bevels will never curl up, eliminating trip hazards.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ANTI-STATIC",
        description: "Ideal for environments requiring static control.",
        icon: "BoltIcon",
      },
      {
        title: "ISO CLEANROOM CERTIFIED",
        description:
          "Classic Mats are ISO Cleanroom Class 5 (Class 100) rated.",
        icon: "CheckCircleIcon",
      },
      {
        title: "ANY SIZE ANY SHAPE",
        description:
          "Can be custom made in any size and shape, creating one continuous surface to eliminate seams and trip hazards.",
        icon: "ScissorsIcon",
      },
      {
        title: "SILICON FREE",
        description: "All Classic mats are silicon free.",
        icon: "XMarkIcon",
      },
      {
        title: "TRUE WARRANTY",
        description:
          "Classic Mat stands 100% behind our products with full replacement coverage if our product fails to perform as promoted within that period.",
        icon: "ClipboardDocumentCheckIcon",
      },
    ],
    sizes: {
      widths: "Available in 60cm & 90cm widths.",
      standardLengths: "90, 120, 150, 180, 200, 300cms.",
      customSizes:
        "Custom lengths are also available to meet your specific requirements.",
    },
    warranty: {
      title: "8 Years of Longlasting Warranty",
      description:
        "All CC Classic Ergonomic Mat products come with a comprehensive 8-year replacement warranty, providing you with complete peace of mind and protection for your investment. This is the longest warranty in the industry.",
      additionalInfo:
        "Our warranty ensures that your ergonomic mats maintain their high performance standards throughout the warranty period, with full replacement coverage if our product fails to perform as promoted.",
      badgeImage: "/assets/products Page/Classic Ergonomic Mat/warrenty.png",
    },
  },
  {
    id: 3,
    slug: "infinity-ergonomic-mat",
    title: "CC Infinity Ergonomic Mat",
    subtitle: "Durable Polyurethane Ergonomic Mats",
    description:
      "Infinity Series mats are durable polyurethane ergonomic mats with a closed cell surface that resists light moisture and most chemical exposures. Available in ESD version and 3 profiles: Deluxe, Smooth and Bubble.",
    image: "/assets/products Page/CC Infinity Ergonomic Mat/bg.png",
    gradientColors: {
      primary: "rgb(59, 130, 246)",
      secondary: "rgb(20, 184, 166)",
      dark: "rgb(30, 58, 138)",
    },
    bglinear: "from-blue-600/30 via-blue-500/20 to-primary/30",
    colorOptions: [
      {
        name: "Infinity Deluxe",
        image: "/assets/products Page/CC Infinity Ergonomic Mat/deluxe.png",
        thickness: '62" (1.5cm)',
      },
      {
        name: "Infinity Smooth",
        image: "/assets/products Page/CC Infinity Ergonomic Mat/smooth.png",
        thickness: '43" (1.1cm)',
      },
      {
        name: "Infinity Bubble",
        image: "/assets/products Page/CC Infinity Ergonomic Mat/dubble.png",
        thickness: '57" (1.45cm)',
      },
    ],
    benefitImages: [1, 2, 3, 4],
    benefits: [
      {
        title: "ESD OPTION",
        description:
          "Engineered with enhanced static control. Electrical resistance : <1*10^9Ohm",
        icon: "BoltIcon",
      },
      {
        title: "ERGONOMIC",
        description:
          "Designed to stimulate circulation in feet, legs and lower back. Circulation is stimulated by the unique, patented surface profile, which forces muscular response.",
        icon: "HeartIcon",
      },
      {
        title: "BEVELED EDGES",
        description:
          "Molded w/ bevels. Yellow bevels can be added. Bevels will never curl up, eliminating trip hazards.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ISO CLEANROOM CERTIFIED",
        description:
          "Infinity mats are ISO Cleanroom Class 5 (Class 100) rated.",
        icon: "CheckCircleIcon",
      },
      {
        title: "ANY SIZE ANY SHAPE",
        description:
          "Can be custom made in any size and shape, creating one continuous surface to eliminate seams and trip hazards.",
        icon: "ScissorsIcon",
      },
      {
        title: "SILICON FREE",
        description: "All mats are silicon & latex free.",
        icon: "XMarkIcon",
      },
      {
        title: "TRUE WARRANTY",
        description:
          "Entrance Matting Ireland stands 100% behind our products with full replacement coverage if our product fails to perform as promoted within that period.",
        icon: "ClipboardDocumentCheckIcon",
      },
    ],
    sizes: {
      widths: "Available in 60cm & 90cm widths.",
      standardLengths: "90, 120, 150, 180, 200, 300cms.",
      customSizes:
        "Custom lengths are also available to meet your specific requirements.",
    },
    warranty: {
      title: "6 Years of Warranty",
      description:
        "All CC Infinity Ergonomic Mat products come with a comprehensive 6-year replacement warranty, providing you with complete peace of mind and protection for your investment.",
      additionalInfo:
        "Our warranty ensures that your ergonomic mats maintain their high performance standards throughout the warranty period, with full replacement coverage if our product fails to perform as promoted.",
      badgeImage:
        "/assets/products Page/CC Infinity Ergonomic Mat/warenty6Year.png",
    },
  },
  {
    id: 4,
    slug: "complete-ergonomic-mat",
    title: "CC Complete Ergonomic Mat",
    subtitle: "Feature Rich Ergonomic Mats",
    description:
      "The CC Complete Series ergonomic mats are feature rich. They can tolerate mild exposure to oils and other liquids while providing enhanced anti-static protection. It is self-extinguishing when introduced to open flame, which qualifies Complete Mats as fire retardant according to standard EN 13501-1. Available in ESD version, and 3 profiles: Deluxe, Smooth and Bubble.",
    image: "/assets/products Page/complete-ergonomic-new.jpg",
    gradientColors: {
      primary: "rgb(59, 130, 246)",
      secondary: "rgb(20, 184, 166)",
      dark: "rgb(30, 58, 138)",
    },
    bglinear: "from-blue-600/30 via-blue-500/20 to-primary/30",
    colorOptions: [
      {
        name: "Complete Deluxe",
        image:
          "/assets/products Page/Complete Ergonomic Mat/complete deluxe.png",
        thickness: '6" (1.5cm)',
      },
      {
        name: "Complete Smooth",
        image:
          "/assets/products Page/Complete Ergonomic Mat/complete smoth.png",
        thickness: '43" (1.1cm)',
      },
      {
        name: "Complete Bubble",
        image:
          "/assets/products Page/Complete Ergonomic Mat/comlete bubble.png",
        thickness: '55" (1.5cm)',
      },
    ],
    benefitImages: [1, 5, 3, 4, 2],
    benefits: [
      {
        title: "ESD VERSION",
        description:
          "Engineered with enhanced static control. Electrical resistance : 3×10⁸ Ω – 8×10⁸ Ω",
        icon: "BoltIcon",
      },
      {
        title: "FIRE RETARDANT",
        description:
          "Self-extinguishing when introduced to open flame, which qualifies the Complete mats as fire retardant according to standard EN 13501-1.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ERGONOMIC",
        description:
          "Designed to stimulate circulation in feet, legs and lower back. Circulation is stimulated by the unique, patented surface profile of the mats, which forces muscular response.",
        icon: "HeartIcon",
      },
      {
        title: "BEVELED EDGES",
        description:
          "Molded w/ bevels. Yellow bevels can be added. Bevels will never curl up, eliminating trip hazards.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ISO CLEANROOM CERTIFIED",
        description:
          "Complete mats are ISO Cleanroom Class 5 (Class 100) rated.",
        icon: "CheckCircleIcon",
      },
      {
        title: "ANY SIZE ANY SHAPE",
        description:
          "Can be custom made in any size and shape, creating one continuous surface to eliminate seams and trip hazards.",
        icon: "ScissorsIcon",
      },
      {
        title: "SILICON FREE",
        description: "All EMI Complete mats are silicon free.",
        icon: "XMarkIcon",
      },
      {
        title: "TRUE WARRANTY",
        description:
          "CCMatting stands 100% behind our products with full replacement coverage if our product fails to perform as promoted within that period.",
        icon: "ClipboardDocumentCheckIcon",
      },
    ],
    sizes: {
      widths: "Available in 60cm & 90cm widths.",
      standardLengths: "90, 120, 150, 180, 200, 300cms.",
      customSizes:
        "Custom lengths are also available to meet your specific requirements.",
    },
    warranty: {
      title: "5 Years of Warranty",
      description:
        "All CC Complete Ergonomic Mat products come with a comprehensive 5-year replacement warranty, providing you with complete peace of mind and protection for your investment.",
      additionalInfo:
        "Our warranty ensures that your ergonomic mats maintain their high performance standards throughout the warranty period, with full replacement coverage if our product fails to perform as promoted.",
      badgeImage:
        "/assets/products Page/Complete Ergonomic Mat/5YearyWarrenty.png",
    },
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
