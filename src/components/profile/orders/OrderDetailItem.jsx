import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/helpers";
import Heading from "@/components/ui/Heading";
import { ORDER_STATUS } from "@/utils/constants";
import Button from "@/components/ui/Button";
import CreateReviewForm from "@/components/products/reviews/CreateReviewForm";
import Modal from "@/components/ui/Modal";

function OrderDetailItem({ orderDetail, currentStatus }) {
  return (
    <div className="flex gap-7">
      {/* image begin */}
      <div className="overflow-hidden w-[150px] h-[150px] max-sm:w-[150px] max-sm:h-[150px] shrink-0">
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
              as="h2"
              className="capitalize font-bold hover:text-[var(--color-brand-700)]"
            >
              {orderDetail.variant.product.name}
            </Heading>
          </Link>
          {currentStatus.name === ORDER_STATUS.DELIVERED && (
            <Modal>
              <Modal.Open opens="createReview">
                <Button variation="normal">Viết đánh giá</Button>
              </Modal.Open>
              <Modal.Window name="createReview">
                <CreateReviewForm orderDetail={orderDetail} />
              </Modal.Window>
            </Modal>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold mr-2">Mã sản phẩm:</span> #
          {orderDetail.variant.productId}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold mr-2">Kích thước:</span>{" "}
          {orderDetail.variant.size}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold mr-2">Số lượng:</span>{" "}
          {orderDetail.quantity}
        </div>

        <div className="flex items-center">
          <div className="flex">
            {orderDetail.discount > 0 ? (
              <>
                <span className="font-semibold mr-2">Giá:</span>
                <h3 className="flex gap-4 text-[var(--color-red-600)] font-bold mt-auto">
                  {formatCurrency(orderDetail.price)}
                  <p className="line-through text-[var(--color-grey-400)]">
                    {formatCurrency(orderDetail.variant.price)}
                  </p>
                </h3>
              </>
            ) : (
              <>
                <span className="font-semibold mr-2">Giá:</span>
                <h3 className="text-[var(--color-brand-700)] font-bold mt-auto">
                  {formatCurrency(orderDetail.price)}
                </h3>
              </>
            )}
          </div>

          <div className="flex ml-auto">
            <span className="font-bold mr-2">Thành tiền:</span>
            <div className="font-bold text-[var(--color-brand-700)]">
              {formatCurrency(orderDetail.price * orderDetail.quantity)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailItem;
