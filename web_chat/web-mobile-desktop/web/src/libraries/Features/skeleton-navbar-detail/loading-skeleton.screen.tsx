import React from 'react'
import styled from 'styled-components';

const SkeletonPulse = styled.div`
    display: inline-block;
    height: 100%;
    width: 100%;
    background: linear-gradient(-90deg,#f3e8e8 0%,#f5f1f1 50%,#F0F0F0 100%);
    background-size: 400% 400%;
    animation: pulse 4s ease-in-out infinite;
    border-radius: ${(props: any) =>
        `${props.borderRadius}px` || "0px"};
    @keyframes pulse {
        0% {
        background-position: 0% 0%;
        }
        100% {
        background-position: -135% 0%;
        }
    }
`;

const SkeletonBar = styled(SkeletonPulse)`
  width: 5.5em;
  /* border-radius: 5px; */
  &::before {
    content: "\00a0"
  }
`;

export const Skeleton = (props: any) => (
    <SkeletonPulse {...props} />
  );

export { SkeletonBar }