import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1200px;
  padding: 20px 0; /* Add padding for better spacing */
  background-color: #f8f9fa; /* Light background color */
  text-align: center;
  margin: 0 auto; /* Center the header */
  position: relative; /* Ensure it’s positioned relative to the parent */
  z-index: 1000; /* Make sure it appears above other elements */
`;

const Title = styled.h1`
  font-size: 2rem; /* Main title size */
  margin: 0; /* Remove default margin */
`;

const Subtitle = styled.p`
  font-size: 1.2rem; /* Subtitle size */
  margin: 5px 0; /* Margin for spacing */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allows buttons to wrap to the next line */
  margin-top: 20px;
`;

const Button = styled(Link)`
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    flex: 1 1 45%; /* Allow buttons to take less space on smaller screens */
  }

  @media (max-width: 480px) {
    flex: 1 1 100%; /* Full width for buttons on extra small screens */
  }
`;

const DropdownButton = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${DropdownButton}:hover & {
    display: block; /* Show dropdown on hover */
  }
`;

const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1; /* Highlight on hover */
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>Vitti360</Title>
      <Subtitle>A trusted Edutech</Subtitle>
      <Subtitle>for admission and job seekers in Bangladesh</Subtitle>
      <ButtonContainer>
        <Button to="/">Home</Button>
        <Button to="/circulars">Circulars</Button>
        <Button to="/blogs">Blogs</Button>
        <Button to="/bookshop">BookShop</Button>
        <Button to="/support">Support</Button>
        <Button to="/exam">Exam</Button>
        <Button to="/login">Login</Button>
        <Button to="/signup">Sign Up</Button>

        {/* Dropdown for additional buttons */}
        <DropdownButton>
          <Button>
            <i className="fas fa-bars"></i> {/* FontAwesome icon */}
          </Button>
          <DropdownContent>
            <DropdownItem to="/exams">Exams</DropdownItem>
            <DropdownItem to="/login">Login</DropdownItem>
            <DropdownItem to="/signup">Sign Up</DropdownItem>
          </DropdownContent>
        </DropdownButton>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
