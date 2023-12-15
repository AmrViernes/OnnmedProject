"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormField {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  value: string | number | Date;
  error: string | null;
}


const DynamicForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    {
        id: 1,
        type: 'text',
        label: 'Name',
        placeholder: 'Enter your name',
        required: true,
        value: '',
        error: null,
      },
      {
        id: 2,
        type: 'number',
        label: 'Age',
        placeholder: 'Enter your age',
        required: false,
        value: 0,
        error: null,
      },
  ]);

  const handleChange = (
    id: number,
    value: string | number | Date | boolean,
    property: string
  ) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [property]: value, error: null } : field
      )
    );
  };

  const handleAddField = () => {
    const newField: FormField = {
      id: Date.now(),
      type: "text",
      label: "New Field",
      required: false,
      value: "",
      error: null,
    };
    setFormFields((prevFields) => [...prevFields, newField]);
  };

  const handleRemoveField = (id: number) => {
    setFormFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateFields();

    if (isValid) {
      return formFields
    }
  };

  const validateFields = () => {
    let isValid = true;

    const updatedFields = formFields.map((field) => {
      const { value, required } = field;

      if (required && (value === "" || value === 0)) {
        field.error = "This field is required";
        isValid = false;
      }

      return field;
    });

    setFormFields(updatedFields);

    return isValid;
  };

  return (
      <form onSubmit={() => handleSubmit} className="flex-col justify-center items-center text-center">
        {formFields.map((field) => (
          <div key={field.id} className="flex justify-center items-center">
              {field.type === "text" && (
                <>
                  <span>{field.label}</span>
                  <input
                    className="p-2 rounded-md m-2"
                    type="text"
                    value={field.value as string}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(field.id, e.target.value, "value")
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </>
              )}
              {field.type === "number" && (
                <>
                  <span>{field.label}</span>
                  <input
                    className="p-2 rounded-md m-2"
                    type="number"
                    value={field.value as number}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(
                        field.id,
                        parseInt(e.target.value, 10),
                        "value"
                      )
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </>
              )}
              {field.type === "date" && (
                <>
                  <span>{field.label}</span>
                  <input
                    className="p-2 rounded-md m-2"
                    type="date"
                    value={field.value as string}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(field.id, e.target.value, "value")
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </>
              )}
              <span style={{ color: "red" }}>{field.error}</span>

              {/* Customization options */}
              <label>
                Placeholder:
                <input
                  className="p-2 rounded-md m-2"
                  type="text"
                  value={field.placeholder || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(field.id, e.target.value, "placeholder")
                  }
                />
              </label>

              <label>
              <label>

              Label:
              <input
                className="p-2 rounded-md m-2"
                type="text"
                value={field.label}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(field.id, e.target.value, "label")
                }
                />
                </label>
                </label>

              <label>
                Required:
                <input
                  className="p-2 rounded-md m-2"
                  type="checkbox"
                  checked={field.required}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(field.id, e.target.checked, "required")
                  }
                />
              </label>

            <button
              className="p-2 text-white rounded-md bg-red-700 m-4"
              type="button"
              onClick={() => handleRemoveField(field.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <section className="flex justify-center m-6 w-full space-x-2">
          <button
            className="p-2 rounded-md text-white bg-green-700 w-60"
            type="button"
            onClick={handleAddField}
          >
            Add Field
          </button>

          <button
            className="p-2 rounded-md text-white bg-blue-700 w-60"
            type="submit"
          >
            Submit
          </button>
        </section>
      </form>
  );
};

export default DynamicForm;
