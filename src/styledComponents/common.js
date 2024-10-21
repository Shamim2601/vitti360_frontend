import { styled } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Centers the container */
  padding: 1rem; /* Adds some padding for spacing */
  box-sizing: border-box;

  /* Responsive design */
  @media (max-width: 768px) {
    padding: 0.5rem; /* Smaller padding on mobile */
  }

  @media (max-width: 480px) {
    padding: 0.25rem; /* Even smaller padding on smaller screens */
  }
`;
