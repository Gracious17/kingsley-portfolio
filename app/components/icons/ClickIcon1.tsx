import * as React from "react";
import type { SVGProps } from "react";
const Component = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 31" {...props}><defs><mask xmlns="http://www.w3.org/2000/svg" id="prefix__a" width={30} height={30} x={0} y={0} maskUnits="userSpaceOnUse" style={{
      maskType: "alpha"
    }}><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path d="M15.5 2.58v5.17" /><path fill="#fff" fillRule="evenodd" d="m14.208 14.21 12.917 2.58-3.875 2.58 3.875 3.88-3.875 3.87-3.875-3.87-2.583 3.87z" clipRule="evenodd" /><path d="m24.633 6.37-3.653 3.65M6.367 24.63l3.653-3.65M2.583 15.5H7.75M6.367 6.37l3.653 3.65" /></g></mask></defs><g xmlns="http://www.w3.org/2000/svg" mask="url(#prefix__a)"><path fill="#fff" d="M0 0h31v31H0z" /></g></svg>;
export default Component;