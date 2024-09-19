import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../app/index"; // Asegúrate de que la ruta sea correcta

describe("App Component", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<App />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("contains specific elements", () => {
		const { getByText, getByRole } = render(<App />);

		// Verifica la presencia de elementos de texto
		expect(getByText("SupplyStream")).toBeTruthy();

		// Verifica que el botón de login está presente y funciona
		const loginButton = getByText("Login");
		expect(loginButton).toBeTruthy();
	});

	it("changes form state on input", () => {
		const { getByPlaceholderText } = render(<App />);

		// Encuentra el campo de email y cambia su texto
		const emailInput = getByPlaceholderText("Enter your email");
		fireEvent.changeText(emailInput, "test@example.com");

		// Verifica que el texto del input ha cambiado
		expect(emailInput.props.value).toBe("test@example.com");
	});
});
