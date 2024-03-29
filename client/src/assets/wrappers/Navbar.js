import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background-color: var(--background-secondary-color);
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background-color: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .logo-text {
    display: none;
  }

  .logo {
    width: 100px;
    display: flex;
    align-items: center;
  }

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }

    .logo-text {
      display: block;
    }
    .logo {
      display: none;
    }
  }
`;
export default Wrapper;
