import Image from "next/image";

type SectionDividerProps = {
  flip?: boolean;
};

export default function SectionDivider({ flip = false }: SectionDividerProps) {
  return (
    <div className="section-divider-wrap">
      <span className="section-divider-fade" />
      <Image
        src="/images/section-divider2.png"
        alt=""
        width={1966}
        height={329}
        className={`section-divider-img ${
          flip ? "section-divider-img-flip" : ""
        }`}
      />
    </div>
  );
}
