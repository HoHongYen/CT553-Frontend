import styled from "styled-components";
import { useCategories } from "@/hooks/categories/useCategories";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatSlugify } from "@/utils/helpers";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Spinner from "@/components/ui/Spinner";
import Sidebar from "@/components/categories/Sidebar";
import CategoryItem from "@/components/home/CategoryItem";
import CategoryFilterOperations from "@/components/categories/CategoryFilterOperations";
import ProductsList from "@/components/categories/ProductsList";
import PriceSlider from "@/components/categories/PriceSlider";

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function MainCategory() {
  const { mainCategory: slug } = useParams();
  const { categories, isLoading } = useCategories();
  const [activeCategory, setActiveCategory] = useState();
  const [breadcrumb, setBreadcrumb] = useState([{ name: "" }]);

  useEffect(() => {
    const category = categories.find(
      (category) => formatSlugify(category.name) === slug
    );
    setBreadcrumb([{ name: category?.name }]);
    setActiveCategory(category);
  }, [categories, slug]);

  if (isLoading || !activeCategory) return <Spinner />;

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Heading as="h1">{activeCategory.name}</Heading>
      {activeCategory.children.length > 0 && (
        <div className="flex flex-col gap-10 bg-[var(--color-blue-100)] p-5 pt-10 rounded-3xl">
          <div className="flex flex-wrap justify-center gap-16">
            {activeCategory.children?.map((category) => (
              <CategoryItem
                parentSlug={activeCategory.slug}
                key={category.id}
                category={category}
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
              <CategoryFilterOperations />
            </div>
            <ProductsList />
          </div>
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default MainCategory;
