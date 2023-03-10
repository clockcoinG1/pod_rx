
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`

from {
opacity: 0;
}
to {
opacity: 1;
}
`;

const HeaderContainer = styled.header`
  background-color: #282c34;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
  color: white;
  animation: ${ fadeIn } 1s ease-in;
  border-radius: 0 0 20px 20px;
  margin-bottom: 1rem;
`;
const Logo = styled.h1`
  margin: 0;
  padding: 1rem;
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
`;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  margin: 0 1.5rem;
`;

const NavLink = styled.a`
  padding: 1rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
  &:hover {
    background-color: #4d4d4d;
    color: #dcdcdc;
  }`



const DropdownMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${ ( { isOpen } ) => ( isOpen ? 'flex' : 'none' ) };
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5rem;
    right: 0;
    width: 10rem;
    padding: 1.5rem 0;
    background-color: #282c34;
    text-align: center;
    z-index: 1;
    border-radius: 20px 0 20px 20px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5);
    li {
      margin: 1rem 0;
    }
  }
`;

const DropdownLink = styled.a`
  padding: 1rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
  &:hover {
    background-color: #4d4d4d;
    color: #dcdcdc;
  }
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1.5rem;
    height: 1rem;
    cursor: pointer;
    div {
      width: 100%;
      height: 2px;
      background-color: white;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
      transition: transform 0.3s;
      &:first-of-type {
        transform: ${ ( { isOpen } ) =>
		isOpen ? 'rotate(45deg)' : 'rotate(0)' };
      }
      &:nth-of-type(2) {
        opacity: ${ ( { isOpen } ) => ( isOpen ? '0' : '1' ) };
        transform: ${ ( { isOpen } ) =>
		isOpen ? 'translateX(-15px)' : 'translateX(0)' };
      }
      &:nth-of-type(3) {
        transform: ${ ( { isOpen } ) =>
		isOpen ? 'rotate(-45deg)' : 'rotate(0)' };
      }
    }
  }
`;

const Header = () => {
	const [isOpen, setIsOpen] = useState( false );

	const toggleMenu = () => {
		setIsOpen( !isOpen );
	};

	return (
		<HeaderContainer>
			<Logo>Transcriber</Logo>
			<Nav>
				<NavList>
					<NavItem>
						<NavLink href="#">Sobre Mí</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#">Portafolio</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#">Blog</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#">Contacto</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#">ES/EN</NavLink>
					</NavItem>
				</NavList>
				<Hamburger isOpen={ isOpen } onClick={ toggleMenu }>
					<div />
					<div />
					<div />
				</Hamburger>
				{ isOpen && (
					<DropdownMenu>
						<li>
							<DropdownLink href="#">Item 1</DropdownLink>
						</li>
						<li>
							<DropdownLink href="#">Item 2</DropdownLink>
						</li>
						<li>
							<DropdownLink href="#">Item 3</DropdownLink>
						</li>
						<li>
							<DropdownLink href="#">Item 4</DropdownLink>
						</li>
					</DropdownMenu>
				) }
			</Nav>
		</HeaderContainer>
	);
};
export default Header;