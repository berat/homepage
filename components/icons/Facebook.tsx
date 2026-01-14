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
      fill="#313233"
      d="M5.179 16H2.357V8.714H0V5.859h2.357V3.756c0-1.202.322-2.128.964-2.78C3.964.327 4.821 0 5.893 0 6.75 0 7.453.038 8 .113v2.516l-1.464.038c-.524 0-.881.112-1.072.338-.19.225-.285.563-.285 1.014v1.84h2.714l-.357 2.855H5.179V16Z"
    />
  </svg>
)
export default SvgComponent
