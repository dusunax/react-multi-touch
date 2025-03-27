import Image from "next/image";

const Introduce = () => {
  return (
    <div className="center flex-col">
      <aside className="center flex-col">
        <Image src="/window.svg" alt="Multi Touch" width={70} height={70} />
        <p className="text-2xl font-bold">Multi Touch</p>
        <p className="text-sm text-gray-500">
          Multi Touch is a library for multi-touch gestures.
        </p>
      </aside>
    </div>
  );
};

export default Introduce;
