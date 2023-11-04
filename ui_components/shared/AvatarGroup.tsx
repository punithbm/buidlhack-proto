import { getNounAvatar } from "@/utils";
import { FC } from "react";

const AvatarGroup: FC = () => {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src={getNounAvatar("0x121F9CB6aF512FEFe32cB77f1aae7cDE594C033a")}
        alt=""
      />
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  );
};

export default AvatarGroup;
