import config from "@/config/config.json";
import type {
  Cart,
  Collection,
  CustomerInput,
  Menu,
  Page,
  PageInfo,
  Product,
  ProductVariant,
  user,
} from "./types";

// Extend Collection with a list of product handles to simplify lookups locally
type CollectionWithHandles = Collection & {
  productHandles: string[];
};

const currencyCode = config.shopify?.currencyCode || "USD";

const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/mock-1",
    handle: "demo-craft-notebook",
    availableForSale: true,
    title: "Craft Notebook",
    description:
      "Handmade notebook with recycled paper that is perfect for daily planning and sketching.",
    descriptionHtml:
      "<p>Handmade notebook with recycled paper that is perfect for daily planning and sketching.</p>",
    options: [
      {
        id: "gid://shopify/ProductOption/mock-1",
        name: "Title",
        values: ["Default"],
      },
    ],
    priceRange: {
      maxVariantPrice: { amount: "18.00", currencyCode },
      minVariantPrice: { amount: "18.00", currencyCode },
    },
    compareAtPriceRange: {
      maxVariantPrice: { amount: "22.00", currencyCode },
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-1",
        title: "Default",
        availableForSale: true,
        selectedOptions: [{ name: "Title", value: "Default" }],
        price: { amount: "18.00", currencyCode },
      },
    ],
    featuredImage: {
      url: "/images/product-1.png",
      altText: "Craft Notebook lying on a desk",
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: "/images/product-1.png",
        altText: "Craft Notebook lying on a desk",
        width: 1200,
        height: 1200,
      },
      {
        url: "/images/product-placeholder.jpg",
        altText: "Open Craft Notebook",
        width: 1200,
        height: 1200,
      },
    ],
    seo: {
      title: "Craft Notebook",
      description: "A handmade notebook ready for your next idea.",
    },
    tags: ["stationery", "handmade"],
    updatedAt: "2024-01-05T00:00:00.000Z",
    vendor: "Mock Workshop",
    collections: [],
  },
  {
    id: "gid://shopify/Product/mock-2",
    handle: "demo-stoneware-mug",
    availableForSale: true,
    title: "Stoneware Mug",
    description:
      "Small-batch ceramic mug with a matte glaze and comfortable handle.",
    descriptionHtml:
      "<p>Small-batch ceramic mug with a matte glaze and comfortable handle.</p>",
    options: [
      {
        id: "gid://shopify/ProductOption/mock-2",
        name: "Color",
        values: ["Ash", "Ocean"],
      },
    ],
    priceRange: {
      maxVariantPrice: { amount: "24.00", currencyCode },
      minVariantPrice: { amount: "22.00", currencyCode },
    },
    compareAtPriceRange: {
      maxVariantPrice: { amount: "28.00", currencyCode },
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-2-ash",
        title: "Ash",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Ash" }],
        price: { amount: "22.00", currencyCode },
      },
      {
        id: "gid://shopify/ProductVariant/mock-2-ocean",
        title: "Ocean",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Ocean" }],
        price: { amount: "24.00", currencyCode },
      },
    ],
    featuredImage: {
      url: "/images/product-placeholder.jpg",
      altText: "Stoneware mug on a wooden table",
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: "/images/product-placeholder.jpg",
        altText: "Stoneware mug on a wooden table",
        width: 1200,
        height: 1200,
      },
    ],
    seo: {
      title: "Stoneware Mug",
      description: "Modern ceramic mug that keeps your coffee warm longer.",
    },
    tags: ["kitchen", "ceramic"],
    updatedAt: "2024-02-10T00:00:00.000Z",
    vendor: "Mock Studio",
    collections: [],
  },
  {
    id: "gid://shopify/Product/mock-3",
    handle: "demo-desk-lamp",
    availableForSale: true,
    title: "Adjustable Desk Lamp",
    description:
      "LED desk lamp with adjustable arm and warm light perfect for late-night work.",
    descriptionHtml:
      "<p>LED desk lamp with adjustable arm and warm light perfect for late-night work.</p>",
    options: [
      {
        id: "gid://shopify/ProductOption/mock-3",
        name: "Finish",
        values: ["Black", "White"],
      },
    ],
    priceRange: {
      maxVariantPrice: { amount: "58.00", currencyCode },
      minVariantPrice: { amount: "54.00", currencyCode },
    },
    compareAtPriceRange: {
      maxVariantPrice: { amount: "68.00", currencyCode },
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-3-black",
        title: "Black",
        availableForSale: true,
        selectedOptions: [{ name: "Finish", value: "Black" }],
        price: { amount: "54.00", currencyCode },
      },
      {
        id: "gid://shopify/ProductVariant/mock-3-white",
        title: "White",
        availableForSale: true,
        selectedOptions: [{ name: "Finish", value: "White" }],
        price: { amount: "58.00", currencyCode },
      },
    ],
    featuredImage: {
      url: "/images/product-placeholder.jpg",
      altText: "Modern desk lamp on a workspace",
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: "/images/product-placeholder.jpg",
        altText: "Modern desk lamp on a workspace",
        width: 1200,
        height: 1200,
      },
    ],
    seo: {
      title: "Adjustable Desk Lamp",
      description: "Slim LED lamp that helps you focus without eye strain.",
    },
    tags: ["lighting", "office"],
    updatedAt: "2024-03-22T00:00:00.000Z",
    vendor: "Mock Lighting Co",
    collections: [],
  },
  {
    id: "gid://shopify/Product/mock-4",
    handle: "demo-wireless-speaker",
    availableForSale: true,
    title: "Wireless Speaker",
    description:
      "Compact Bluetooth speaker with a rich sound profile and all-day battery life.",
    descriptionHtml:
      "<p>Compact Bluetooth speaker with a rich sound profile and all-day battery life.</p>",
    options: [
      {
        id: "gid://shopify/ProductOption/mock-4",
        name: "Color",
        values: ["Charcoal", "Sand"],
      },
    ],
    priceRange: {
      maxVariantPrice: { amount: "88.00", currencyCode },
      minVariantPrice: { amount: "82.00", currencyCode },
    },
    compareAtPriceRange: {
      maxVariantPrice: { amount: "99.00", currencyCode },
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-4-charcoal",
        title: "Charcoal",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Charcoal" }],
        price: { amount: "88.00", currencyCode },
      },
      {
        id: "gid://shopify/ProductVariant/mock-4-sand",
        title: "Sand",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Sand" }],
        price: { amount: "82.00", currencyCode },
      },
    ],
    featuredImage: {
      url: "/images/product-placeholder.jpg",
      altText: "Wireless speaker on a coffee table",
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: "/images/product-placeholder.jpg",
        altText: "Wireless speaker on a coffee table",
        width: 1200,
        height: 1200,
      },
    ],
    seo: {
      title: "Wireless Speaker",
      description: "Portable speaker that is ready for impromptu gatherings.",
    },
    tags: ["audio", "gadgets"],
    updatedAt: "2024-04-18T00:00:00.000Z",
    vendor: "Mock Sound Lab",
    collections: [],
  },
];

