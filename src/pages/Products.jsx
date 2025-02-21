import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { formatSlugify } from "@/utils/helpers";
import { useCategories } from "@/hooks/categories/useCategories";
import { getBreadcrumbFromCategory } from "@/services/apiCategories";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Spinner from "@/components/ui/Spinner";
import Sidebar from "@/components/categories/Sidebar";
import CategoryItem from "@/components/home/CategoryItem";
import ProductFilterOperations from "@/components/categories/ProductFilterOperations";
import ProductsList from "@/components/categories/ProductsList";
import PriceSlider from "@/components/categories/PriceSlider";

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function Products() {
  const { mainCategory: mainSlug, subCategory: subSlug } = useParams();
  const { categories, isLoading } = useCategories();
  const [activeMainCategory, setActiveMainCategory] = useState();
  const [activeSubCategory, setActiveSubCategory] = useState();
  const [breadcrumb, setBreadcrumb] = useState([{ name: "" }, { name: "" }]);

  useEffect(() => {
    const mainCategory = categories.find(
      (category) => formatSlugify(category.name) === mainSlug
    );
    setActiveMainCategory(mainCategory);

    const subCategory = mainCategory?.children.find(
      (category) => formatSlugify(category.name) === subSlug
    );
    setActiveSubCategory(subCategory);

    // set breadcrumb
    async function getBreadcrumb() {
      const breadcrumb = await getBreadcrumbFromCategory(subCategory.id);
      setBreadcrumb([...breadcrumb.metadata]);
    }
    getBreadcrumb();
  }, [categories, mainSlug, subSlug]);

  if (isLoading || !activeMainCategory || !activeSubCategory)
    return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Heading as="h1">
        {activeMainCategory.name} &gt; {activeSubCategory.name}
      </Heading>
      {activeMainCategory.children.length > 0 && (
        <div className="flex flex-col gap-10 bg-[var(--color-blue-100)] p-5 pt-10 rounded-3xl">
          <div className="flex flex-wrap justify-center gap-16">
            {activeMainCategory.children?.map((category) => (
              <CategoryItem
                key={category.id}
                parentSlug={activeMainCategory.slug}
                category={category}
                isActive={category.slug === subSlug}
              />
            ))}
          </div>
        </div>
      )}

      <StyledPolicyLayout>
        <Sidebar categories={categories} />
        <Row>
          <div className="flex flex-col gap-7">
            <div className="flex justify-between">
              <PriceSlider />
              <ProductFilterOperations />
            </div>
            <ProductsList />
          </div>
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default Products;
