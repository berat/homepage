import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#5B687B"
      d="M17.326 0h3.373l-7.37 8.473L22 20h-6.789l-5.316-6.992L3.81 20H.434l7.884-9.063L0 .001h6.961l4.806 6.39L17.326 0Zm-1.184 17.97h1.87L5.945 1.924H3.94L16.142 17.97Z"
    />
  </svg>
)
export default SvgComponent
