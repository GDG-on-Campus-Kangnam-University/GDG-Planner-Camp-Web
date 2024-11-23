import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const BuyModal = ({ closeModal }: { closeModal: () => void }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [quantity, setQuantity] = useState(0); // 구매 수량 상태 추가
  const productPrice = 10000; // 상품 가격
  const maxQuantity = 3; // 최대 구매 수량

  const handleIncrease = () => {
    setQuantity(prev => prev + 1); // 수량 증가
  };

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(prev => prev - 1); // 수량 감소 (0 미만으로는 안됨)
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  // 총 결제 금액 계산
  const totalPrice = quantity * productPrice;

  return (
    <>
      {/* 배경 요소 */}
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          isClosing ? "opacity-0" : "opacity-40"
        } z-40`}
      ></div>

      {/* 모달 내용 */}
      <div
        className={`fixed bottom-0 p-6 bg-white rounded-t-[16px] shadow-lg w-[600px] ${
          isClosing ? "animate-slideDown" : "animate-slideUp"
        } z-50`}
      >
        <form className="flex flex-col gap-6 bg-white">
          <div className="flex p-2 flex-col gap-2">
            <p className="text-[20px] font-bold">비즈니스 모델 이름입니다.</p>
            <p className="text-[16px]">
              상품설명입니다.상품설명입니다.상품설명입니다.상품설명입니다.상품설명입니다.상품설명입니다.상품설명입니다.상품설명입니다.상품설명입니다.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm leading-5 font-medium">구매 수량(최대 n개)</p>
              <p className="text-[18px]">{productPrice.toLocaleString()}원</p>
            </div>
            <div className="flex gap-3 w-full">
              <Input
                type="number"
                className="flex w-[400px] border-slate-100 text-center"
                value={quantity} // input 값은 상태로 관리
                readOnly
              />
              <Button
                type="button"
                className="w-[64px] bg-white hover:bg-slate-50 border border-slate-100 rounded-md text-black"
                onClick={handleDecrease} // + 클릭 시 증가
              >
                -
              </Button>
              <Button
                type="button"
                className="w-[64px] bg-white hover:bg-slate-50 border border-slate-100 rounded-md text-black"
                onClick={handleIncrease} // - 클릭 시 감소
                disabled={quantity >= maxQuantity} // 수량이 최대일 경우 비활성화
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">총 결제 금액</p>
            <p className="text-sm font-medium">{totalPrice.toLocaleString()}원 {/* 총 결제 금액 */}</p>
          </div>
          <div className="flex gap-6 items-center">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-400 hover:bg-gray-300 w-full"
            >
              취소하기
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 w-full"
              disabled={quantity === 0} // 수량이 0일 경우 비활성화
            >
              구매하기
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
