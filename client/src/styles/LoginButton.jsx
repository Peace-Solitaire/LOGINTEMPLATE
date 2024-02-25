import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const expandButton = keyframes`
  from { width: 40px; } /* Reduced from 50px to 40px */
  to { width: 200px; }
`;

export const Button = styled.button`
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px; /* Reduced padding for a smaller circle */
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  width: 40px; /* Reduced width for a smaller initial circle */
  height: 40px; /* Reduced height to match the width for a perfect circle */
  transition: border-radius 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-radius: 30px; // Smooth transition to rounded corners
    animation: ${expandButton} 0.5s forwards ease; // Animate width expansion
    .text {
      display: inline;
      animation: ${fadeIn} 0.5s forwards ease; // Fade-in animation for the text
      animation-delay: 0.25s; // Start text animation after button begins to expand
    }
  }

  .icon {
    position: absolute;
    left: 8px; 
  }

  .text {
    white-space: nowrap;
    font-weight: bold;
    color: #000;
    margin-left: 30px; // Adjusted to match reduced size
    opacity: 0; // Initially hidden
  }
`;
