import ProductCard from "@/components/products/ProductCard";
import { formatDate } from "@/utils/helpers";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function ProductsList() {
  const products = [
    {
      id: uuidv4(),
      name: "Lovely cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 110200,
      isDiscount: true,
      created_at: "2024-08-20T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Vanegas gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 123224,
      isDiscount: false,
      created_at: "2024-08-25T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Hoa TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 50000,
      isDiscount: true,
      created_at: "2024-08-12T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Yenesa - Tranh tráng gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 100000,
      isDiscount: true,
      created_at: "2024-07-20T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 70000,
      isDiscount: false,
      created_at: "2024-05-16T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 35000,
      isDiscount: true,
      created_at: "2024-03-16T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 60000,
      isDiscount: false,
      created_at: "2024-08-21T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 54000,
      isDiscount: true,
      created_at: "2024-07-20T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Tráng gương cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 1100000,
      isDiscount: false,
      created_at: "2024-08-11T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 34000,
      isDiscount: true,
      created_at: "2024-09-20T11:21:56.337Z",
      // images
    },
    {
      id: uuidv4(),
      name: "Cành hồng nghệ thuật TG3338",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      price: 43000,
      isDiscount: false,
      created_at: "2024-02-10T11:21:56.337Z",
      // images
    },
  ];

  const [searchParams] = useSearchParams();

  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredProducts;
  if (filterValue === "all") filteredProducts = products;
  if (filterValue === "no-discount")
    filteredProducts = products.filter((product) => !product.isDiscount);
  if (filterValue === "with-discount")
    filteredProducts = products.filter((product) => product.isDiscount);

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "created_at-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (field === "name") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    if (field === "created_at") {
      return (new Date(a[field]) - new Date(b[field])) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 h-full">
      {sortedProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
