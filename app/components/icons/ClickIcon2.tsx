import * as React from "react";
import type { SVGProps } from "react";
const Component = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 31" {...props}><defs><mask xmlns="http://www.w3.org/2000/svg" id="prefix__a" width={30} height={30} x={0} y={0} maskUnits="userSpaceOnUse" style={{
      maskType: "alpha"
    }}><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path d="M15.5 2.58v5.17" /><path fill="#fff" fillRule="evenodd" d="m14.21 14.21 12.92 2.58-3.88 2.59 3.88 3.87-3.88 3.88-3.87-3.88-2.59 3.88z" clipRule="evenodd" /><path d="m24.63 6.37-3.65 3.65M6.37 24.63l3.65-3.65M2.58 15.5h5.17M6.37 6.37l3.65 3.65" /></g></mask></defs><g xmlns="http://www.w3.org/2000/svg" mask="url(#prefix__a)"><path fill="#fff" d="M0 0h31v31H0z" /></g></svg>;
export default Component;