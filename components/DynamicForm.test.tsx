import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DynamicForm from './DynamicForm';

describe('DynamicForm Component', () => {
  test('renders initial form fields and allows dynamic addition/removal', () => {
    render(<DynamicForm />);

    // Initial fields
    expect(screen.getByLabelText('Name')).toBe;
    expect(screen.getByLabelText('Age')).toBe;

    // Add a new field
    fireEvent.click(screen.getByText('Add Field'));
    expect(screen.getByLabelText('New Field')).toBeDefined();

    // Remove a field
    fireEvent.click(screen.getByText('Remove'));

    // Confirm the field is removed
    expect(screen.queryByLabelText('New Field')).toBeNull();
  });


  test('displays error for required field when submitting with invalid data', () => {
    render(<DynamicForm />);

    // Submit the form without filling in required field
    fireEvent.click(screen.getByText('Submit'));

  });

  test('allows customization of labels, placeholders, and required fields', () => {
    render(<DynamicForm />);

    // Customize label, placeholder, and mark as required for the first field
    fireEvent.change(screen.getByLabelText('Label:'), { target: { value: 'Custom Name' } });
    fireEvent.change(screen.getByLabelText('Placeholder:'), { target: { value: 'Type your custom name' } });
    fireEvent.click(screen.getByLabelText('Required:'));

    // Add a new field and customize its label
    fireEvent.click(screen.getByText('Add Field'));
    fireEvent.change(screen.getAllByLabelText('Label:')[1], { target: { value: 'Custom Age' } });


    // Remove the first field
    fireEvent.click(screen.getByText('Remove'));

    // Verify that the removed field is not present
    expect(screen.queryByLabelText('Custom Name')).toBeNull();
  });
});
