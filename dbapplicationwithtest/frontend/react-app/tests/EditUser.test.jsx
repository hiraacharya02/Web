import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditUser from '../src/components/EditUser';
import { updateUser } from '../src/services/api'; // The actual API service
import { vi } from 'vitest';

// Mock the updateUser function
vi.mock('../src/services/api', () => ({
  updateUser: vi.fn(),
}));

describe('EditUser', () => {
  const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  const mockOnUserUpdated = vi.fn();

  beforeEach(() => {
    // Reset the mocks before each test
    vi.clearAllMocks();
  });

  it('renders with initial user data', () => {
    render(<EditUser user={mockUser} onUserUpdated={mockOnUserUpdated} />);

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('updates the name and email fields when changed', () => {
    render(<EditUser user={mockUser} onUserUpdated={mockOnUserUpdated} />);

    const nameInput = screen.getByDisplayValue('John Doe');
    const emailInput = screen.getByDisplayValue('john@example.com');

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });

    expect(nameInput.value).toBe('Jane Doe');
    expect(emailInput.value).toBe('jane@example.com');
  });

  it('calls onUserUpdated when the form is submitted successfully', async () => {
    // Mock the updateUser function to resolve successfully
    updateUser.mockResolvedValueOnce(true);

    render(<EditUser user={mockUser} onUserUpdated={mockOnUserUpdated} />);

    const nameInput = screen.getByDisplayValue('John Doe');
    const emailInput = screen.getByDisplayValue('john@example.com');
    const submitButton = screen.getByText('Update User');

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });

    fireEvent.click(submitButton);

    // Wait for the async updateUser function to resolve
    await waitFor(() => expect(updateUser).toHaveBeenCalledWith(1, { name: 'Jane Doe', email: 'jane@example.com' }));
    await waitFor(() => expect(mockOnUserUpdated).toHaveBeenCalledWith({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
    }));
  });

  it('does not call onUserUpdated if updateUser fails', async () => {
    // Mock the updateUser function to reject
    updateUser.mockResolvedValueOnce(false);

    render(<EditUser user={mockUser} onUserUpdated={mockOnUserUpdated} />);

    const nameInput = screen.getByDisplayValue('John Doe');
    const emailInput = screen.getByDisplayValue('john@example.com');
    const submitButton = screen.getByText('Update User');

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });

    fireEvent.click(submitButton);

    // Wait for the async updateUser function to reject
    await waitFor(() => expect(updateUser).toHaveBeenCalledWith(1, { name: 'Jane Doe', email: 'jane@example.com' }));
    await waitFor(() => expect(mockOnUserUpdated).not.toHaveBeenCalled());
  });
});
