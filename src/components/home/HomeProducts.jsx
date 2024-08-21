import ProductCard from "@/components/products/ProductCard";

function HomeProducts() {
  const products = [
    {
      id: 1,
      name: "Tranh tráng gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 1100000,
      isDiscount: true,
      // images
    },
    {
      id: 2,
      name: "Tranh tráng gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 1100000,
      isDiscount: false,
      // images
    },
    {
      id: 3,
      name: "Tranh tráng gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 1100000,
      isDiscount: true,
      // images
    },
    {
      id: 4,
      name: "Tranh tráng gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 1100000,
      isDiscount: true,
      // images
    },
    {
      id: 5,
      name: "Tranh tráng gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 1100000,
      isDiscount: false,
      // images
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 h-full">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomeProducts;

