import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export default function ValuesPage() {
  return (
    <main className="min-h-screen bg-anna-background text-anna-foreground">
      <section className="relative mx-auto w-full max-w-site overflow-hidden bg-anna-background">
        <div className="relative h-[624px] w-full overflow-hidden">
          <Image
            src="/brand-images/image 34.png"
            alt="Green hills under a cloudy sky"
            fill
            priority
            className="object-cover"
            sizes="1440px"
          />



          <h1 className="absolute left-[56px] top-[383px] z-10 w-[292px] text-white">
            <span className="block font-serif text-[76px] font-normal leading-[0.78]">
              Our
            </span>
            <span className="block font-script text-[88px] font-normal leading-[0.72]">
              Values
            </span>
          </h1>
        </div>

        <section className="grid grid-cols-[270px_270px_270px] gap-[126px] px-[56px] pt-[22px]">
          <article>
            <h2 className="border-b border-anna-foreground/70 pb-[2px] font-display text-[30px] font-normal leading-none text-anna-foreground">
              Purity from Nature
            </h2>
            <p className="mt-[14px] font-sans text-[24px] font-normal leading-[1.07] text-anna-foreground">
              We value ingredients in
              <br />
              their most natural and
              <br />
              beneficial form, free from
              <br />
              unnecessary additives
              <br />
              and artificial
              <br />
              compromises.
            </p>
          </article>

          <article>
            <h2 className="border-b border-anna-foreground/70 pb-[2px] font-display text-[30px] font-normal leading-none text-anna-foreground">
              Rooted in Tradition
            </h2>
            <p className="mt-[14px] font-sans text-[24px] font-normal leading-[1.07] text-anna-foreground">
              Inspired by traditional
              <br />
              Siddha wellness practices,
              <br />
              we honour ancient
              <br />
              knowledge while adapting
              <br />
              it for modern lifestyles.
            </p>
          </article>

          <article>
            <h2 className="border-b border-anna-foreground/70 pb-[2px] font-display text-[30px] font-normal leading-none text-anna-foreground">
              Honest Wellness
            </h2>
            <p className="mt-[14px] font-sans text-[24px] font-normal leading-[1.07] text-anna-foreground">
              We believe wellness should
              <br />
              be authentic, transparent,
              <br />
              and accessible built on
              <br />
              trust and integrity.
            </p>
          </article>
        </section>

        <section className="grid min-h-[720px] grid-cols-[520px_520px] justify-center gap-[72px] pt-[142px]">
          <Link href="/brand" className="relative h-[510px] w-[520px] overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity">
            <Image
              src="/brand-images/image 35.png"
              alt=""
              fill
              className="object-cover"
              sizes="520px"
            />
            <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[187px] items-center justify-center rounded-[6px] border border-white/85 bg-white/5">
              <span className="font-display text-[38px] font-normal leading-none text-white">
                About us
              </span>
            </div>
          </Link>

          <Link href="/ingredients" className="relative h-[510px] w-[520px] overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity">
            <Image
              src="/brand-images/Rectangle 33.png"
              alt=""
              fill
              className="object-cover"
              sizes="520px"
            />
            <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[266px] items-center justify-center rounded-[6px] border border-black/85 bg-white/5">
              <span className="font-display text-[38px] font-normal leading-none text-anna-foreground">
                Ingredients
              </span>
            </div>
          </Link>
        </section>

      </section>
      <SiteFooter />
    </main>
  );
}
