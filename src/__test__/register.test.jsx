import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../components/register/Register";
import { emailReg, passwordReg } from "../regex";

describe("Register component", () => {
  it("Should render register component properly!", () => {
    render(<Register />);

    // It render h2 tag, heading stands for h and level:2 stands for 2 means h2 tag/element
    const element = screen.getByRole("heading", {
      level: 2,
    });

    // Below statement check, This h2 element is exist or not. if exist then give success else give an error
    expect(element).toBeInTheDocument();
  });

  it("Should show error message, when all or any field empty!", async () => {
    render(<Register />);

    // It will try to find button, where name has register.
    const btnElement = screen.getByRole("button", {
      name: /register/i,
    });

    // Using userEvent, It will try to process click event on this button
    await userEvent.click(btnElement);

    // It will try to find data-testid error attribute from the dom.
    const errorElement = screen.getByTestId("error");
    expect(errorElement).toBeInTheDocument();
  });

  it("Should not show error message when component load", () => {
    render(<Register />);
    const errorElement = screen.queryByTestId("error");
    expect(errorElement).not.toBeInTheDocument();
  });

  it("Shoud email invalid compare to test@test.com", async () => {
    render(<Register />);
    // It will try to find button, where name has register.
    const btnElement = screen.getByRole("button", {
      name: /register/i,
    });

    const emailField = screen.getByTestId("email");
    await userEvent.type(emailField, "shashank");

    // Using userEvent, It will try to process click event on this button
    await userEvent.click(btnElement);
    // It will try to find data-testid error attribute from the dom.
    expect(emailField.value).not.toMatch(emailReg);
  });

  it("Shoud email valid compare to test@test.com", async () => {
    render(<Register />);
    // It will try to find button, where name has register.
    const btnElement = screen.getByRole("button", {
      name: /register/i,
    });
    const emailField = screen.getByTestId("email");
    await userEvent.type(emailField, "shashank@test.com");
    await userEvent.click(btnElement);
    expect(emailField.value).toMatch(emailReg);
  });

  it("Should password doesn't contain One capital and One small letter, One number and One special character", async () => {
    render(<Register />);

    const btnElement = screen.getByRole("button", {
      name: /register/i,
    });

    const passwordField = screen.getByTestId("password");
    await userEvent.type(passwordField, "test@test");
    await userEvent.click(btnElement);
    expect(passwordField.value).not.toMatch(passwordReg);
  });

  it("Should password does contain One capital and One small letter, One number and One special character. Minimum 8 characters", async () => {
    render(<Register />);

    const btnElement = screen.getByRole("button", {
      name: /register/i,
    });

    const passwordField = screen.getByTestId("password");
    await userEvent.type(passwordField, "Test@test1");
    await userEvent.click(btnElement);
    expect(passwordField.value).toMatch(passwordReg);
  });

  it("Should show success message, When register process successfully completed", async () => {
    render(<Register />);

    // It will try to find button, where name has register.
    const btnElement = screen.getByRole("button", {
      name: /register/i,
    });

    // Using userEvent, Updating values of the input fields
    await userEvent.type(screen.getByTestId("name"), "shashank");
    await userEvent.type(screen.getByTestId("email"), "shashank@test.com");
    await userEvent.type(screen.getByTestId("password"), "Shashank@1");

    // Using userEvent, It will try to process click event on this button
    await userEvent.click(btnElement);

    // It will try to find data-testid success attribute from the dom.
    const successElement = screen.getByTestId("success");
    expect(successElement).toBeInTheDocument();
  });
});
