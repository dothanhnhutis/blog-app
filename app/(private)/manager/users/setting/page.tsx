import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillShieldLockFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
const Setting = () => {
  return (
    <>
      <div className="relative bg-[#ecf2ff] rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
        <h4 className="font-semibold text-2xl">Accout setting</h4>
        <h6 className="font-normal text-lg">Accout setting</h6>
        <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
          <img src="/images/mediachat.png" alt="mediachat" />
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="border-b">
          <div className="flex items-center">
            <button className="flex px-4 py-2 items-center justify-center space-x-3 min-h-[72px]">
              <BiUserCircle size={20} />
              <p className="text-sm font-normal">Account</p>
            </button>
            <button className="flex px-4 py-2 items-center justify-center space-x-3 min-h-[72px] text-[#5d87ff] border-b-2 border-[#5d87ff]">
              <BsFillShieldLockFill size={20} />
              <p className="text-sm font-normal">Password</p>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="flex flex-col border rounded-lg p-4">
              <p className="text-lg font-bold">Ảnh đại diện</p>
              <p className="text-sm font-normal">
                Thay đổi ảnh hồ sơ của bạn từ đây
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 mt-4 h-full">
                <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
                  <Image
                    src="/images/user-1.jpg"
                    alt="avatar"
                    fill
                    sizes="120"
                  />
                </div>
                <p className="text-xs font-normal">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-lg font-bold">Tài khoản xã hội</p>
              <p className="text-sm font-normal">
                Chỉnh sửa liên kết hồ sơ xã hội
              </p>
              <div className="flex flex-col space-y-2 mt-4">
                <label htmlFor="" className="text-sm font-extrabold">
                  Facebook
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                  placeholder="Liên kết đến hồ sơ xã hội."
                />
                <label htmlFor="" className="text-sm font-extrabold">
                  Tiktok
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                  placeholder="Liên kết đến hồ sơ xã hội."
                />
                <label htmlFor="" className="text-sm font-extrabold">
                  Youtube
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                  placeholder="Liên kết đến hồ sơ xã hội."
                />
              </div>
              <div className="flex items-center justify-end space-x-2 mt-4">
                <button
                  type="button"
                  className="px-3 py-2 bg-red-500 rounded hover:bg-red-600 text-white disabled:bg-red-600/60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 disabled:bg-blue-600/60"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-lg font-bold">Thông tin cá nhân</p>
            <p className="text-sm font-normal">
              Để thay đổi thông tin cá nhân của bạn, hãy chỉnh sửa và lưu ở đây
            </p>
            <div className="grid lg:grid-cols-2 mt-4 gap-4">
              <div>
                <label htmlFor="" className="text-sm font-extrabold">
                  Your Name
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="text-sm font-extrabold">
                  Your Name
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="text-sm font-extrabold">
                  Email
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="text-sm font-extrabold">
                  Phone
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                />
              </div>
              <div className="lg:col-span-2">
                <label htmlFor="" className="text-sm font-extrabold">
                  Address
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 mt-4">
              <button
                type="button"
                className="px-3 py-2 bg-red-500 rounded hover:bg-red-600 text-white disabled:bg-red-600/60"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 disabled:bg-blue-600/60"
              >
                Save
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-lg font-bold text-red-500">Xoá Tài Khoản</p>
            <p className="text-sm font-normal">
              Một khi bạn xóa tài khoản của mình, bạn sẽ không thể quay lại. Xin
              hãy chắc chắn.
            </p>
            <button className="border text-red-500 text-sm font-bold p-2 rounded-lg mt-4">
              Xoá tài khoản của bạn
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-lg font-bold">Đổi mật khẩu</p>
              <p className="text-sm font-normal">
                Thay đổi mật khẩu của bạn tại đây
              </p>
              <div className="flex flex-col space-y-2 mt-4">
                <label htmlFor="" className="text-sm font-extrabold">
                  Mật khẩu cũ
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                  placeholder="Mật khẩu cũ"
                />
                <label htmlFor="" className="text-sm font-extrabold">
                  Mật khẩu mới
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                  placeholder="Mật khẩu mới"
                />
                <label htmlFor="" className="text-sm font-extrabold">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="text"
                  className="block rounded-md border px-3 py-2 w-full"
                  placeholder="Xác nhận mật khẩu mới"
                />
              </div>
              <p className="text-sm font-normal">
                Đảm bảo có ít nhất 8 ký tự bao gồm số, chữ hoa, chữ thường và ký
                tự đặc biệt
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 disabled:bg-blue-600/60"
                >
                  Cập nhật mật khẩu
                </button>
                <Link
                  href=""
                  className="text-blue-500 underline text-sm font-normal"
                >
                  Tôi quên mật khẩu của tôi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
