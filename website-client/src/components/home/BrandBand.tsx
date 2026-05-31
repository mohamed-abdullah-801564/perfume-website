import Image from "next/image";

/** Rectangle 10 brand band - 0,823 1440x236 #144232 + leaf imagery */
export function BrandBand() {
  return (
    <div
      className="absolute left-0 top-[823px] z-[8] h-[236px] w-full overflow-hidden bg-anna-brand"
      aria-hidden
    >
      <div className="absolute left-[82px] top-[36px] h-[196px] w-[558px] opacity-90">
        <Image
          src="/brand-images/image 31.png"
          alt=""
          fill
          className="object-contain"
          sizes="558px"
        />
      </div>
      <div className="absolute left-[474px] top-[44px] h-[196px] w-[558px] opacity-90">
        <Image
          src="/brand-images/image 32.png"
          alt=""
          fill
          className="object-contain"
          sizes="558px"
        />
      </div>
      <div className="absolute left-[1042px] top-[38px] h-[196px] w-[558px] opacity-90">
        <Image
          src="/brand-images/image 31.png"
          alt=""
          fill
          className="object-contain"
          sizes="558px"
        />
      </div>
    </div>
  );
}