const mockCollections: CollectionWithHandles[] = [
  {
    handle: "hidden-homepage-carousel",
    title: "Hero Highlights",
    description: "Products showcased in the homepage hero slider during local development.",
    seo: {
      title: "Hero Highlights",
      description: "Featured hero products for the mock storefront.",
    },
    updatedAt: "2024-04-01T00:00:00.000Z",
    path: "/products/hidden-homepage-carousel",
    products: undefined,
    productHandles: [
      "demo-wireless-speaker",
      "demo-desk-lamp",
      "demo-craft-notebook",
    ],
  },
  {
    handle: "featured-products",
    title: "Featured Products",
    description: "Curated list that powers the featured products grid while offline.",
    seo: {
      title: "Featured Products",
      description: "Top picks from the mock inventory.",
    },
    updatedAt: "2024-04-05T00:00:00.000Z",
    path: "/products/featured-products",
    products: undefined,
    productHandles: [
      "demo-wireless-speaker",
      "demo-stoneware-mug",
      "demo-desk-lamp",
    ],
  },
  {
    handle: "workspace-essentials",
    title: "Workspace Essentials",
    description: "Practical accessories to refresh your desk setup.",
    seo: {
      title: "Workspace Essentials",
      description: "Desk-friendly favourites from the mock catalogue.",
    },
    updatedAt: "2024-04-12T00:00:00.000Z",
    path: "/products/workspace-essentials",
    products: undefined,
    productHandles: [
      "demo-craft-notebook",
      "demo-desk-lamp",
    ],
  },
];

const mockMenu: Menu[] = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "/products" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const mockPages: Page[] = [
  {
    id: "gid://shopify/Page/mock-privacy",
    title: "Privacy Policy",
    handle: "privacy-policy",
    body: "We value your privacy and only use demo data while Shopify is disabled.",
    bodySummary: "Mock privacy information for offline development.",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    seo: {
      title: "Privacy Policy",
      description: "Offline development privacy statement.",
    },
  },
  {
    id: "gid://shopify/Page/mock-terms",
    title: "Terms of Service",
    handle: "terms-services",
    body: "These terms cover local-only development scenarios and have no legal effect.",
    bodySummary: "Mock terms of service for local development.",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    seo: {
      title: "Terms of Service",
      description: "Terms describing the mock storefront.",
    },
  },
];

