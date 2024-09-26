import { Link } from "react-router-dom";
import Heading from "@/components/ui/Heading";

function ShowOrderItem({orderDetail}) {
  return (
    <div className="flex gap-5">
      <div className="overflow-hidden w-[80px] h-[80px] max-sm:w-[80px] max-sm:h-[80px] shrink-0">
        <img
          src={orderDetail.variant.product.thumbnailImage.path}
          className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
        />
      </div>
      {/* image end */}

      <div className="flex flex-col justify-around gap-1 w-full">
        <div className="flex justify-between">
          <Link to={`/san-pham/${orderDetail.variant.product.slug}`}>
            <Heading
              as="h3"
              className="capitalize font-bold hover:text-[var(--color-brand-700)]"
            >
              {orderDetail.variant.product.name}
            </Heading>
          </Link>
        </div>
        <div>Kích thước: {orderDetail.variant.size}</div>
        <div>Số lượng: {orderDetail.quantity} sản phẩm</div>
      </div>
    </div>
  );
}

export default ShowOrderItem;
