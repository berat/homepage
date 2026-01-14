import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#0E172A"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.5.5-15 15m0-15 15 15"
    />
  </svg>
)
export default SvgComponent
