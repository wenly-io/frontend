import { SVGProps } from 'react';

const SwirlIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_197_665)">
        <path
          d="M13.74 11.7072C13.1434 9.77305 10.7449 8.38257 8.55135 9.05913C8.29151 9.13927 7.43503 9.40343 7.22064 9.46955C5.01585 10.1496 3.76421 12.4377 4.42502 14.5802C4.99444 16.4264 6.79813 17.5621 8.69685 17.4058C9.00157 17.3807 9.30873 17.3224 9.61364 17.2283"
          stroke="url(#paint0_linear_197_665)"
          strokeWidth="1.21849"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.635 12.6648C11.2316 14.599 13.6301 15.9895 15.8237 15.3129C16.0835 15.2328 16.94 14.9686 17.1544 14.9025C19.3591 14.2225 20.6108 11.9344 19.95 9.79183C19.3806 7.9456 17.5769 6.80992 15.6782 6.96623C15.3734 6.99131 15.0663 7.04967 14.7614 7.14371"
          stroke="url(#paint1_linear_197_665)"
          strokeWidth="1.21849"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_197_665"
          x1="7.88599"
          y1="9.26434"
          x2="10.279"
          y2="17.0231"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6F6F6" />
          <stop offset="1" stopColor="#F5A42D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_197_665"
          x1="16.489"
          y1="15.1077"
          x2="14.096"
          y2="7.34893"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6F6F6" />
          <stop offset="1" stopColor="#F5A42D" />
        </linearGradient>
        <clipPath id="clip0_197_665">
          <rect
            width="19.4959"
            height="19.4959"
            fill="white"
            transform="translate(0 5.74593) rotate(-17.1411)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SwirlIcon;
