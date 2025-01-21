import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3 {
    font-family: 'Helvetica', sans-serif;
    font-weight: 600;
  }

  button {
    cursor: pointer;
    font-size: 16px;
    border: none;
    padding: 10px 15px;
    background-color: #007BFF;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  input, textarea {
    font-size: 16px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .modal form {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .modal button {
    background-color: red;
    margin-top: 10px;
  }
`;

export default GlobalStyle;
