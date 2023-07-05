import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DemoSiteProps {}

const StyledDemoSite = styled.div`
  color: pink;
`;

export function DemoSite(props: DemoSiteProps) {
  return (
    <StyledDemoSite>
      <h1>Welcome to DemoSite!</h1>
    </StyledDemoSite>
  );
}

export default DemoSite;
