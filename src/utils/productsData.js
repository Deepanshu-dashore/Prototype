// Products data for CC-Mating website
export const products = [
  {
    id: 1,
    slug: "heavy-duty",
    title: "CCM HEAVY DUTY MATS",
    subtitle: "High-Performance Flooring System",
    description:
      "CCM Heavy Duty Polymeric Mat is a high-performance contamination control flooring system engineered to remove up to 99% of foot- and wheel-borne particulates within six steps, while helping reduce electrostatic discharge.",
    image: "/assets/products%20Page/HaveyDuty.jpeg",
    gradientColors: {
      primary: "rgb(9, 31, 208)",
      secondary: "rgb(59, 130, 246)",
      dark: "rgb(30, 58, 138)",
    },
    bglinear: "from-blue-600/30 via-blue-500/20 to-primary/30",
    colorOptions: [
      // {
      //   name: "SOLID BLUE",
      //   image: "/assets/products%20Page/havydutyBlue.jpeg",
      //   description: "Classic solid blue color option",
      // },
      {
        name: "SOLID GREY",
        image: "/assets/products%20Page/havydutyGray.jpeg",
        description: "Professional solid grey finish",
        // comingSoon: true,
      },
      // {
      //   name: "GREY SPECKLED",
      // image: "/assets/products%20Page/havydutyGray.jpeg", // Placeholder - will be updated
      //   description: "Elegant grey speckled finish",
      // },
      {
        name: "COBALT BLUE",
        image: "/assets/products%20Page/havydutyBlue.jpeg", // Placeholder - will be updated
        description: "Vibrant cobalt blue option",
        // comingSoon: true,
      },
      {
        name: "GREY SPECKLED",
        image: "/assets/products%20Page/GreySpeckled.png", // Placeholder - will be updated
        description: "Modern grey speckled variant",
        // comingSoon: true,
      },
      {
        name: "BLUE SPECKLED",
        image: "/assets/products%20Page/havydutyGray.jpeg", // Placeholder - will be updated
        description: "Elegant blue speckled finish",
        comingSoon: true,
      },
    ],
    benefits: [
      {
        title: "Total Particulate Removal",
        description:
          "Proven to remove Up to 99% of foot and wheel-borne contaminants before they enter your critical environment over six full steps.",
        icon: "SparklesIcon",
      },
      {
        title: "Electro Static Proof",
        description:
          "Engineered with a unique compound that creates a static dissipative barrier, protecting sensitive electronics and processes.",
        icon: "BoltIcon",
      },
      // {
      //   title: "Extended Life Cycle",
      //   description:
      //     "Built for maximum durability with a standard life cycle of 4-5 years in high-traffic industrial areas when properly maintained.",
      //   icon: "ClockIcon",
      // },
      {
        title: "2-Year Guarantee",
        description:
          "We stand behind our quality with a full 2-year replacement guarantee if our product fails to perform as promoted.",
        icon: "CheckBadgeIcon",
      },
      // {
      //   title: "Cost Effective",
      //   description:
      //     "Delivers significant long-term cost savings compared to traditional peel-off mats by reducing waste and constant replacement.",
      //   icon: "CurrencyDollarIcon",
      // },
      // {
      //   title: "Aesthetic Improvement",
      //   description:
      //     "Enhances the professional appearance of your workplace with a high-quality, seamless, and integrated flooring solution.",
      //   icon: "PaintBrushIcon",
      // },
      // {
      //   title: "Eco-Friendly",
      //   description:
      //     "Fully recyclable and environmentally friendly material, helping your facility meet sustainability goals and reduce waste.",
      //   icon: "ArrowPathIcon",
      // },
    ],
    sizes: {
      widths: "Available in 60cm, 90cm, 120cm, and 150cm widths.",
      standardLengths: "90, 120, 150, 180, 200, 300, and 400cms.",
      customSizes:
        "Custom lengths and specialized shapes are available to fit any specific area or industrial requirement.",
    },
    warranty: {
      title: "2 Years of Warranty",
      description:
        "All CCM Matting products come with a comprehensive 2-year replacement warranty, providing you with complete peace of mind and protection for your investment.",
      additionalInfo:
        "Our warranty ensures that your contamination control mats maintain their high performance standards throughout the warranty period.",
      additionalInfo2:
        "Designed for versatility, it can be installed across pedestrian walkways, PALs, MALs, and other critical controlled areas, providing consistent contamination control in environments that experience both routine movement and intensive operational traffic.",
      badgeImage: "/assets/WarentyBadge.png",
    },
  },
  {
    id: 2,
    slug: "classic-ergonomic-mat",
    title: "CCM Classic Ergonomic Mats",
    subtitle: "Original Ergonomic Bubble Profile Mat",
    description: (
      <span>
        The CCM Classic Ergonomic Mat is the original ergonomic bubble profile
        mat. The Classic Mat boasts the longest warranty in the industry.
        <br />
        Customers still have many of these original mats in service over 20
        years later.
        <br /> Available in 2 profiles: Classic and Classic Deluxe.
      </span>
    ),
    image: "/assets/products%20Page/classic-ergonomic-new.jpg",
    gradientColors: {
      primary: "rgb(59, 130, 246)",
      secondary: "rgb(20, 184, 166)",
      dark: "rgb(30, 58, 138)",
    },
    bglinear: "from-blue-600/30 via-blue-500/20 to-primary/30",
    colorOptions: [
      {
        name: "Classic",
        image: "/assets/products%20Page/Classic%20Ergonomic%20Mat/Classic.jpeg",
        thickness: '6" (1.5cm)',
      },
      {
        name: "Classic Deluxe",
        image:
          "/assets/products%20Page/Classic%20Ergonomic%20Mat/Classic-deluex.jpeg",
        thickness: '6" (1.5cm)',
      },
    ],
    benefitImages: [
      "ergonomic",
      "beveled-edge",
      "anti-static",
      "iso-cleanroom",
    ],
    benefits: [
      {
        title: "ERGONOMIC",
        description:
          "Patented surface profile stimulates blood circulation in feet and legs, reducing fatigue by forcing micro-muscular responses during long standing hours.",
        icon: "HeartIcon",
      },
      {
        title: "BEVELED EDGES",
        description:
          "Features permanent molded-in bevels that will never curl or delaminate, effectively eliminating trip hazards for a safer work environment.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ANTI-STATIC",
        description:
          "Specially engineered to provide reliable static control, making it the ideal solution for environments sensitive to electrostatic discharge.",
        icon: "BoltIcon",
      },
      {
        title: "ISO CLEANROOM CERTIFIED",
        description:
          "Fully certified and rated for ISO Cleanroom Class 5 (Class 100), ensuring the highest standards of hygiene and contamination control.",
        icon: "CheckCircleIcon",
      },
      {
        title: "ANY SIZE ANY SHAPE",
        description:
          "Can be custom manufactured to any specific size and shape, providing a seamless continuous surface that perfectly fits your workspace.",
        icon: "ScissorsIcon",
      },
      {
        title: "SILICON FREE",
        description:
          "Guaranteed to be 100% silicon-free, making it safe for use in critical manufacturing environments like paint booths and cleanrooms.",
        icon: "XMarkIcon",
      },
      {
        title: "TRUE WARRANTY",
        description:
          "We offer industry-leading protection with full replacement coverage if the product fails to perform as promised within the 8-year period.",
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
        "All CCM Classic Ergonomic Mat products come with a comprehensive 8-year replacement warranty, providing you with complete peace of mind and protection for your investment. This is the longest warranty in the industry.",
      additionalInfo:
        "Our warranty ensures that your ergonomic mats maintain their high performance standards throughout the warranty period, with full replacement coverage if our product fails to perform as promoted.",
      badgeImage:
        "/assets/products%20Page/Classic%20Ergonomic%20Mat/warrenty.png",
    },
  },
  {
    id: 3,
    slug: "infinity-ergonomic-mat",
    title: "CCM Infinity Ergonomic Mats",
    subtitle: "Durable Polyurethane Ergonomic Mats",
    description:
      "Infinity Series mats are durable polyurethane ergonomic mats with a closed cell surface that resists light moisture and most chemical exposures. Available in ESD version and 3 profiles: Deluxe, Smooth and Bubble.",
    image: "/assets/products%20Page/CC%20Infinity%20Ergonomic%20Mat/bg.png",
    gradientColors: {
      primary: "rgb(59, 130, 246)",
      secondary: "rgb(20, 184, 166)",
      dark: "rgb(30, 58, 138)",
    },
    bglinear: "from-blue-600/30 via-blue-500/20 to-primary/30",
    colorOptions: [
      {
        name: "Infinity Deluxe",
        image:
          "/assets/products%20Page/CC%20Infinity%20Ergonomic%20Mat/deluxe.jpeg",
        thickness: '62" (1.5cm)',
      },
      {
        name: "Infinity Smooth",
        image:
          "/assets/products%20Page/CC%20Infinity%20Ergonomic%20Mat/smooth.jpeg",
        thickness: '43" (1.1cm)',
      },
      {
        name: "Infinity Bubble",
        image:
          "/assets/products%20Page/CC%20Infinity%20Ergonomic%20Mat/dubble.jpeg",
        thickness: '57" (1.45cm)',
      },
    ],
    benefitImages: ["esd", "ergonomic", "beveled-edge", "iso-cleanroom"],
    benefits: [
      {
        title: "ESD OPTION",
        description:
          "Advanced engineering provides enhanced static control with electrical resistance <1*10^9 Ohm, protecting your sensitive electronic components.",
        icon: "BoltIcon",
      },
      {
        title: "ERGONOMIC",
        description:
          "Unique patented surface profile triggers muscular response to stimulate blood flow, significantly reducing fatigue during extended periods of standing.",
        icon: "HeartIcon",
      },
      {
        title: "BEVELED EDGES",
        description:
          "Integrated molded bevels ensure a smooth transition from floor to mat and are guaranteed to never curl, maintaining long-term safety.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ISO CLEANROOM CERTIFIED",
        description:
          "Rigorously tested and rated for ISO Cleanroom Class 5 (Class 100), meeting strict international standards for controlled environments.",
        icon: "CheckCircleIcon",
      },
      {
        title: "ANY SIZE ANY SHAPE",
        description:
          "Designed for versatility, these mats can be custom-cut to any dimension or shape to eliminate gaps and potential trip hazards.",
        icon: "ScissorsIcon",
      },
      {
        title: "SILICON FREE",
        description:
          "Manufactured to be completely silicon and latex-free, ensuring compatibility with the most sensitive and demanding industrial processes.",
        icon: "XMarkIcon",
      },
      {
        title: "TRUE WARRANTY",
        description:
          "We stand firmly behind our Infinity series with a comprehensive 6-year replacement warranty, ensuring long-term reliability and performance.",
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
        "All CCM Infinity Ergonomic Mat products come with a comprehensive 6-year replacement warranty, providing you with complete peace of mind and protection for your investment.",
      additionalInfo:
        "Our warranty ensures that your ergonomic mats maintain their high performance standards throughout the warranty period, with full replacement coverage if our product fails to perform as promoted.",
      badgeImage:
        "/assets/products%20Page/CC%20Infinity%20Ergonomic%20Mat/warenty6Year.png",
    },
  },
  {
    id: 4,
    slug: "complete-ergonomic-mat",
    title: "CCM Complete Ergonomic Mat",
    subtitle: "Feature Rich Ergonomic Mats",
    description:
      "The CCM Complete Series ergonomic mats are feature rich. They can tolerate mild exposure to oils and other liquids while providing enhanced anti-static protection. It is self-extinguishing when introduced to open flame, which qualifies Complete Mats as fire retardant according to standard EN 13501-1. Available in ESD version, and 3 profiles: Deluxe, Smooth and Bubble.",
    image: "/assets/products%20Page/complete-ergonomic-new.jpg",
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
          "/assets/products%20Page/Complete%20Ergonomic%20Mat/complete%20deluxe.jpeg",
        thickness: '6" (1.5cm)',
      },
      {
        name: "Complete Smooth",
        image:
          "/assets/products%20Page/Complete%20Ergonomic%20Mat/complete%20smoth.jpeg",
        thickness: '43" (1.1cm)',
      },
      {
        name: "Complete Bubble",
        image:
          "/assets/products%20Page/Complete%20Ergonomic%20Mat/comlete%20bubble.jpeg",
        thickness: '55" (1.5cm)',
      },
    ],
    benefitImages: [
      "esd",
      "fire-retardant",
      "beveled-edge",
      "iso-cleanroom",
      "ergonomic",
    ],
    benefits: [
      {
        title: "ESD VERSION",
        description:
          "Precision-engineered for superior static dissipation with electrical resistance between 3×10⁸ Ω and 8×10⁸ Ω for maximum safety.",
        icon: "BoltIcon",
      },
      {
        title: "FIRE RETARDANT",
        description:
          "Self-extinguishing material qualified to the EN 13501-1 standard, providing essential fire safety in hazardous or high-risk environments.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ERGONOMIC",
        description:
          "Scientifically designed surface profile stimulates circulation and reduces physical strain on the back and legs during shift work.",
        icon: "HeartIcon",
      },
      {
        title: "BEVELED EDGES",
        description:
          "Durable molded bevels provide a safe, tapered edge that remains flat over time, preventing accidental slips and trips in the workplace.",
        icon: "ExclamationTriangleIcon",
      },
      {
        title: "ISO CLEANROOM CERTIFIED",
        description:
          "Certified for ISO Cleanroom Class 5 (Class 100), providing an ideal contamination-controlled surface for sterile environments.",
        icon: "CheckCircleIcon",
      },
      {
        title: "ANY SIZE ANY SHAPE",
        description:
          "Customizable to any footprint, our 'any size, any shape' capability ensures a perfect, seamless fit for your specific facility layout.",
        icon: "ScissorsIcon",
      },
      {
        title: "SILICON FREE",
        description:
          "100% silicon-free construction prevents surface contamination, making these mats perfect for high-precision manufacturing and cleanrooms.",
        icon: "XMarkIcon",
      },
      {
        title: "TRUE WARRANTY",
        description:
          "Enjoy complete peace of mind with a 5-year full replacement warranty, reflecting our absolute confidence in the Complete series' quality.",
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
        "All CCM Complete Ergonomic Mat products come with a comprehensive 5-year replacement warranty, providing you with complete peace of mind and protection for your investment.",
      additionalInfo:
        "Our warranty ensures that your ergonomic mats maintain their high performance standards throughout the warranty period, with full replacement coverage if our product fails to perform as promoted.",
      badgeImage:
        "/assets/products%20Page/Complete%20Ergonomic%20Mat/5YearyWarrenty.png",
    },
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