const mockUser: user = {
  customer: {
    id: "gid://shopify/Customer/mock-user",
    firstName: "Demo",
    lastName: "Customer",
    email: "demo@example.com",
    phone: null,
    acceptsMarketing: false,
  },
};

const cartStore = new Map<string, Cart>();

const emptyMoney = (): { amount: string; currencyCode: string } => ({
  amount: "0.00",
  currencyCode,
});

const deepClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const resolveVariant = (
  variantId: string,
): { product: Product; variant: ProductVariant } | undefined => {
  for (const product of mockProducts) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      return { product, variant };
    }
  }
  return undefined;
};

const recalculateCart = (cart: Cart): void => {
  let subtotal = 0;
  let totalQuantity = 0;

  cart.lines.forEach((line) => {
    const variantInfo = resolveVariant(line.merchandise.id);
    if (!variantInfo) {
      return;
    }

    const lineTotal =
      parseFloat(variantInfo.variant.price.amount) * line.quantity;
    line.cost.totalAmount = {
      amount: lineTotal.toFixed(2),
      currencyCode,
    };
    line.merchandise.product = variantInfo.product;
    totalQuantity += line.quantity;
    subtotal += lineTotal;
  });

  cart.totalQuantity = totalQuantity;
  const subtotalMoney = {
    amount: subtotal.toFixed(2),
    currencyCode,
  };

  cart.cost = {
    subtotalAmount: subtotalMoney,
    totalAmount: subtotalMoney,
    totalTaxAmount: emptyMoney(),
  };
};

const buildPageInfo = (items: Product[]): PageInfo => ({
  hasNextPage: false,
  hasPreviousPage: false,
  endCursor: items.length ? items[items.length - 1].id : "",
});

