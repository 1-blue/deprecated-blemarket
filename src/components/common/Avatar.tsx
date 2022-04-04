import Image from "next/image";

// type
import { SimpleUser } from "@src/types";

// util
import { combineClassNames, combinePhotoUrl } from "@src/libs/client/util";

interface IProps {
  user: SimpleUser;
  className?: string;
}

const Avatar = ({ user, className }: IProps) => {
  return (
    <>
      {user.avatar ? (
        <figure
          className={combineClassNames(
            "relative w-12 h-12",
            className ? className : ""
          )}
        >
          <Image
            src={combinePhotoUrl(user.avatar)}
            layout="fill"
            className="rounded-full object-contain"
            alt={`${user.name}님의 프로필 이미지`}
          />
        </figure>
      ) : (
        <div
          className={combineClassNames(
            "w-12 h-12 rounded-full bg-slate-400",
            className ? className : ""
          )}
        />
      )}
    </>
  );
};

export default Avatar;
