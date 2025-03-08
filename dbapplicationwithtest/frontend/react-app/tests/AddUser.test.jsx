import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AddUser from "../src/components/AddUser";
import { addUser } from "../src/services/api";

// Mocking the addUser function from the api module
vi.mock("../src/services/api", () => ({
  addUser: vi.fn(), // Ensures addUser is a mock function
}));

describe("AddUser Component", () => {
  test("renders input fields and submit button", () => {
    render(<AddUser onUserAdded={vi.fn()} />);
    
    expect(screen.getByPlaceholderText("Enter Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add user/i })).toBeInTheDocument();
  });

  test("allows user to input name and email", () => {
    render(<AddUser onUserAdded={vi.fn()} />);
    const nameInput = screen.getByPlaceholderText("Enter Name");
    const emailInput = screen.getByPlaceholderText("Enter Email");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
  });

  test("submits form and resets inputs on successful submission", async () => {
    const onUserAddedMock = vi.fn();

    // Properly mock addUser to resolve with `true`
    addUser.mockResolvedValue(true); 

    render(<AddUser onUserAdded={onUserAddedMock} />);

    const nameInput = screen.getByPlaceholderText("Enter Name");
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const submitButton = screen.getByRole("button", { name: /add user/i });

    // Simulate input and submit action
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    // Wait for async actions to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check that addUser was called with the correct values
    expect(addUser).toHaveBeenCalledWith({ name: "John Doe", email: "john@example.com" });
    
    // Check that onUserAdded was called
    expect(onUserAddedMock).toHaveBeenCalled();
    
    // Check that the inputs are reset after submission
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
  });
});