const filterProducts = (query?: string): Product[] => {
  if (!query) {
    return mockProducts;
  }

  const normalized = query.toLowerCase();

  if (normalized.includes("tag:")) {
    const tag = normalized.split("tag:").pop()?.replace(/['\"]+/g, "").trim();
    if (tag) {
      return mockProducts.filter((product) =>
        product.tags.some((t) => t.toLowerCase().includes(tag)),
      );
    }
  }

  if (normalized.includes("vendor:")) {
    const vendor = normalized
      .split("vendor:")
      .pop()
      ?.replace(/['\"]+/g, "")
      .trim();
    if (vendor) {
      return mockProducts.filter((product) =>
        product.vendor.toLowerCase().includes(vendor),
      );
    }
  }

  return mockProducts.filter((product) => {
    const haystack = `${product.title} ${product.description} ${product.vendor}`.toLowerCase();
    return haystack.includes(normalized);
  });
};

const sortProducts = (
  products: Product[],
  sortKey?: string,
  reverse?: boolean,
): Product[] => {
  const sorted = [...products];

  switch (sortKey) {
    case "PRICE": {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
        return priceA - priceB;
      });
      break;
    }
    case "CREATED_AT": {
      sorted.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      );
      break;
    }
    case "BEST_SELLING":
    case "RELEVANCE":
    default:
      break;
  }

  if (reverse) {
    sorted.reverse();
  }

  return sorted;
};

export const createCart = async (): Promise<Cart> => {
  const cartId = `mock-cart-${Math.random().toString(36).slice(2)}`;
  const cart: Cart = {
    id: cartId,
    checkoutUrl: "#",
    cost: {
      subtotalAmount: emptyMoney(),
      totalAmount: emptyMoney(),
      totalTaxAmount: emptyMoney(),
    },
    lines: [],
    totalQuantity: 0,
  };

  cartStore.set(cartId, cart);
  return deepClone(cart);
};

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> => {
  const cart = cartStore.get(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  lines.forEach(({ merchandiseId, quantity }) => {
    const variantInfo = resolveVariant(merchandiseId);
    if (!variantInfo) {
      return;
    }

    const existingLine = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (existingLine) {
      existingLine.quantity += quantity;
    } else {
      cart.lines.push({
        id: `line-${merchandiseId}`,
        quantity,
        cost: { totalAmount: emptyMoney() },
        merchandise: {
          id: variantInfo.variant.id,
          title: variantInfo.product.title,
          selectedOptions: variantInfo.variant.selectedOptions,
          product: variantInfo.product,
        },
      });
    }
  });

  recalculateCart(cart);
  cartStore.set(cartId, cart);
  return deepClone(cart);
};

export const removeFromCart = async (
  cartId: string,
  lineIds: string[],
): Promise<Cart> => {
  const cart = cartStore.get(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.lines = cart.lines.filter((line) => !lineIds.includes(line.id));
  recalculateCart(cart);
  cartStore.set(cartId, cart);
  return deepClone(cart);
};

export const updateCart = async (
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> => {
  const cart = cartStore.get(cartId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  lines.forEach(({ id, merchandiseId, quantity }) => {
    const targetLine = cart.lines.find((line) => line.id === id);

    if (!targetLine) {
      return;
    }

    if (quantity <= 0) {
      cart.lines = cart.lines.filter((line) => line.id !== id);
      return;
    }

    const variantInfo = resolveVariant(merchandiseId);
    if (!variantInfo) {
      return;
    }

    targetLine.quantity = quantity;
    targetLine.merchandise = {
      id: variantInfo.variant.id,
      title: variantInfo.product.title,
      selectedOptions: variantInfo.variant.selectedOptions,
      product: variantInfo.product,
    };
  });

  recalculateCart(cart);
  cartStore.set(cartId, cart);
  return deepClone(cart);
};

export const getCart = async (cartId: string): Promise<Cart | undefined> => {
  const cart = cartStore.get(cartId);
  if (!cart) {
    return undefined;
  }
  recalculateCart(cart);
  return deepClone(cart);
};

export const getCollection = async (
  handle: string,
): Promise<Collection | undefined> => {
  const target = mockCollections.find((collection) => collection.handle === handle);
  if (!target) {
    return undefined;
  }

  const { productHandles: _productHandles, ...collection } = target;
  return deepClone(collection);
};

export const getCollectionProducts = async ({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  filterCategoryProduct?: any[];
}): Promise<{ pageInfo: PageInfo | null; products: Product[] }> => {
  const target = mockCollections.find((item) => item.handle === collection);
  const products = target
    ? mockProducts.filter((product) =>
        target.productHandles.includes(product.handle),
      )
    : mockProducts;
  const sorted = sortProducts(products, sortKey, reverse);

  return {
    pageInfo: buildPageInfo(sorted),
    products: deepClone(sorted),
  };
};

export const createCustomer = async (input: CustomerInput): Promise<any> => {
  const customer = {
    customer: {
      id: `gid://shopify/Customer/mock-${Math.random().toString(36).slice(2)}`,
      firstName: input.firstName,
      lastName: input.lastName || "",
      email: input.email,
      phone: null,
      acceptsMarketing: false,
    },
  };

  return {
    customer,
    customerCreateErrors: [],
  };
};

export const getCustomerAccessToken = async (
  _input: Partial<CustomerInput> = {},
): Promise<any> => {
  return {
    token: "mock-customer-token",
    customerLoginErrors: [],
  };
};

export const getUserDetails = async (_accessToken?: string): Promise<user> => {
  return deepClone(mockUser);
};

export const getCollections = async (): Promise<Collection[]> =>
  mockCollections.map(({ productHandles: _productHandles, ...rest }) =>
    deepClone(rest),
  );

export const getMenu = async (_handle?: string): Promise<Menu[]> =>
  deepClone(mockMenu);

export const getPage = async (handle: string): Promise<Page> => {
  const page = mockPages.find((item) => item.handle === handle) || mockPages[0];
  return deepClone(page);
};

export const getPages = async (): Promise<Page[]> => deepClone(mockPages);

export const getProduct = async (
  handle: string,
): Promise<Product | undefined> => {
  const product = mockProducts.find((item) => item.handle === handle);
  return product ? deepClone(product) : undefined;
};

export const getProductRecommendations = async (
  productId: string,
): Promise<Product[]> => {
  const alternatives = mockProducts.filter((product) => product.id !== productId);
  return deepClone(alternatives.slice(0, 4));
};

export const getVendors = async (_args?: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<{
  vendor: string;
  productCount: number;
}[]> => {
  const counts: Record<string, number> = {};

  mockProducts.forEach((product) => {
    counts[product.vendor] = (counts[product.vendor] || 0) + 1;
  });

  return Object.entries(counts).map(([vendor, productCount]) => ({
    vendor,
    productCount,
  }));
};

export const getTags = async ({
  query,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> => {
  return deepClone(filterProducts(query));
};

export const getProducts = async ({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  cursor?: string;
}): Promise<{ pageInfo: PageInfo; products: Product[] }> => {
  const filtered = filterProducts(query);
  const sorted = sortProducts(filtered, sortKey, reverse);

  return {
    pageInfo: buildPageInfo(sorted),
    products: deepClone(sorted),
  };
};

export const getHighestProductPrice = async (): Promise<{
  amount: string;
  currencyCode: string;
} | null> => {
  const highest = mockProducts.reduce((max, product) => {
    const variantMax = product.variants.reduce((variantMaxPrice, variant) => {
      const price = parseFloat(variant.price.amount);
      return price > variantMaxPrice ? price : variantMaxPrice;
    }, 0);

    return variantMax > max ? variantMax : max;
  }, 0);

  if (!highest) {
    return null;
  }

  return {
    amount: highest.toFixed(2),
    currencyCode,
  };
};

export const isMockingShopify = true;
